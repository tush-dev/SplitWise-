import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getUserCategoryExpService } from '../../services/expenseServices';
import AlertBanner from '../AlertBanner';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'
import useResponsive from "../../theme/hooks/useResponsive";
import { SkeletonDashboardCard } from "../SkeletonCard";
import { motion } from "framer-motion";
import { varFadeInUp } from "../../utils/animations";

export const CategoryExpenseChart = () => {
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [loading, setLoading] = useState(true)
    const [categoryExp, setCategoryExp] = useState()
    const profile = JSON.parse(localStorage.getItem("profile"))
    const mdUp = useResponsive('up', 'md');

    const chartColors = [
        '#2065D1', '#54D62C', '#FFC107', '#FF4842', '#3366FF', '#FF6C40',
        '#2CD9C5', '#826AF9', '#FF8F6D', '#1890FF'
    ]

    const data = {
        labels: categoryExp?.map(category => (category._id)),
        datasets: [
            {
                label: 'Category Expenses',
                data: categoryExp?.map(category => (category.amount)),
                fill: true,
                backgroundColor: chartColors.slice(0, categoryExp?.length || 6),
                borderWidth: 2,
                borderColor: '#fff',
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        cutout: mdUp ? '65%' : '55%',
        plugins: {
            datalabels: { display: false },
            legend: {
                display: true,
                position: mdUp ? 'right' : 'bottom',
                labels: {
                    padding: 12,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: { size: mdUp ? 13 : 11 }
                },
            },
        }
    };

    useEffect(() => {
        const getGroupCategoryExpense = async () => {
            setLoading(true)
            const userIdJson = { user: profile.emailId }
            const category_exp = await getUserCategoryExpService(userIdJson, setAlert, setAlertMessage)
            setCategoryExp(category_exp.data.data)
            setLoading(false)
        }
        getGroupCategoryExpense()
    }, [])

    if (loading) return <SkeletonDashboardCard />;

    return (
        <motion.div variants={varFadeInUp}>
            <Box sx={{
                p: { xs: 2, md: 5 },
                bgcolor: 'background.paper',
                borderRadius: { xs: 3, md: 4 },
                boxShadow: 5
            }}>
                <Typography variant="h6" fontWeight={700} mb={3} fontSize={{ xs: 18, md: 24 }}>
                    Category Expense Breakdown
                </Typography>
                <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                <Box height={{ xs: 300, sm: 400, md: 500 }}>
                    <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
                </Box>
            </Box>
        </motion.div>
    )
}
