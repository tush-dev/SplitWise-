import { Box, Grid, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { convertToCurrency } from '../../utils/helper'
import Iconify from '../Iconify'
import AnimatedCounter from '../AnimatedCounter'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const LabelIconStyle = styled('div')(({ theme }) => ({
    borderRadius: 60,
    width: 60,
    height: 60,
}))

const CardStyle = styled(motion.div)(({ theme }) => ({
    borderRadius: 16,
    padding: theme.spacing(3),
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'default',
}))

export const SummaryCards = ({ userTotalExp }) => {
    return (
        <Grid container spacing={3} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={12} md={4}>
                <CardStyle
                    sx={{ bgcolor: (theme) => theme.palette['primary'].lighter }}
                    whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.1)' }}
                >
                    <Stack spacing={2} direction='row' alignItems="center">
                        <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['primary'].dark, py: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Iconify icon="ph:invoice" sx={{ width: 28, height: 28, color: 'white' }} />
                        </LabelIconStyle>
                        <Box>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette['primary'].dark, fontWeight: 600 }}>
                                Total Expenses
                            </Typography>
                            <Typography variant="h5" sx={{ color: (theme) => theme.palette['primary'].darker, fontWeight: 800 }}>
                                ₹ <AnimatedCounter value={userTotalExp ? Math.round(userTotalExp) : 0} />
                            </Typography>
                        </Box>
                    </Stack>
                </CardStyle>
            </Grid>
            <Grid item xs={12} md={4}>
                <CardStyle
                    sx={{ bgcolor: (theme) => theme.palette['success'].lighter }}
                    whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.1)' }}
                >
                    <Stack spacing={2} direction='row' alignItems="center">
                        <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['success'].dark, py: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Iconify icon="mdi:cash-plus" sx={{ width: 28, height: 28, color: 'white' }} />
                        </LabelIconStyle>
                        <Box>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette['success'].dark, fontWeight: 600 }}>
                                You are owed
                            </Typography>
                            <Typography variant="h5" sx={{ color: (theme) => theme.palette['success'].darker, fontWeight: 800 }}>
                                ₹ 0
                            </Typography>
                        </Box>
                    </Stack>
                </CardStyle>
            </Grid>
            <Grid item xs={12} md={4}>
                <CardStyle
                    sx={{ bgcolor: (theme) => theme.palette['error'].lighter }}
                    whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.1)' }}
                >
                    <Stack spacing={2} direction='row' alignItems="center">
                        <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['error'].dark, py: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Iconify icon="mdi:cash-minus" sx={{ width: 28, height: 28, color: 'white' }} />
                        </LabelIconStyle>
                        <Box>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette['error'].dark, fontWeight: 600 }}>
                                You owe
                            </Typography>
                            <Typography variant="h5" sx={{ color: (theme) => theme.palette['error'].darker, fontWeight: 800 }}>
                                ₹ 0
                            </Typography>
                        </Box>
                    </Stack>
                </CardStyle>
            </Grid>
        </Grid>
    )
}

SummaryCards.propTypes = {
    userTotalExp: PropTypes.number,
}
