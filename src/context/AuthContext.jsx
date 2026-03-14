import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auditImage, setAuditImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const storedAuditImage = localStorage.getItem('auditImage');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('authUser');
      }
    }
    if (storedAuditImage) {
      setAuditImage(storedAuditImage);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const VALID_USERNAME = 'testuser';
    const VALID_PASSWORD = 'Test123';

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const userData = {
        username,
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const saveAuditImage = (imageData) => {
    setAuditImage(imageData);
    localStorage.setItem('auditImage', imageData);
  };

  const clearAuditImage = () => {
    setAuditImage(null);
    localStorage.removeItem('auditImage');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    auditImage,
    saveAuditImage,
    clearAuditImage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};