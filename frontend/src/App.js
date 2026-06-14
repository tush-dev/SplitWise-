import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './context/ThemeContext';
import { SnackbarProvider } from './context/SnackbarContext';
import Router from './routes';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider>
            <Router />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
