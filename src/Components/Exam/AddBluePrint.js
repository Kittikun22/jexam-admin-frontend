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
    "topic": "",
    "subtopics": [{
        "subtopic": "",
        "explanation": "",
        "details": [{
            "detail": ""
        }, {
            "detail": ""
        }]
    }]
}

function AddBluePrint({ openAddBluePrint, setOpenAddBluePrint, selectExam, setSelectExam }) {

    const [newBluePrint, setNewBluePrint] = useState([])

    const [newTopicBluePrint, setNewTopicBluePrint] = useState(initialState)

    const [openConfirmAddBluePrint, setOpenConfirmAddBluePrint] = useState(false)

    const handleCloseAddBluePrint = () => {
        setOpenAddBluePrint(false)
    }

    const handleCloseConfirmAddBluePrint = () => {
        setOpenConfirmAddBluePrint(false)
    }

    const handleOnSubmitAddBluePrint = () => {
        //
    }

    return (
        <>
            <Dialog open={openAddBluePrint} fullWidth="true" maxWidth="lg" >
                <DialogTitle>
                    <Typography variant="h5" align="center">
                        เพิ่มโครงสร้างข้อสอบ (Blue Print)
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ minHeight: '250px' }} dividers >
                    <Box component='form' onSubmit=''>

                        <Stack spacing={2} p={2} >
                            <TextField
                                size="small"
                                variant="outlined"
                                label="หัวข้อ"
                                required
                                value={newTopicBluePrint?.topic}
                                onChange={(e) => setNewTopicBluePrint({ ...newTopicBluePrint, topic: e.target.value })}
                            />

                            <TextField
                                size="small"
                                variant="outlined"
                                label="หัวข้อย่อย"
                                required
                                value={newTopicBluePrint?.topic}
                                onChange={(e) => setNewTopicBluePrint({ ...newTopicBluePrint, topic: e.target.value })}
                            />


                            <Box sx={{ display: "flex", justifyContent: "space-between", pt: 4 }}>
                                <Button variant="contained" color="error" onClick={handleCloseAddBluePrint}>ยกเลิก</Button>
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
                open={openConfirmAddBluePrint}
                onClose={handleCloseConfirmAddBluePrint}
                fullWidth="true" maxWidth="sm"
            >
                <DialogTitle >
                    <Typography align="center" variant="h5">ยืนยันการเพิ่มโครงสร้างข้อสอบ (Blue Print)</Typography>
                </DialogTitle>
                <DialogContent align="center">
                    <Typography>{newTopicBluePrint.topic}</Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Button variant="contained" sx={{ width: '20%' }} onClick={handleCloseConfirmAddBluePrint}>กลับ</Button>
                    <Button variant="contained" sx={{ width: '20%' }} color="success" onClick={handleOnSubmitAddBluePrint} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddBluePrint