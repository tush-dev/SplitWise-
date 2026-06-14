import { Box, Button, Container, Divider, Fab, Grid, Link, Stack, styled, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupDetailsService, getGroupExpenseService, getGroupSettleService } from '../../../services/groupServices';
import AlertBanner from '../../AlertBanner';
import Iconify from '../../Iconify';
import useResponsive from '../../../theme/hooks/useResponsive';
import { convertToCurrency, currencyFind, categoryIcon } from '../../../utils/helper';
import ExpenseCard from '../../expense/expenseCard';
import GroupCategoryGraph from './groupCategoryGraph';
import GroupMonthlyGraph from './groupMonthlyGraph';
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../../config.json';
import { GroupSettlements } from '../settlement';
import { SkeletonDashboardCard } from '../../SkeletonCard';
import PageTransition from '../../PageTransition';
import { motion } from 'framer-motion';
import { varFadeInUp, varStaggerContainer } from '../../../utils/animations';

const profile = JSON.parse(localStorage.getItem('profile'))
const emailId = profile?.emailId
var showCount = 10

const LabelIconStyle = styled('div')(({ theme }) => ({
    borderRadius: 60,
    width: 60,
    height: 60,
}))

const SummaryCardStyle = styled(motion.div)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: 16,
    cursor: 'default',
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}))

export default function ViewGroup() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState({});
    const [groupExpense, setGroupExpense] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertExpense, setAlertExpense] = useState(false);
    const [alertExpenseMessage, setAlertExpenseMessage] = useState('');
    const [showAllExp, setShowAllExp] = useState(false);
    const [expFocus, setExpFocus] = useState(false);
    const [expenses, setExpenses] = useState()
    const [viewSettlement, setViewSettlement] = useState(0)
    const [myBalanceSettlements, setMyBalanceSettlements] = useState([])

    const toggleAllExp = () => {
        setExpenses(groupExpense?.expense?.slice(0, showCount))
        if (showCount >= groupExpense?.expense?.length)
            setShowAllExp(true)
        setExpFocus(true)
        showCount += 5
    }

    const mdUp = useResponsive('up', 'md');

    const findUserSplit = (split) => {
        if (split) {
            split = split[0]
            return split[emailId]
        }
        return 0
    }

    useEffect(() => {
        const getGroupDetails = async () => {
            setLoading(true)
            const groupIdJson = { id: params.groupId }
            const response_group = await getGroupDetailsService(groupIdJson, setAlert, setAlertMessage)
            const response_expense = await getGroupExpenseService(groupIdJson, setAlertExpense, setAlertExpenseMessage)
            const settle_resp = await getGroupSettleService(groupIdJson, setAlert, setAlertMessage)

            response_group && setGroup(response_group?.data?.group)
            response_expense && setGroupExpense(response_expense?.data)
            response_expense?.data?.expense && setExpenses(response_expense?.data?.expense?.slice(0, 5))

            if (settle_resp?.data?.data) {
                const mySettlements = settle_resp.data.data.filter(s => s[0] === emailId || s[1] === emailId);
                setMyBalanceSettlements(mySettlements);
            }

            if (response_expense?.data?.expense?.length <= 5 || !response_expense)
                setShowAllExp(true)
            setLoading(false)
        }
        getGroupDetails()
    }, []);

    const CategoryStyle = styled('span')(({ theme }) => ({
        top: 22, left: -57, zIndex: 10, width: 35, height: 32, borderRadius: 50, position: 'relative'
    }));

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
                <SkeletonDashboardCard />
                <Box mt={2}><SkeletonDashboardCard /></Box>
            </Container>
        )
    }

    return (
        <PageTransition>
            <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
                <Box sx={{
                    bgcolor: (theme) => theme.palette['primary'].lighter,
                    borderRadius: { xs: 2, md: 3 }, p: { xs: 2, md: 3 },
                    color: (theme) => theme.palette['primary'].darker, pb: { xs: 3, md: 4 },
                    position: 'relative', overflow: 'hidden',
                }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Link component={RouterLink} to={dataConfig.EDIT_GROUP_URL + group?._id}>
                        <Iconify icon="akar-icons:edit" sx={{ float: 'right', fontSize: 18, opacity: 0.7, '&:hover': { opacity: 1 } }} />
                    </Link>
                    <Typography variant="h4" pb={1} fontWeight={800} fontSize={{ xs: 22, md: 34 }}>{group?.groupName}</Typography>
                    <Typography variant="body2">{group?.groupDescription}</Typography>
                    <Typography mt={1} variant="body2" sx={{ color: 'text.secondary' }}>
                        Created by &nbsp;
                        <Box component={'span'} sx={{ color: (theme) => theme.palette['primary'].darker, fontWeight: 600 }}>
                            {group?.groupOwner}
                        </Box>
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1} flexWrap="wrap" gap={1}>
                        <Typography variant="body2" sx={{
                            bgcolor: (theme) => theme.palette['warning'].lighter, p: 1, borderRadius: 1,
                            color: (theme) => theme.palette['warning'].darker, fontSize: { xs: 12, md: 14 }
                        }}>
                            Category : {group?.groupCategory}
                        </Typography>
                        <Fab component={RouterLink} to={dataConfig.ADD_EXPENSE_URL + group?._id}
                            color="primary" aria-label="add" variant={mdUp ? "extended" : "circular"}
                            sx={{
                                textDecoration: 'none',
                                ...(!mdUp && { margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed', zIndex: 1200 }),
                                ...(mdUp && { position: 'relative' })
                            }}>
                            <Iconify icon='eva:file-add-fill' sx={{ height: 22, width: 22, ...(mdUp && { mr: 1 }) }} />
                            {mdUp && <>Add Expense</>}
                        </Fab>
                    </Stack>
                    <Box sx={{ mb: -4, ml: -2, width: 80, height: 36, display: 'inline-block', bgcolor: 'currentColor', mask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`, WebkitMask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`, zIndex: 9, color: 'background.paper' }} />
                    <CategoryStyle sx={{ bgcolor: (theme) => theme.palette['primary'].lighter, py: '6px', px: '9px' }}>
                        <Iconify icon={categoryIcon(group?.groupCategory)} color={(theme) => theme.palette['primary'].darker} />
                    </CategoryStyle>
                </Box>

                <Box sx={{ mt: { xs: -1, md: -2 }, p: { xs: 1, md: 2 }, bgcolor: 'background.paper', minHeight: 50, width: '100%', borderRadius: { xs: 2, md: 3 } }}>
                    <Grid container spacing={2} mt={'1px'}>
                        <Grid item xs={12} md={4}>
                            <SummaryCardStyle sx={{ bgcolor: (theme) => theme.palette['primary'].lighter }} whileHover={{ y: -3 }}>
                                <Stack spacing={1.5} direction='row' alignItems="center">
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['primary'].dark, py: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: 40, md: 60 }, height: { xs: 40, md: 60 } }}>
                                        <Iconify icon="ph:invoice" sx={{ width: { xs: 20, md: 28 }, height: { xs: 20, md: 28 }, color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: (theme) => theme.palette['primary'].dark, fontWeight: 600, fontSize: { xs: 12, md: 14 } }}>Total expense</Typography>
                                        <Typography variant="h6" sx={{ color: (theme) => theme.palette['primary'].darker, fontWeight: 800, fontSize: { xs: 16, md: 24 } }}>
                                            {currencyFind(group?.groupCurrency)} {groupExpense.total ? convertToCurrency(groupExpense.total) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </SummaryCardStyle>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummaryCardStyle sx={{ bgcolor: (theme) => theme.palette['success'].lighter }} whileHover={{ y: -3 }}>
                                <Stack spacing={1.5} direction='row' alignItems="center">
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['success'].dark, py: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: 40, md: 60 }, height: { xs: 40, md: 60 } }}>
                                        <Iconify icon="mdi:cash-plus" sx={{ width: { xs: 20, md: 28 }, height: { xs: 20, md: 28 }, color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: (theme) => theme.palette['success'].dark, fontWeight: 600, fontSize: { xs: 12, md: 14 } }}>You are owed</Typography>
                                        <Typography variant="h6" sx={{ color: (theme) => theme.palette['success'].darker, fontWeight: 800, fontSize: { xs: 16, md: 24 } }}>
                                            {currencyFind(group?.groupCurrency)} {findUserSplit(group?.split) > 0 ? convertToCurrency(findUserSplit(group?.split)) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </SummaryCardStyle>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummaryCardStyle sx={{ bgcolor: (theme) => theme.palette['error'].lighter }} whileHover={{ y: -3 }}>
                                <Stack spacing={1.5} direction='row' alignItems="center">
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['error'].dark, py: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: 40, md: 60 }, height: { xs: 40, md: 60 } }}>
                                        <Iconify icon="mdi:cash-minus" sx={{ width: { xs: 20, md: 28 }, height: { xs: 20, md: 28 }, color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: (theme) => theme.palette['error'].dark, fontWeight: 600, fontSize: { xs: 12, md: 14 } }}>You owe</Typography>
                                        <Typography variant="h6" sx={{ color: (theme) => theme.palette['error'].darker, fontWeight: 800, fontSize: { xs: 16, md: 24 } }}>
                                            {currencyFind(group?.groupCurrency)} {findUserSplit(group?.split) < 0 ? convertToCurrency(Math.abs(findUserSplit(group?.split))) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </SummaryCardStyle>
                        </Grid>
                    </Grid>

                    <Stack pt={2} pb={1} divider={<Divider orientation="vertical" flexItem />}
                        direction="row" justifyContent='space-evenly' alignItems="center" spacing={0.5}>
                        {[
                            { label: mdUp ? 'Group Expenses' : 'Expenses', index: 0 },
                            { label: mdUp ? 'Group Balance' : 'Balance', index: 1 },
                            { label: mdUp ? 'My Balance' : 'My Balance', index: 2 },
                        ].map(tab => (
                            <Typography key={tab.index} onClick={() => setViewSettlement(tab.index)} noWrap
                                sx={{
                                    cursor: 'pointer', fontSize: { xs: 12, md: 18 }, width: '100%', textAlign: 'center',
                                    px: { xs: 0.5, md: 1 }, py: { xs: 1, md: '5px' },
                                    ...(viewSettlement === tab.index && {
                                        fontWeight: 800, borderRadius: 1,
                                        color: (theme) => theme.palette['info'].dark,
                                        bgcolor: (theme) => theme.palette['primary'].lighter,
                                    }),
                                }}>
                                {tab.label}
                            </Typography>
                        ))}
                    </Stack>

                    <Grid container mt={1} rowSpacing={2} columnSpacing={{ xs: 1, md: 2 }}
                        justifyContent={'center'} alignItems={'center'}>

                        {viewSettlement === 2 &&
                            <Grid item xs={12}>
                                <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.paper', borderRadius: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="h6" fontWeight={700} mb={2} color="primary" fontSize={{ xs: 16, md: 20 }}>
                                        Your Balance Breakdown
                                    </Typography>
                                    {myBalanceSettlements.length > 0 ? (
                                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: (theme) => theme.palette.action.hover }}>
                                                        <TableCell sx={{ fontSize: { xs: 12, md: 14 } }}><b>With</b></TableCell>
                                                        <TableCell align="center" sx={{ fontSize: { xs: 12, md: 14 } }}><b>You are owed</b></TableCell>
                                                        <TableCell align="center" sx={{ fontSize: { xs: 12, md: 14 } }}><b>You owe</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {myBalanceSettlements.map((s, i) => {
                                                        const otherPerson = s[0] === emailId ? s[1] : s[0];
                                                        const amount = s[2];
                                                        const youAreOwed = s[0] === emailId ? amount : 0;
                                                        const youOwe = s[1] === emailId ? amount : 0;
                                                        return (
                                                            <TableRow key={i}>
                                                                <TableCell sx={{ fontSize: { xs: 12, md: 14 } }}>{otherPerson}</TableCell>
                                                                <TableCell align="center">
                                                                    {youAreOwed > 0 ? (
                                                                        <Typography color="success.main" fontWeight={700} fontSize={{ xs: 12, md: 14 }}>
                                                                            {currencyFind(group?.groupCurrency)} {convertToCurrency(youAreOwed)}
                                                                        </Typography>
                                                                    ) : <Typography fontSize={{ xs: 12, md: 14 }}>-</Typography>}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {youOwe > 0 ? (
                                                                        <Typography color="error.main" fontWeight={700} fontSize={{ xs: 12, md: 14 }}>
                                                                            {currencyFind(group?.groupCurrency)} {convertToCurrency(youOwe)}
                                                                        </Typography>
                                                                    ) : <Typography fontSize={{ xs: 12, md: 14 }}>-</Typography>}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <Iconify icon="icon-park-twotone:doc-success" sx={{ color: (theme) => theme.palette['success'].main, fontSize: 64 }} />
                                            <Typography variant="body1" mt={2} color="text.secondary">
                                                All settled up! No pending balances.
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        }

                        {viewSettlement === 1 &&
                            <Grid item xs={12}>
                                <GroupSettlements currencyType={group?.groupCurrency} />
                            </Grid>
                        }

                        {viewSettlement === 0 &&
                            <>
                                {alertExpense ?
                                    <Grid container direction="column" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '200px' }}>
                                        <Typography variant="body2" fontSize={16} textAlign={'center'}>
                                            No expense present for this group! Record your first group expense now <br />
                                            <Link component={RouterLink} to={dataConfig.ADD_EXPENSE_URL + group?._id}>Add Expense</Link>
                                        </Typography>
                                    </Grid>
                                    : <>
                                        <Grid item xs={12} md={expFocus ? 12 : 6}>
                                            <motion.div variants={varStaggerContainer} initial="initial" animate="animate">
                                                <Grid container spacing={2}>
                                                    {expenses?.map(myExpense => (
                                                        <Grid item xs={12} md={expFocus ? 6 : 12} key={myExpense?._id}>
                                                            <motion.div variants={varFadeInUp}>
                                                                <ExpenseCard
                                                                    expenseId={myExpense?._id}
                                                                    expenseName={myExpense?.expenseName}
                                                                    expenseAmount={myExpense?.expenseAmount}
                                                                    expensePerMember={myExpense?.expensePerMember}
                                                                    expenseOwner={myExpense?.expenseOwner}
                                                                    expenseDate={myExpense?.expenseDate}
                                                                    currencyType={group?.groupCurrency}
                                                                />
                                                            </motion.div>
                                                        </Grid>
                                                    ))}
                                                    {!showAllExp && <Grid item xs={12}>
                                                        <Button onClick={toggleAllExp} variant="outlined" sx={{ borderRadius: 2 }}>View More</Button>
                                                    </Grid>}
                                                </Grid>
                                            </motion.div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <GroupCategoryGraph currencyType={group?.groupCurrency} />
                                        </Grid>
                                        <Grid item xs={12} md={expFocus || viewSettlement ? 6 : 12}>
                                            <GroupMonthlyGraph />
                                        </Grid>
                                    </>
                                }
                            </>
                        }
                    </Grid>
                </Box>
            </Container>
        </PageTransition>
    )
}
