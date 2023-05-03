import React, { useState } from "react";
import Axios from 'axios'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box, InputAdornment } from "@mui/material";

const initialState = {
    "Title": "",
    "Description": "",
    "Duration": 30
}

function AddExamInfo({ openAddExamInfo, setOpenAddExamInfo, selectExam, setSelectExam }) {

    const [newExamInfo, setNewExamInfo] = useState(initialState)

    const handleClose = () => {
        setNewExamInfo(initialState)
        setSelectExam()
        setOpenAddExamInfo(false);
    };

    const handleOpenConfirm = (e) => {
        e.preventDefault()
        setOpenConfirmAddExamInfo(true)
    }

    const handleOnSubmitAddExamInfo = async () => {
        await Axios.post("http://localhost:8333/addExamInfo", {
            exam_id: selectExam?.exam_id,
            exam_info: JSON.stringify([newExamInfo])
        }).then((res) => {
            if (res.data.message === 'successfully') {
                handleClose()
                setOpenConfirmAddExamInfo(false)
            } else {
                console.log('เพิ่มข้อมูลไม่สำเร็จ');
            }
        })
    }

    const [openConfirmAddExamInfo, setOpenConfirmAddExamInfo] = useState(false)

    const handleCloseConfirmAddExamInfo = () => {
        setOpenConfirmAddExamInfo(false)
    }

    console.log(newExamInfo);

    return (
        <>
            <Dialog open={openAddExamInfo} fullWidth="true" maxWidth="xl" >
                <DialogTitle>
                    <Typography variant="h5" align="center">
                        เพิ่มข้อมูลข้อสอบ
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ minHeight: '250px' }} dividers >
                    <Box component='form' onSubmit={handleOpenConfirm}>

                        <Stack spacing={2} p={2} >

                            <TextField
                                size="small"
                                variant="outlined"
                                label="ชื่อข้อสอบ"
                                required
                                value={newExamInfo?.Title}
                                onChange={(e) => setNewExamInfo({ ...newExamInfo, Title: e.target.value })}
                            />

                            <TextField
                                size="small"
                                variant="outlined"
                                label="รายละเอียดข้อสอบ"
                                required
                                value={newExamInfo?.Description}
                                onChange={(e) => setNewExamInfo({ ...newExamInfo, Description: e.target.value })}
                            />

                            <TextField
                                size="small"
                                variant="outlined"
                                label="ระยะเวลาการทำข้อสอบ"
                                type="number"
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">นาที</InputAdornment>,
                                    inputProps: {
                                        min: 1
                                    }
                                }}
                                value={newExamInfo?.Duration}
                                onChange={(e) => setNewExamInfo({ ...newExamInfo, Duration: e.target.value })}
                            />

                            <Box sx={{ display: "flex", justifyContent: "space-between", pt: 4 }}>
                                <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                >
                                    เพิ่ม
                                </Button>
                            </Box>

                        </Stack>

                    </Box>
                </DialogContent>

            </Dialog >

            <Dialog
                open={openConfirmAddExamInfo}
                onClose={handleCloseConfirmAddExamInfo}
                fullWidth="true" maxWidth="sm"
            >
                <DialogTitle >
                    <Typography align="center" variant="h5">ยืนยันการเพิ่มข้อมูลข้อสอบ</Typography>
                </DialogTitle>
                <DialogContent align="center">
                    <Typography>หัวข้อข้อสอบ : {newExamInfo.Title}</Typography>
                    <Typography>รายละเอียดข้อสอบ : {newExamInfo.Description}</Typography>
                    <Typography>ระยะเวลาการทำข้อสอบ : {newExamInfo.Duration}</Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Button variant="contained" sx={{ width: '20%' }} onClick={handleCloseConfirmAddExamInfo}>กลับ</Button>
                    <Button variant="contained" sx={{ width: '20%' }} color="success" onClick={handleOnSubmitAddExamInfo} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddExamInfo