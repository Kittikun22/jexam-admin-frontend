import React, { useState } from 'react';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography, Stack, Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircleIcon from '@mui/icons-material/Circle';

export default function ApproveTable({ allSlip, setAllSlip, filterSlip, approvedSlips, rejectedSlips, pendingSlips }) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', hour12: false, minute: '2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const approveSlip = (slip) => {
        Axios.post("http://localhost:8333/approveSlip", {
            slip_id: slip.slip_id,
            user_id: slip.user_id,
            exams: slip.exams
        }).then((res) => {
            const updatedData = allSlip.map(item => {
                if (item.slip_id === slip.slip_id) {
                    return { ...item, status: 'อนุมัติแล้ว' }
                }
                return item
            })
            setAllSlip(updatedData);
        })
    }

    const notApproveSlip = (slip) => {
        Axios.post("http://localhost:8333/notApproveSlip", {
            slip_id: slip.slip_id,
        }).then((res) => {
            const updatedData = allSlip.map(item => {
                if (item.slip_id === slip.slip_id) {
                    return { ...item, status: 'ไม่อนุมัติ' }
                }
                return item
            })
            setAllSlip(updatedData);
        })
    }

    function switchSlips(filterSlip) {
        switch (filterSlip) {
            case "all-Slip":
                return allSlip
            case "pending-Slip":
                return pendingSlips
            case "approved-Slip":
                return approvedSlips
            case "rejected-Slip":
                return rejectedSlips
            default:
                break
        }
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ไอดีสลิป</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ไอดีผู้ใช้</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ชื่อบัญชีผู้ใช้</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ไอดีข้อสอบ</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ราคา</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ราคาสุทธิ</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>สถานะ</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>หลักฐานการโอน</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }} width="100px">อัพโหลดเมื่อ</TableCell>
                            <TableCell align="right" sx={{ background: '#F3E99F' }} width="100px"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {switchSlips(filterSlip)?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, key) => {
                            return (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        <Typography>{val.slip_id}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.user_id}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.fname} {val.lname}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.exams}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.amount} บาท</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.net_amount} บาท</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Tooltip title={val.status}>
                                            {val.status === "รออนุมัติ" ? <CircleIcon sx={{ color: '#FFD93D' }} /> : val.status === "อนุมัติแล้ว" ? <CircleIcon color='success' /> : <CircleIcon color='error' />}
                                        </Tooltip>
                                        <Typography>{val.status}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <a href={val.image_src} target="_blank" rel='noreferrer'>
                                            <Box
                                                src={val.image_src}
                                                component="img"
                                                width="200px"
                                                sx={{
                                                    '&:hover': {
                                                        outline: "3px #FC2947 solid",
                                                    },
                                                }}
                                            />
                                        </a>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{formatDate(val.upload_at)}</Typography>
                                    </TableCell>

                                    <TableCell align="center" >
                                        <Stack direction='row'>
                                            {val.status === "รออนุมัติ" ?
                                                <>
                                                    <Tooltip title="อนุมัติ">
                                                        <IconButton
                                                            sx={{
                                                                transition: "all 0.25s ease",
                                                                "&:hover": {
                                                                    color: 'green',
                                                                    scale: '1.3'
                                                                }
                                                            }}
                                                            onClick={() => approveSlip(val)}
                                                        >
                                                            <CheckCircleIcon sx={{
                                                                fontSize: 30,
                                                            }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="ไม่อนุมัติ">
                                                        <IconButton
                                                            onClick={() => notApproveSlip(val)}
                                                        >
                                                            <CancelIcon sx={{
                                                                transition: "all 0.25s ease",
                                                                "&:hover": {
                                                                    color: '#FC2947'
                                                                }
                                                            }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                                :
                                                null
                                            }
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={switchSlips(filterSlip)?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
