import { Box, Skeleton, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ p: 4, width: '100%' }}>
      <Stack spacing={3}>
        <Skeleton variant="rounded" height={40} width="40%" />
        <Skeleton variant="rounded" height={200} />
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" height={100} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={100} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={100} sx={{ flex: 1 }} />
        </Stack>
        <Skeleton variant="rounded" height={300} />
      </Stack>
    </Box>
  );
}
