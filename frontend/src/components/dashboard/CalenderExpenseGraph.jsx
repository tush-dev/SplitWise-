import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material"
import { Line } from "react-chartjs-2";
import 'chart.js/auto'
import { useEffect, useState } from "react";
import { getUserDailyExpService, getUserMonthlyExpService } from "../../services/expenseServices";
import { monthNamesMMM } from "../../utils/helper";
import AlertBanner from "../AlertBanner";
import { SkeletonDashboardCard } from "../SkeletonCard";
import { motion } from "framer-motion";
import { varFadeInUp } from "../../utils/animations";

export const CalenderExpenseGraph = () => {
    const [montlyView, setMonthlyView] = useState(true)
    const [loading, setLoading] = useState(true)
    const profile = JSON.parse(localStorage.getItem("profile"))
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userMonthlyExp, setUserMonthlyExp] = useState()
    const [userDailyExp, setUserDailyExp] = useState()

    const toggleMonthlyView = () => {
        setMonthlyView(!montlyView)
    }

    const data = {
        labels: montlyView? userDailyExp?.map(daily => (monthNamesMMM[daily._id.month-1] + '-' + daily._id.date)):userMonthlyExp?.map(monthly => ( monthNamesMMM[monthly._id.month-1])),
        datasets: [
            {
                label:  montlyView? "Daily expense" : "Monthly expense",
                data: montlyView? userDailyExp?.map(daily => (daily.amount)):userMonthlyExp?.map(monthly => (monthly.amount)),
                backgroundColor: 'rgba(32, 101, 209, 0.2)',
                borderColor: '#2065D1',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2065D1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
            }
        ]
    }

    const options = {
        tension: 0.4,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { display: false },
            datalabels: { display: false },
            tooltip: {
                backgroundColor: '#212B36',
                titleFont: { size: 13 },
                bodyFont: { size: 12 },
                cornerRadius: 8,
                padding: 10,
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(145, 158, 171, 0.12)' },
                ticks: { font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 10 } }
            }
        }
    };

    useEffect(() => {
    const getUserDetails = async() => {
        setLoading(true);
        const userIdJson = { user: profile.emailId }
        const response_group_monthly = await getUserMonthlyExpService(userIdJson, setAlert, setAlertMessage)
        setUserMonthlyExp(response_group_monthly.data.data)
        const response_group_daily = await getUserDailyExpService(userIdJson, setAlert, setAlertMessage)
        setUserDailyExp(response_group_daily.data.data)
        setLoading(false)
    }   
    getUserDetails();
    }, [])

    if (loading) return <SkeletonDashboardCard />;

    return (
        <motion.div variants={varFadeInUp}>
            <Box sx={{
                bgcolor: 'background.paper',
                borderRadius: { xs: 3, md: 4 },
                boxShadow: 5,
                p: { xs: 2, md: 5 }
            }}>
                <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                <Typography variant="h6" fontWeight={700} mb={3} fontSize={{ xs: 18, md: 24 }}>
                    Expense Trend - {montlyView ? "Daily View" : "Monthly View"}
                </Typography>
                <Box height={{ xs: 220, sm: 300, md: 350 }} my={2}>
                    <Line data={data} options={options} />
                </Box>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={!montlyView} onChange={toggleMonthlyView} color="primary" size="small" />}
                        label="Monthly expense view"
                    />
                </FormGroup>
            </Box>
        </motion.div>
    )
}
