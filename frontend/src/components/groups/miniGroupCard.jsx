import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Box, AvatarGroup, Avatar, Stack, Button } from '@mui/material';
import { convertToCurrency, currencyFind, categoryIcon } from '../../utils/helper';
import Iconify from '../Iconify';
import gravatarUrl from 'gravatar-url';
import configData from '../../config.json'
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../config.json';
import useResponsive from '../../theme/hooks/useResponsive';

const CategoryStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  width: 35,
  height: 32,
  position: 'absolute',
  left: 22,
  top: 130,
  borderRadius: 50
}));

MiniGroupCard.propTypes = {
  color: PropTypes.string,
  groupId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  groupMembers: PropTypes.array,
  share: PropTypes.number,
  currencyType: PropTypes.string,
  groupCategory: PropTypes.string,
  isGroupActive: PropTypes.bool,
  sx: PropTypes.object,
};

export default function MiniGroupCard({ groupId, title, description, groupMembers, share, currencyType, groupCategory, isGroupActive, color = 'primary', sx, ...other }) {
  const mdUp = useResponsive('up', 'md');

  return (
    <Card
      sx={{
        p: 0,
        boxShadow: 5,
        borderRadius: 3,
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        component="span"
        sx={{
          width: 80, height: 36, display: 'inline-block', bgcolor: 'currentColor',
          mask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
          WebkitMask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
          zIndex: 9, top: 125, position: 'absolute', color: 'background.paper'
        }}
      />
      <CategoryStyle sx={{ bgcolor: (theme) => theme.palette[color].lighter, py: '6px', px: '9px' }}>
        <Iconify icon={categoryIcon(groupCategory)} color={(theme) => theme.palette[color].darker} />
      </CategoryStyle>

      <Box pt={6} px={2} pb={3}
        sx={{ bgcolor: (theme) => theme.palette[color].lighter, color: (theme) => theme.palette[color].darker }}>
        <Typography noWrap variant="h3" fontSize={30} sx={{ opacity: 0.72 }}>{title}</Typography>
        <Typography noWrap variant="subtitle2" fontSize={14} color={'text.secondary'}>{description} &nbsp;</Typography>
      </Box>
      <CardContent sx={{ pt: 3, px: 1 }}>
        <Stack direction="row" spacing={2} p={1} mt={1}>
          <Typography sx={{
            bgcolor: isGroupActive ? (theme) => theme.palette['error'].lighter : (theme) => theme.palette['success'].lighter,
            p: 1, borderRadius: 1,
            color: isGroupActive ? (theme) => theme.palette['error'].darker : (theme) => theme.palette['success'].darker
          }}>
            {isGroupActive ? (<b>Not Settled</b>) : (<b>Settled</b>)}
          </Typography>
          <Typography sx={{
            bgcolor: share < 0 ? (theme) => theme.palette['error'].lighter : (theme) => theme.palette['success'].lighter,
            p: 1, borderRadius: 1,
            color: share < 0 ? (theme) => theme.palette['error'].darker : (theme) => theme.palette['success'].darker
          }}>
            <b> {share < 0 ? <>You owe</> : <>You are owed</>} : &nbsp;
              {currencyFind(currencyType)} {convertToCurrency(Math.abs(Math.floor(share)))}</b>
          </Typography>
        </Stack>
        <Button component={RouterLink} to={dataConfig.ADD_EXPENSE_URL + groupId}
          color="primary" aria-label="add" variant="outlined"
          sx={{ mt: 2, ml: 1, textDecoration: 'none', borderRadius: 2 }}>
          <Iconify icon='eva:file-add-fill' sx={{ height: 22, mr: 1, width: 22 }} />
          Add Expense
        </Button>
      </CardContent>
    </Card>
  );
}
