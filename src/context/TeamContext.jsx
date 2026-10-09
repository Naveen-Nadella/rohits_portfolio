import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { teamMembersData } from '../data/team';

const LOCAL_STORAGE_KEY = 'portfolio_registry_v6';
const ACTIVE_MEMBER_KEY = 'portfolio_active_id_v6';

// Legacy keys for seamless migration
const LEGACY_MEMBERS_KEY = 'portfolio_team_members_v5';
const LEGACY_ACTIVE_KEY = 'portfolio_active_member_v5';

const TeamContext = createContext(undefined);

export const TeamProvider = ({ children }) => {
  // Initialize members list with migration support
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with default dataset so built-in members stay updated
          return mergeWithDefaults(parsed);
        }
      }

      // Check legacy v5 storage for any custom members
      const legacySaved = localStorage.getItem(LEGACY_MEMBERS_KEY);
      if (legacySaved) {
        const legacyParsed = JSON.parse(legacySaved);
        if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
          return mergeWithDefaults(legacyParsed);
        }
      }
    } catch (err) {
      console.warn('Failed to parse saved portfolio members:', err);
    }
    return teamMembersData;
  });

  // Find helper across IDs, aliases, and names
  const findMember = useCallback((query, list = members) => {
    if (!query || typeof query !== 'string') return null;
    const cleanQuery = query.trim().toUpperCase();

    return list.find((m) => {
      if (m.id && m.id.toUpperCase() === cleanQuery) return true;
      if (m.portfolioId && m.portfolioId.toUpperCase() === cleanQuery) return true;
      if (m.legacyId && m.legacyId.toUpperCase() === cleanQuery) return true;
      if (Array.isArray(m.aliases) && m.aliases.some((a) => a.toUpperCase() === cleanQuery)) return true;
      if (m.name && m.name.toUpperCase() === cleanQuery) return true;
      return false;
    });
  }, [members]);

  // Initialize active member with URL search parameter check
  const [activeMemberId, setActiveMemberIdState] = useState(() => {
    try {
      // 1. Check URL search param (?id=...)
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        if (urlId) {
          const matched = findMember(urlId, teamMembersData);
          if (matched) return matched.id;
        }
      }

      // 2. Check localStorage
      const saved = localStorage.getItem(ACTIVE_MEMBER_KEY);
      if (saved) {
        const matched = findMember(saved, teamMembersData);
        if (matched) return matched.id;
      }

      // 3. Check legacy active member key
      const legacyActive = localStorage.getItem(LEGACY_ACTIVE_KEY);
      if (legacyActive) {
        const matched = findMember(legacyActive, teamMembersData);
        if (matched) return matched.id;
      }
    } catch {
      // ignore
    }
    return teamMembersData[0].id;
  });

  // Modal and toast states
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizingMemberId, setCustomizingMemberId] = useState(null);

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [newlyGeneratedId, setNewlyGeneratedId] = useState(null);

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeCandidate, setResumeCandidate] = useState(null);

  const openResumeModal = useCallback((candidate = null) => {
    setResumeCandidate(candidate);
    setIsResumeModalOpen(true);
  }, []);

  const closeResumeModal = useCallback(() => {
    setIsResumeModalOpen(false);
    setResumeCandidate(null);
  }, []);

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Toast helper
  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    setToast({ show: true, message, type });
    const timer = setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(members));
    } catch (err) {
      console.warn('Failed to save members to localStorage:', err);
    }
  }, [members]);

  // Synchronize URL search params and active ID to localStorage
  const setActiveMemberId = useCallback((id) => {
    const found = findMember(id);
    const targetId = found ? found.id : id;

    setActiveMemberIdState(targetId);

    try {
      localStorage.setItem(ACTIVE_MEMBER_KEY, targetId);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('id', targetId);
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // ignore
    }
  }, [findMember]);

  // Clear URL param to return to Onboarding landing page
  const clearActivePortfolioUrl = useCallback(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('id');
      window.history.replaceState({}, '', url.pathname);
    }
  }, []);

  // On initial mount, sync URL param ONLY if explicitly present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlId = urlParams.get('id');
      if (urlId) {
        const matched = findMember(urlId);
        if (matched) {
          setActiveMemberIdState(matched.id);
        }
      }
    }
  }, [findMember]);

  // Search portfolio by ID or Name
  const searchPortfolio = useCallback((query) => {
    if (!query || !query.trim()) {
      return { success: false, error: 'Please enter a portfolio ID.' };
    }

    const matched = findMember(query);
    if (matched) {
      setActiveMemberId(matched.id);
      showToast(`Found portfolio: ${matched.name} (ID: ${matched.id})`, 'success');
      return { success: true, member: matched };
    }

    return {
      success: false,
      error: `Portfolio ID "${query.trim().toUpperCase()}" not found. Verify the ID or create a new portfolio.`
    };
  }, [findMember, setActiveMemberId, showToast]);

  // Create & Register a new portfolio with unique ID
  const createPortfolio = useCallback((data) => {
    const rawName = data.name || 'New Candidate';
    const firstWord = rawName.trim().split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase() || 'PORT';

    // Generate unique ID or use custom provided ID
    let finalId = (data.customId || '').trim().toUpperCase();
    if (!finalId) {
      let candidateId = `${firstWord}-${Math.floor(1000 + Math.random() * 9000)}`;
      while (members.some((m) => m.id === candidateId || m.portfolioId === candidateId)) {
        candidateId = `${firstWord}-${Math.floor(1000 + Math.random() * 9000)}`;
      }
      finalId = candidateId;
    }

    // Check for collision if user customized ID
    if (data.customId && members.some((m) => m.id === finalId && m.id !== data.id)) {
      return { success: false, error: `Portfolio ID "${finalId}" is already taken. Please choose another.` };
    }

    // Monogram calculation
    const monogram =
      data.monogram ||
      rawName
        .split(' ')
        .map((n) => n[0])
        .filter(Boolean)
        .join('')
        .slice(0, 2)
        .toUpperCase() ||
      'PF';

    // Format new member object
    const newMember = {
      id: finalId,
      portfolioId: finalId,
      aliases: [finalId.toLowerCase(), rawName.toLowerCase()],
      name: rawName,
      monogram: monogram,
      title: data.title || 'Software Engineer & Web Developer',
      subtitle: data.subtitle || 'B.Tech in Computer Science & Engineering',
      tagline: data.tagline || 'Crafting modern web applications, scalable systems, and elegant software.',
      email: data.email || 'developer@example.com',
      phone: data.phone || '+91 98765 43210',
      location: data.location || 'India',
      github: data.github || 'https://github.com',
      linkedin: data.linkedin || 'https://linkedin.com',
      cgpa: data.cgpa ? (data.cgpa.includes('/') ? data.cgpa : `${data.cgpa} / 10.0`) : '8.0 / 10.0',
      university: data.university || 'KL University',
      photo: data.photo || '',
      scores: {
        tenth: data.scores?.tenth || data.tenth || '500 / 600',
        intermediate: data.scores?.intermediate || data.intermediate || '900 / 1000',
        btech: data.scores?.btech || data.btech || (data.cgpa ? `${data.cgpa} CGPA` : '8.0 CGPA'),
        university: data.university || 'KL University'
      },
      bio: Array.isArray(data.bio) && data.bio.length > 0
        ? data.bio
        : typeof data.bio === 'string' && data.bio.trim()
        ? data.bio.split('\n\n').filter(Boolean)
        : [
            `Passionate software engineering undergraduate driven to architect high-performance, accessible, and responsive digital products.`,
            `Currently studying at ${data.university || 'KL University'} with strong foundational coursework across Data Structures, Object-Oriented Design, and Web Technologies.`,
            `Dedicated to continuous technical craftsmanship, writing clean and modular code, and shipping impactful software.`
          ],
      skills: data.skills || null,
      projects: data.projects || null,
      experience: data.experience || null,
      certifications: data.certifications || null,
      template: data.template || 'editorial',
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    setMembers((prev) => {
      const existingIndex = prev.findIndex((m) => m.id === finalId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newMember;
        return updated;
      }
      return [newMember, ...prev];
    });

    // Switch to the newly created portfolio
    setActiveMemberId(finalId);
    setNewlyGeneratedId(finalId);
    setIsGeneratorOpen(false);
    setIsSuccessModalOpen(true);
    showToast(`Portfolio generated successfully! ID: ${finalId}`, 'success');

    return { success: true, id: finalId, member: newMember };
  }, [members, setActiveMemberId, showToast]);

  // Update existing member
  const updateMember = useCallback((id, updated) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id || m.portfolioId === id) {
          return {
            ...m,
            ...updated,
            scores: {
              ...m.scores,
              ...(updated.scores || {})
            }
          };
        }
        return m;
      })
    );
  }, []);

  // Delete a custom portfolio
  const deletePortfolio = useCallback((id) => {
    // Don't delete built-in team members
    const isBuiltIn = teamMembersData.some((def) => def.id === id || def.portfolioId === id);
    if (isBuiltIn) {
      showToast('Built-in default team portfolios cannot be deleted.', 'info');
      return false;
    }

    setMembers((prev) => prev.filter((m) => m.id !== id));
    if (activeMemberId === id) {
      setActiveMemberId(teamMembersData[0].id);
    }
    showToast(`Portfolio ${id} deleted.`, 'info');
    return true;
  }, [activeMemberId, setActiveMemberId, showToast]);

  const openCustomizer = (memberId) => {
    setCustomizingMemberId(memberId || activeMemberId);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setIsCustomizerOpen(false);
    setCustomizingMemberId(null);
  };

  const openGenerator = () => setIsGeneratorOpen(true);
  const closeGenerator = () => setIsGeneratorOpen(false);

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setNewlyGeneratedId(null);
  };

  const resetAllMembers = () => {
    setMembers(teamMembersData);
    setActiveMemberId(teamMembersData[0].id);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(ACTIVE_MEMBER_KEY);
    } catch {
      // ignore
    }
    showToast('Reset portfolios to defaults.', 'info');
  };

  const activeMember = members.find((m) => m.id === activeMemberId) || members[0] || teamMembersData[0];

  return (
    <TeamContext.Provider
      value={{
        activeMember,
        activeMemberId,
        setActiveMemberId,
        allMembers: members,
        findMember,
        searchPortfolio,
        createPortfolio,
        deletePortfolio,
        updateMember,
        isCustomizerOpen,
        customizingMemberId,
        openCustomizer,
        closeCustomizer,
        isGeneratorOpen,
        openGenerator,
        closeGenerator,
        isSuccessModalOpen,
        newlyGeneratedId,
        closeSuccessModal,
        toast,
        showToast,
        resetAllMembers,
        clearActivePortfolioUrl,
        isResumeModalOpen,
        openResumeModal,
        closeResumeModal,
        resumeCandidate
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

// Helper: merge saved members with built-in defaults
function mergeWithDefaults(savedList) {
  // Built-in members updated with saved changes
  const defaults = teamMembersData.map((def) => {
    const found = savedList.find(
      (p) => p.id === def.id || p.portfolioId === def.id || (p.legacyId && p.legacyId === def.aliases?.[0])
    );
    return found ? { ...def, ...found, id: def.id, portfolioId: def.portfolioId } : def;
  });

  // User-created custom members (not matching any built-in)
  const customMembers = savedList.filter(
    (p) => !teamMembersData.some((def) => def.id === p.id || def.portfolioId === p.id || def.aliases?.includes(p.id))
  );

  return [...defaults, ...customMembers];
}

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
