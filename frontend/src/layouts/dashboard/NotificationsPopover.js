import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useState } from 'react';
import { Box, List, Badge, Avatar, Tooltip, Divider, Typography, IconButton, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
import { fToNow } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New expense added',
    description: 'Lunch at Italian place - ₹1,200 split among 4',
    avatar: null,
    type: 'expense_added',
    createdAt: new Date(),
    isUnRead: true,
  },
  {
    id: '2',
    title: 'Settlement completed',
    description: 'You settled ₹500 with John',
    avatar: null,
    type: 'settlement',
    createdAt: new Date(Date.now() - 3600000 * 3),
    isUnRead: false,
  },
  {
    id: '3',
    title: 'Group created',
    description: 'You were added to "Weekend Trip" group',
    avatar: null,
    type: 'group_invite',
    createdAt: new Date(Date.now() - 3600000 * 24),
    isUnRead: false,
  },
];

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isUnRead: false })));
  };

  return (
    <>
      <IconButton ref={anchorRef} color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover open={Boolean(open)} anchorEl={open} onClose={handleClose} sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread message{totalUnRead !== 1 ? 's' : ''}
            </Typography>
          </Box>
          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider />
        <List disablePadding>
          <AnimatePresence>
            {notifications.slice(0, 3).map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <NotificationItem notification={notification} />
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </MenuPopover>
    </>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const getIcon = (type) => {
    switch (type) {
      case 'expense_added': return 'material-symbols:receipt-long';
      case 'settlement': return 'mdi:cash-check';
      case 'group_invite': return 'mdi:account-group';
      default: return 'eva:bell-fill';
    }
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5, px: 2.5, mt: '1px',
        ...(notification.isUnRead && { bgcolor: 'action.selected' }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.dark' }}>
          <Iconify icon={getIcon(notification.type)} width={20} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={notification.title}
        secondary={
          <Typography variant="caption" sx={{ mt: 0.5, display: 'flex', alignItems: 'center', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
