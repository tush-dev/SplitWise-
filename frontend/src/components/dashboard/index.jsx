import { Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { getUserExpenseService } from "../../services/expenseServices"
import { getUserGroupsService } from "../../services/groupServices"
import { CalenderExpenseGraph } from "./CalenderExpenseGraph"
import { CategoryExpenseChart } from "./CategoryExpenseGraph"
import { EndMessage } from "./endMessage"
import { GroupExpenseChart } from "./GroupExpenseChart"
import { RecentTransactions } from "./RecentTransactions"
import { SummaryCards } from "./summaryCards"
import { WelcomeMessage } from "./welcomeMessage"
import { Link as RouterLink } from 'react-router-dom';
import configData from '../../config.json'
import FavouriteGroups from "./FavouriteGroups"
import { SkeletonDashboardCard } from "../SkeletonCard"
import PageTransition from "../PageTransition"
import { varStaggerContainer } from "../../utils/animations"

export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const profile = JSON.parse(localStorage.getItem("profile"))
    const [userExp, setUserExp] = useState()
    const [newUser, setNewUser] = useState(false)

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            const userIdJson = { user: profile.emailId }
            const response_expense = await getUserExpenseService(userIdJson)
            setUserExp(response_expense.data);
            const response_group = await getUserGroupsService(profile)
            if (response_group.data.groups.length === 0)
                setNewUser(true)
            setLoading(false)
        }
        getUserDetails();
    }, [])

    if (loading) {
        return (
            <Container maxWidth={'xl'} sx={{ px: { xs: 1, sm: 2 } }}>
                <Grid container spacing={{ xs: 1, md: 3 }}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={{ xs: 1, md: 3 }}>
                            {[1, 2, 3].map(i => (
                                <Grid item xs={12} key={i}>
                                    <SkeletonDashboardCard />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SkeletonDashboardCard />
                    </Grid>
                </Grid>
            </Container>
        )
    }

    return (
        <PageTransition>
            <Container maxWidth={'xl'} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid item xs={12} md={8}>
                        <motion.div variants={varStaggerContainer} initial="initial" animate="animate">
                            <Grid container spacing={{ xs: 2, md: 3 }}>
                                <Grid item xs={12}>
                                    <WelcomeMessage />
                                </Grid>
                                {newUser ?
                                    <Grid item xs={12}>
                                        <Grid container
                                            direction="column"
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                minHeight: 'calc(50vh - 200px)',
                                            }}
                                        >
                                            <Typography variant="body2" fontSize={18} textAlign={'center'}>
                                                Seems to be new here! Create your first group and add expenses <br />
                                                <Link component={RouterLink} to={configData.CREATE_GROUP_URL}>
                                                    Create Group
                                                </Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    :
                                    <>
                                        <Grid item xs={12}>
                                            <SummaryCards userTotalExp={userExp?.total} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FavouriteGroups />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CalenderExpenseGraph />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <CategoryExpenseChart />
                                        </Grid>
                                    </>
                                }
                            </Grid>
                        </motion.div>
                    </Grid>
                    {!newUser &&
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={{ xs: 2, md: 3 }}>
                                <Grid item xs={12}>
                                    <RecentTransactions />
                                </Grid>
                                <Grid item xs={12}>
                                    <GroupExpenseChart />
                                </Grid>
                                <Grid item xs={12}>
                                    <EndMessage />
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Container>
        </PageTransition>
    )
}
