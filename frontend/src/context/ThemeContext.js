import { createContext, useContext, useState, useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import palette from '../theme/palette';
import paletteDark from '../theme/paletteDark';
import typography from '../theme/typography';
import componentsOverride from '../theme/overrides';
import shadows, { customShadows } from '../theme/shadows';

const ThemeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeContext);
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode');
    return saved || 'light';
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  const themeOptions = useMemo(() => {
    const isDark = mode === 'dark';
    return {
      palette: isDark ? paletteDark : palette,
      shape: { borderRadius: 8 },
      typography,
      shadows: shadows(mode),
      customShadows: customShadows(mode),
    };
  }, [mode]);

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
}
