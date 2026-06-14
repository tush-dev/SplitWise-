import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import gravatarUrl from 'gravatar-url';
import MenuPopover from '../../components/MenuPopover';
import { logout } from '../../services/auth';
import configData from '../../config.json'
import { motion, AnimatePresence } from 'framer-motion';

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: configData.DASHBOARD_URL,
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: configData.USER_PROFILE_URL,
  }
];

export default function AccountPopover() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);
  const handleLogOut = () => logout();

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1, content: "''", width: '100%', height: '100%',
              borderRadius: '50%', position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {user &&
          <Avatar src={gravatarUrl(user?.emailId, { size: 200, default: configData.USER_DEFAULT_LOGO_URL })} alt="photoURL" />
        }
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0, mt: 1.5, ml: 0.75,
          '& .MuiMenuItem-root': { typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.emailId}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <AnimatePresence>
          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option, i) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                  {option.label}
                </MenuItem>
              </motion.div>
            ))}
          </Stack>
        </AnimatePresence>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
