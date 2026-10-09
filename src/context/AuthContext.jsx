import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AUTH_USER_KEY = 'portfolio_auth_user_v1';
const REGISTERED_USERS_KEY = 'portfolio_registered_users_v1';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  // Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'login' | 'signup'
  const [authSuccessCallback, setAuthSuccessCallback] = useState(null);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Open auth modal with optional callback to execute after login/signup (e.g. openTemplateSelector)
  const openAuthModal = useCallback((mode = 'signup', callback = null) => {
    setAuthMode(mode);
    setAuthSuccessCallback(() => callback);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthSuccessCallback(null);
  }, []);

  // Get all registered users from localStorage
  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem(REGISTERED_USERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'usr-demo-1',
        name: 'Demo Engineer',
        email: 'developer@example.com',
        password: 'password123'
      }
    ];
  };

  // Sign up
  const signup = useCallback((name, email, password) => {
    const users = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    try {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }

    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    });

    setIsAuthModalOpen(false);

    if (authSuccessCallback) {
      authSuccessCallback();
      setAuthSuccessCallback(null);
    }

    return { success: true, user: newUser };
  }, [authSuccessCallback]);

  // Log in
  const login = useCallback((email, password) => {
    const users = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();

    const matched = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matched) {
      // Auto-create or allow password check
      return {
        success: false,
        error: 'No account found with this email. Would you like to create an account?'
      };
    }

    if (matched.password && matched.password !== password) {
      return { success: false, error: 'Invalid password. Please check your credentials.' };
    }

    setCurrentUser({
      id: matched.id,
      name: matched.name,
      email: matched.email,
      createdAt: matched.createdAt || new Date().toISOString()
    });

    setIsAuthModalOpen(false);

    if (authSuccessCallback) {
      authSuccessCallback();
      setAuthSuccessCallback(null);
    }

    return { success: true, user: matched };
  }, [authSuccessCallback]);

  // Quick 1-click Demo Login
  const demoLogin = useCallback((demoName = 'Alex Mercer', demoEmail = 'alex.mercer@example.com') => {
    const user = {
      id: `usr-demo-${Date.now()}`,
      name: demoName,
      email: demoEmail,
      isDemo: true,
      createdAt: new Date().toISOString()
    };

    setCurrentUser(user);
    setIsAuthModalOpen(false);

    if (authSuccessCallback) {
      authSuccessCallback();
      setAuthSuccessCallback(null);
    }

    return { success: true, user };
  }, [authSuccessCallback]);

  // Log out
  const logout = useCallback(() => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        demoLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
