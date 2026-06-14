import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Stack } from '@mui/material';
import useResponsive from '../../theme/hooks/useResponsive';
import Logo from '../Logo';
import LoginForm from './LoginForm';
import Copyright from '../Copyright';
import configData from '../../config.json'
import PageTransition from '../PageTransition';
import { motion } from 'framer-motion';

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: { display: 'flex' },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0, zIndex: 9, lineHeight: 0, width: '100%', display: 'flex',
    alignItems: 'center', position: 'absolute', padding: theme.spacing(2),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: { alignItems: 'flex-start', padding: theme.spacing(7, 5, 0, 7) },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%', maxWidth: 464, display: 'flex', flexDirection: 'column',
    justifyContent: 'center', margin: theme.spacing(2, 0, 2, 2),
    borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480, margin: 'auto', minHeight: '100vh', display: 'flex',
    justifyContent: 'center', flexDirection: 'column',
    padding: theme.spacing(8, 2),
    [theme.breakpoints.up('md')]: { padding: theme.spacing(12, 0) },
}));

export default function Login() {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const user = JSON.parse(localStorage.getItem('profile'))
    if (user) {
        user.accessToken && (window.location.href = configData.DASHBOARD_URL)
    }
    return (
        <PageTransition>
            <RootStyle>
                <HeaderStyle>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <Logo />
                    </motion.div>
                    {smUp && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                                Don’t have an account?{' '}
                                <Link variant="subtitle2" component={RouterLink} to="/register">
                                    Get started
                                </Link>
                            </Typography>
                        </motion.div>
                    )}
                </HeaderStyle>
                {mdUp && (
                    <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                        <SectionStyle>
                            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                                Hi, Welcome Back
                            </Typography>
                            <img src="/static/illustrations/illustration_login.png" alt="login" />
                        </SectionStyle>
                    </motion.div>
                )}
                <Container maxWidth="sm">
                    <ContentStyle>
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <Typography variant="h4" gutterBottom fontWeight={800}>
                                Sign in to SplitApp
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>
                            <LoginForm />
                            {!smUp && (
                                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                                    Don’t have an account?{' '}
                                    <Link variant="subtitle2" component={RouterLink} to="/register">
                                        Get started
                                    </Link>
                                </Typography>
                            )}
                            <Stack spacing={3} sx={{ mt: 5 }}>
                                <Copyright />
                            </Stack>
                        </motion.div>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </PageTransition>
    )
}
