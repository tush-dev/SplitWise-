import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack } from '@mui/material';
import Copyright from './Copyright';
import configData from '../config.json'
import PageTransition from './PageTransition';
import { motion } from 'framer-motion';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

export default function Page404() {
    return (
        <PageTransition>
            <Container>
                <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <Typography variant="h3" paragraph fontWeight={800}>
                            Sorry, page not found!
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Typography sx={{ color: 'text.secondary' }}>
                            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Be sure to check your spelling.
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Box
                            component="img"
                            src="/static/illustrations/illustration_404.svg"
                            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Button to={configData.LOGIN_URL} size="large" variant="contained" component={RouterLink} sx={{ borderRadius: 2, px: 4 }}>
                            Go to Home
                        </Button>
                    </motion.div>
                    <Stack spacing={3} sx={{ mt: 5 }}>
                        <Copyright />
                    </Stack>
                </ContentStyle>
            </Container>
        </PageTransition>
    )
}
