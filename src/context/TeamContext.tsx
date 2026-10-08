import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TeamMember } from '../types/portfolio';
import { teamMembersData } from '../data/team';

interface TeamContextType {
  activeMember: TeamMember;
  activeMemberId: string;
  setActiveMemberId: (id: string) => void;
  allMembers: TeamMember[];
  updateMember: (id: string, updated: Partial<TeamMember>) => void;
  isCustomizerOpen: boolean;
  customizingMemberId: string | null;
  openCustomizer: (memberId?: string) => void;
  closeCustomizer: () => void;
  resetAllMembers: () => void;
}

const LOCAL_STORAGE_KEY = 'portfolio_team_members_v3';
const ACTIVE_MEMBER_KEY = 'portfolio_active_member_v3';

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with default dataset so new fields aren't missing
          return teamMembersData.map((def) => {
            const found = parsed.find((p: TeamMember) => p.id === def.id);
            return found ? { ...def, ...found } : def;
          });
        }
      }
    } catch {
      // ignore
    }
    return teamMembersData;
  });

  const [activeMemberId, setActiveMemberIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_MEMBER_KEY);
      if (saved && teamMembersData.some((m) => m.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return teamMembersData[0].id;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizingMemberId, setCustomizingMemberId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(members));
    } catch {
      // ignore
    }
  }, [members]);

  const setActiveMemberId = (id: string) => {
    setActiveMemberIdState(id);
    try {
      localStorage.setItem(ACTIVE_MEMBER_KEY, id);
    } catch {
      // ignore
    }
  };

  const updateMember = (id: string, updated: Partial<TeamMember>) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
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
  };

  const openCustomizer = (memberId?: string) => {
    setCustomizingMemberId(memberId || activeMemberId);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setIsCustomizerOpen(false);
    setCustomizingMemberId(null);
  };

  const resetAllMembers = () => {
    setMembers(teamMembersData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const activeMember = members.find((m) => m.id === activeMemberId) || members[0];

  return (
    <TeamContext.Provider
      value={{
        activeMember,
        activeMemberId,
        setActiveMemberId,
        allMembers: members,
        updateMember,
        isCustomizerOpen,
        customizingMemberId,
        openCustomizer,
        closeCustomizer,
        resetAllMembers
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
