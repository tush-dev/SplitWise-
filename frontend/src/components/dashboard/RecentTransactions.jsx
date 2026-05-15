
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { getRecentUserExpService } from '../../services/expenseServices'
import AlertBanner from '../AlertBanner'
import ExpenseCard from '../expense/expenseCard'
import Loading from '../loading'


export const RecentTransactions = () => {
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [recentExp, setRecentExp] = useState()
    const profile = JSON.parse(localStorage.getItem('profile'))
    useEffect(() => {
        const getRecentExp = async () => {
            setLoading(true)
            const userIdJson = {
                user: profile.emailId
            }
            const recent_exp = await getRecentUserExpService(userIdJson, setAlert, setAlertMessage)
            recent_exp && setRecentExp(recent_exp?.data?.expense)
            setLoading(false)

        }
        getRecentExp()


    }, [])

    return (
        <>
        {loading ? <Loading/> : 
        <Box sx={{
            boxShadow: '0 18px 45px rgba(33, 43, 54, 0.08)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            overflow: 'hidden',
        }}>
            <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
            <Typography
                variant="h6"
                sx={{
                    px: { xs: 2, sm: 3 },
                    pt: { xs: 2, sm: 3 },
                    pb: 2,
                    fontSize: { xs: 22, sm: 28 },
                    fontWeight: 800,
                    color: 'text.primary'
                }}
            >
                Your Recent transactions,
            </Typography>
            <Box sx={{
                display: 'grid',
                gap: 2,
                px: { xs: 1.5, sm: 2 },
                pb: { xs: 1.5, sm: 2 }
            }}>
                {recentExp?.map(myExpense => (
                    <ExpenseCard
                        key={myExpense?._id}
                        expenseId={myExpense?._id}
                        expenseName={myExpense?.expenseName}
                        expenseAmount={myExpense?.expenseAmount}
                        expensePerMember={myExpense?.expensePerMember}
                        expenseOwner={myExpense?.expenseOwner}
                        expenseDate={myExpense?.expenseDate}
                        currencyType={myExpense?.expenseCurrency}
                    />
                ))}
            </Box>
        </Box>}
        </>
    )
}
