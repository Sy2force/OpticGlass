import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentSeason, getSeasonTheme, SEASON_COLORS } from '@/shared/lib/seasons';
import { SEASONS } from '@/shared/lib/constants';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [currentSeason, setCurrentSeason] = useState(getCurrentSeason());
  const [theme, setTheme] = useState(getSeasonTheme(getCurrentSeason()));
  const [colors, setColors] = useState(SEASON_COLORS[getCurrentSeason()]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Détecter la season actuelle au chargement
  useEffect(() => {
    const season = getCurrentSeason();
    setCurrentSeason(season);
    setTheme(getSeasonTheme(season));
    setColors(SEASON_COLORS[season]);

    // Détecter le mode sombre du système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');
    setIsDarkMode(savedDarkMode ? savedDarkMode === 'true' : prefersDark);
  }, []);

  // Apply le mode sombre
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const changeSeason = useCallback((season) => {
    if (Object.values(SEASONS).includes(season)) {
      setCurrentSeason(season);
      setTheme(getSeasonTheme(season));
      setColors(SEASON_COLORS[season]);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const getSeasonalGradient = useCallback(() => {
    return theme.backgroundGradient || 'from-gray-100 to-gray-200';
  }, [theme]);

  const getAccentColor = useCallback(() => {
    return theme.accentColor || 'text-black';
  }, [theme]);

  const getButtonColor = useCallback(() => {
    return theme.buttonColor || 'bg-black hover:bg-gray-800';
  }, [theme]);

  const getPrimaryColor = useCallback(() => {
    return colors.primary || '#000000';
  }, [colors]);

  const getSecondaryColor = useCallback(() => {
    return colors.secondary || '#666666';
  }, [colors]);

  const value = {
    currentSeason,
    theme,
    colors,
    isDarkMode,
    changeSeason,
    toggleDarkMode,
    getSeasonalGradient,
    getAccentColor,
    getButtonColor,
    getPrimaryColor,
    getSecondaryColor,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
