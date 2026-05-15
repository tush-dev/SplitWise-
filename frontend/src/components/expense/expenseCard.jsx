import { Box, styled, Typography, Popover, MenuList, MenuItem, ListItemIcon, ListItemText, Modal, Stack, Button, IconButton, Tooltip, Divider } from '@mui/material'
import React, { useState } from 'react'
import useResponsive from '../../theme/hooks/useResponsive';
import PropTypes from 'prop-types';
import { convertToCurrency, currencyFind, getMonthMMM, zeroPad } from '../../utils/helper';
import Iconify from '../Iconify';
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../config.json';
import { deleteExpenseService } from '../../services/expenseServices';


const DateBoxStyle = styled('div')(({ theme }) => ({
    width: 76,
    height: 76,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(145deg, ${theme.palette.warning.lighter}, #fff7d6)`,
    color: theme.palette.warning.darker,
    border: `1px solid ${theme.palette.warning.light}`,
    flexShrink: 0
}));

ExpenseCard.propTypes = {
    expenseName: PropTypes.string,
    expenseAmount: PropTypes.number,
    expensePerMember: PropTypes.number,
    expenseOwner: PropTypes.string,
    currencyType: PropTypes.string
}

const modelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3
};


export default function ExpenseCard({ expenseId, expenseName, expenseAmount, expensePerMember, expenseOwner, expenseDate, currencyType }) {
    const mdUp = useResponsive('up', 'md');
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteConfirmOpen = () =>{
        setDeleteConfirm(true)
      }
      const deleteConfirmClose = () =>{
        setDeleteConfirm(false)
      }

      const apiDeleteCall = async() => {
        await deleteExpenseService({id: expenseId})
        window.location.reload()
        deleteConfirmClose()
      }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
                p: { xs: 1.5, sm: 2 },
                pr: { xs: 1.25, sm: 1.5 },
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2,
                boxShadow: '0 10px 28px rgba(33, 43, 54, 0.08)',
                transition: 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 16px 34px rgba(33, 43, 54, 0.12)',
                    borderColor: 'primary.lighter'
                }
            }}
        >
            <DateBoxStyle>
                <Typography
                    component="span"
                    sx={{
                        fontSize: 28,
                        fontWeight: 800,
                        lineHeight: 1
                    }}
                >
                    {zeroPad(new Date(expenseDate).getDate())}
                </Typography>
                <Typography
                    component="span"
                    sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        letterSpacing: 0,
                        lineHeight: 1.2,
                        mt: 0.5
                    }}
                >
                    {getMonthMMM(expenseDate)}
                </Typography>
            </DateBoxStyle>

            <Box sx={{
                flex: 1,
                minWidth: 0
            }}>
                <Typography
                    noWrap
                    variant='h6'
                    color={(theme) => theme.palette['primary'].dark}
                    title={expenseName}
                    sx={{
                        fontSize: { xs: 18, sm: 20 },
                        fontWeight: 800,
                        lineHeight: 1.2
                    }}
                >
                    {expenseName}
                </Typography>
                <Typography
                    variant='body2'
                    color={(theme) => theme.palette['primary'].dark}
                    sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        mt: 0.5
                    }}
                >
                    Total: {currencyFind(currencyType)} {convertToCurrency(expenseAmount)}
                </Typography>
                <Typography
                    noWrap
                    variant='body2'
                    title={expenseOwner}
                    sx={{
                        color: 'text.secondary',
                        fontSize: 12,
                        mt: 0.75,
                        maxWidth: '100%'
                    }}
                >
                    Paid by {expenseOwner}
                </Typography>
            </Box>

            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    borderColor: 'grey.200'
                }}
            />

            <Box
                sx={{
                    width: { xs: 112, sm: 132 },
                    flexShrink: 0,
                    textAlign: 'right',
                    alignSelf: 'center',
                    mr: { xs: 0.5, sm: 1 }
                }}
            >
                <Typography
                    color="text.secondary"
                    sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 0
                    }}>
                    Per person
                </Typography>
                <Typography
                    color={(theme) => theme.palette['error'].dark}
                    sx={{
                        fontSize: { xs: 18, sm: 21 },
                        fontWeight: 800,
                        lineHeight: 1.35,
                        whiteSpace: 'nowrap'
                    }}
                >
                    {currencyFind(currencyType)} {convertToCurrency(expensePerMember)}
                </Typography>
            </Box>

            <Box sx={{
                flexShrink: 0
            }}>
                    <Tooltip title="Expense actions">
                        <IconButton
                            aria-describedby={id}
                            aria-label="Expense actions"
                            onClick={handleClick}
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                bgcolor: 'grey.100',
                                '&:hover': {
                                    bgcolor: 'grey.200'
                                }
                            }}
                        >
                            <Iconify icon="charm:menu-meatball" width={20} height={20} />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <MenuList>
                            <MenuItem component={RouterLink}
                                to={dataConfig.VIEW_EXPENSE_URL + expenseId}>
                                <ListItemIcon>
                                    <Iconify icon="carbon:view-filled" />
                                </ListItemIcon>
                                <ListItemText>View</ListItemText>
                            </MenuItem>
                            <MenuItem component={RouterLink}
                                to={dataConfig.EDIT_EXPENSE_URL + expenseId}>
                                <ListItemIcon>
                                    <Iconify icon="dashicons:edit-large" />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={deleteConfirmOpen} sx={{ color: (theme) => theme.palette['error'].main }}>
                                <ListItemIcon>
                                    <Iconify sx={{ color: (theme) => theme.palette['error'].main }} icon="fluent:delete-20-filled" />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Popover>
                    <Modal
                        open={deleteConfirm}
                        onClose={deleteConfirmClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modelStyle} width={mdUp ? 400 : '90%'}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Confirm expense deletion
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Are you sure you want to delete the expense?
                            </Typography>
                            <Stack mt={2} spacing={2} direction={'row'}>
                                <Button startIcon={<Iconify icon='fluent:delete-dismiss-24-filled' />} variant="outlined" color="error" sx={{ width: '100%' }}
                                    onClick={apiDeleteCall}
                                >
                                    Delete
                                </Button>
                                <Button startIcon={<Iconify icon='material-symbols:cancel' />} variant="outlined" color="primary" sx={{ width: '100%' }}
                                    onClick={deleteConfirmClose}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </Box>
        </Box>
    )
}
