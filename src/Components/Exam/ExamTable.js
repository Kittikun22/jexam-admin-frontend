import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography, Stack } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';



export default function ExamTable({ allExam }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ไอดี</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>รูป</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ชื่อข้อสอบ</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>รายละเอียด</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>Blue Print</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>Exam Info</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>Exam Content</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>ประเภท</TableCell>
                            <TableCell align="center" sx={{ background: '#F3E99F' }}>วิชา</TableCell>
                            <TableCell align="right" sx={{ background: '#F3E99F' }} width="100px"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {allExam?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, key) => {
                            return (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        <Typography>{val.exam_id}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <a href={val.pic} target="_blank" rel='noreferrer'>
                                            <Box
                                                src={val.pic}
                                                component="img"
                                                width="150px"
                                                sx={{
                                                    '&:hover': {
                                                        outline: "3px #FC2947 solid",
                                                    },
                                                }}
                                            />
                                        </a>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.name}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.detail}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{val.blueprint}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                            {val.exam_info}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                            {val.exam_content}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.subject_name}</Typography>

                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{val.category_name}</Typography>
                                    </TableCell>

                                    <TableCell align="center" >
                                        <Stack direction='row'>
                                            <IconButton sx={{
                                                "&:hover": {
                                                    color: '#FF8400',
                                                    scale: '1.3'
                                                }
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton sx={{
                                                "&:hover": {
                                                    color: '#FC2947',
                                                    scale: '1.3'
                                                }
                                            }}>
                                                <CloseIcon />
                                            </IconButton>
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
                count={allExam?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
