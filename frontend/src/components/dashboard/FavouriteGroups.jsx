import { Box, Grid, Link, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getUserGroupsService } from '../../services/groupServices';
import dataConfig from '../../config.json';
import { Link as RouterLink } from 'react-router-dom';
import MiniGroupCard from '../groups/miniGroupCard';
import { SkeletonDashboardCard } from "../SkeletonCard";
import { motion } from "framer-motion";
import { varFadeInUp, varStaggerContainer } from "../../utils/animations";

const profile = JSON.parse(localStorage.getItem('profile'))
const emailId = profile?.emailId

const FavouriteGroups = () => {
    const [loading, setLoading] = useState(false)
    const [group, setGroup] = useState()
    const [colors] = useState(['primary', 'secondary', 'error', 'warning', 'info', 'success']);

    const checkActive = (split) => {
        for (var key in split) {
            if (split.hasOwnProperty(key)) {
                if (Math.round(split[key]) != 0)
                    return true
            }
        }
    }

    useEffect(() => {
        const getUserFavGroups = async () => {
            setLoading(true)
            const response_group = await getUserGroupsService(profile)
            setGroup(response_group.data.groups)
            setLoading(false)
        }
        getUserFavGroups()
    }, []);

    if (loading) return <SkeletonDashboardCard />;

    return (
        <motion.div variants={varFadeInUp}>
            <Box sx={{
                p: { xs: 3, md: 5 },
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: 5,
            }}>
                <Typography variant="h6" fontWeight={700} mb={3}>
                    Your Groups
                </Typography>
                <motion.div variants={varStaggerContainer} initial="initial" animate="animate">
                    <Grid container spacing={4}>
                        {group?.map(myGroup => (
                            <Grid item xs={12} md={12} lg={6} key={myGroup?._id}>
                                <motion.div variants={varFadeInUp}>
                                    <Link component={RouterLink}
                                        to={dataConfig.VIEW_GROUP_URL + myGroup?._id}
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        <MiniGroupCard
                                            groupId={myGroup?._id}
                                            title={myGroup?.groupName}
                                            description={myGroup?.groupDescription}
                                            groupMembers={myGroup?.groupMembers}
                                            share={myGroup?.split[0][emailId]}
                                            currencyType={myGroup?.groupCurrency}
                                            groupCategory={myGroup?.groupCategory}
                                            isGroupActive={checkActive(myGroup?.split[0])}
                                            color='info'
                                        />
                                    </Link>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Box>
        </motion.div>
    )
}

export default FavouriteGroups
