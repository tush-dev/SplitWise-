import { Box, Button, Grid, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import configData from '../../config.json'
import { varFadeInUp } from '../../utils/animations';

export const EndMessage = () => {
    return (
        <motion.div variants={varFadeInUp}>
            <Box sx={{
                p: { xs: 3, md: 4 },
                background: (theme) => `linear-gradient(135deg, ${theme.palette['success'].light}, ${theme.palette['success'].main})`,
                color: '#fff',
                borderRadius: { xs: 3, md: 4 },
                textAlign: 'center',
            }}>
                <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={10}>
                        <img src="/static/illustrations/dashboard-card.png" alt="dashboard" style={{ width: '100%', maxWidth: 160 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.9 }}>
                            Keep track of shared expenses and settle balances.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="small" sx={{ bgcolor: 'white', color: 'success.dark', '&:hover': { bgcolor: 'grey.100' } }}
                            component={RouterLink} to={configData.USER_GROUPS_URL}>
                            View Groups
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    )
}
