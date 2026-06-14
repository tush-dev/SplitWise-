import { Box, Button, Grid, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import configData from '../../config.json'
import { varFadeInLeft, varFadeInRight } from '../../utils/animations';
import useResponsive from '../../theme/hooks/useResponsive';

export const WelcomeMessage = () => {
    const mdUp = useResponsive('up', 'md');

    return (
        <motion.div variants={varFadeInLeft}>
            <Box sx={{
                boxShadow: 5,
                p: { xs: 3, md: 5 },
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.lighter}, ${theme.palette.primary.light}15)`,
                color: (theme) => theme.palette['primary'].darker,
                borderRadius: { xs: 3, md: 4 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}30, transparent)`,
                }
            }}>
                <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" pb={2} fontWeight={800} fontSize={{ xs: 20, md: 28 }}>
                                Hello there, Welcome back!
                            </Typography>
                            <Typography variant="body2" pb={2} sx={{ opacity: 0.8 }}>
                                Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way.
                            </Typography>
                            <Button variant="contained" size="large"
                                component={RouterLink}
                                to={configData.USER_GROUPS_URL}
                                sx={{ borderRadius: 2, px: 4 }}
                            >
                                View Groups
                            </Button>
                        </Grid>
                        {mdUp && (
                            <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                                <motion.div variants={varFadeInRight}>
                                    <img src="/static/illustrations/dashboard-card.png" alt="dashboard" style={{ width: '100%' }} />
                                </motion.div>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    )
}
