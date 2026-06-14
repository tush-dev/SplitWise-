import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import { getUserGroupsService } from "../../services/groupServices"
import AlertBanner from "../AlertBanner"
import 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SkeletonDashboardCard } from "../SkeletonCard";
import { motion } from "framer-motion";
import { varFadeInUp } from "../../utils/animations";

export const GroupExpenseChart = () => {
    const [loading, setLoading] = useState(true)
    const [groupExp, setGroupExp] = useState()
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const profile = JSON.parse(localStorage.getItem("profile"))

    const chartColors = [
        '#2065D1', '#54D62C', '#FFC107', '#FF4842', '#3366FF', '#FF6C40',
        '#2CD9C5', '#826AF9', '#FF8F6D', '#1890FF'
    ]

    const data = {
        labels: groupExp?.map(group => (group.groupName)),
        datasets: [
            {
                label: 'Group Expenses',
                data: groupExp?.map(group => (group.groupTotal)),
                fill: true,
                backgroundColor: chartColors.slice(0, groupExp?.length || 6),
                borderWidth: 2,
                borderColor: '#fff',
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            datalabels: { display: false },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 8,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: { size: 11 }
                },
            },
        }
    };

    useEffect(() => {
        const getGroupExpense = async () => {
            setLoading(true)
            const group_exp = await getUserGroupsService(profile, setAlert, setAlertMessage)
            setGroupExp(group_exp.data.groups)
            setLoading(false)
        }
        getGroupExpense()
    }, [])

    if (loading) return <SkeletonDashboardCard />;

    return (
        <motion.div variants={varFadeInUp}>
            <Box sx={{
                p: { xs: 2, md: 5 },
                bgcolor: 'background.paper',
                borderRadius: { xs: 3, md: 4 },
                boxShadow: 5,
            }}>
                <Typography variant="h6" fontWeight={700} mb={3} fontSize={{ xs: 18, md: 24 }}>
                    Groupwise Expenses
                </Typography>
                <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                <Box height={{ xs: 280, sm: 400, md: 500 }}>
                    <Pie data={data} options={options} plugins={[ChartDataLabels]} />
                </Box>
            </Box>
        </motion.div>
    )
}
