import { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, severity = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, severity }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ addToast }}>
      {children}
      <Stack
        spacing={1}
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000, maxWidth: 400 }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Snackbar
                open
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={() => removeToast(toast.id)}
                sx={{ position: 'static' }}
              >
                <Alert
                  onClose={() => removeToast(toast.id)}
                  severity={toast.severity}
                  variant="filled"
                  sx={{ width: '100%', boxShadow: 4 }}
                >
                  {toast.message}
                </Alert>
              </Snackbar>
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node,
};
