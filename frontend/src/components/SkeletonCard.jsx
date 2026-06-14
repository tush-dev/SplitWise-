import { Box, Skeleton, Card, CardContent, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export function SkeletonExpenseCard() {
  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="rounded" width={76} height={76} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="30%" height={16} />
        </Box>
        <Skeleton variant="text" width={80} height={40} />
      </Stack>
    </Card>
  );
}

export function SkeletonGroupCard() {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
      <Skeleton variant="rectangular" height={120} />
      <CardContent>
        <Skeleton variant="text" width="70%" height={32} />
        <Skeleton variant="text" width="50%" height={20} />
        <Stack direction="row" spacing={1} mt={2}>
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={120} height={32} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export function SkeletonDashboardCard() {
  return (
    <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
      <Stack spacing={2}>
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="rounded" height={200} />
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="30%" height={24} />
      </Stack>
    </Box>
  );
}

SkeletonExpenseCard.propTypes = {};
SkeletonGroupCard.propTypes = {};
SkeletonDashboardCard.propTypes = {};
