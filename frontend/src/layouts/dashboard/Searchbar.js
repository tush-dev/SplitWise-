import { useState, useCallback } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';
import { useNavigate } from 'react-router-dom';
import { getUserGroupsService } from '../../services/groupServices';
import dataConfig from '../../config.json';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows?.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.85)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
    setShowResults(false);
    setQuery('');
  };

  const handleSearch = useCallback(async (value) => {
    setQuery(value);
    if (value.length < 2) {
      setShowResults(false);
      return;
    }
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const response = await getUserGroupsService(profile);
      const groups = response.data.groups || [];
      const filtered = groups.filter(g =>
        g.groupName?.toLowerCase().includes(value.toLowerCase()) ||
        g.groupDescription?.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } catch (e) {
      console.error('Search error:', e);
    }
  }, []);

  const handleSelect = (groupId) => {
    handleClose();
    navigate(dataConfig.VIEW_GROUP_URL + groupId);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div style={{ position: 'relative' }}>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}
        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search groups…"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </SearchbarStyle>
        </Slide>
        {showResults && results.length > 0 && (
          <Paper
            sx={{
              position: 'absolute',
              top: APPBAR_DESKTOP,
              left: 0,
              right: 0,
              zIndex: 100,
              maxHeight: 300,
              overflow: 'auto',
              borderRadius: 2,
              boxShadow: 8,
            }}
          >
            <List dense>
              {results.map((group) => (
                <ListItemButton key={group._id} onClick={() => handleSelect(group._id)}>
                  <ListItemText
                    primary={group.groupName}
                    secondary={group.groupDescription}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
        {showResults && query.length >= 2 && results.length === 0 && (
          <Paper sx={{ position: 'absolute', top: APPBAR_DESKTOP, left: 0, right: 0, zIndex: 100, p: 2, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">No groups found</Typography>
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  );
}
