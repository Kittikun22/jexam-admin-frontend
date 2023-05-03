import React, { useState, useEffect } from "react";
import Axios from 'axios'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box, InputAdornment } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageIcon from '@mui/icons-material/Image';

const initialState = {
    name: '',
    amount: 0,
    detail: '',
    blueprint: '',
    pic: '',
    exam_info: '',
    exam_content: '',
    favorite: 0,
    category_id: 1,
    subject_id: 1
}

function AddExam({ openAddExam, setOpenAddExam }) {

    const [newExam, setNewExam] = useState(initialState)

    const [category, setCategory] = useState()
    const [subject, setSubject] = useState()

    const [file, setFile] = useState({})
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

    useEffect(() => {
        Axios.get("http://localhost:8333/getExamCategory").then((res) => {
            setCategory(res.data)
        })
        Axios.get("http://localhost:8333/getExamSubject").then((res) => {
            setSubject(res.data)
        })
    }, [])

    const handleClose = () => {
        setOpenAddExam(false);
        setNewExam(initialState)
    };

    const handleFile = async (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(file)
            setImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append('file', file)
        await Axios.post('http://localhost:8000/uploadExamPic', formData).then((res) => {
            setNewExam({ ...newExam, pic: res.data.image_src })
        })
    }

    const onSubmit = async () => {
        await Axios.post('http://localhost:8333/createNewExam', {
            name: newExam.name,
            detail: newExam.detail,
            pic: newExam.pic,
            amount: newExam.amount,
            category_id: newExam.category_id,
            subject_id: newExam.subject_id
        }).then((res) => {
            if (res.data.message === 'successfully') {
                handleClose()
            }
        })
    }

    return (
        <Dialog open={openAddExam} fullWidth="true" maxWidth="lg" >
            <DialogTitle>
                <Typography variant="h5" align="center">
                    เพิ่มข้อสอบ
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ minHeight: '500px' }} dividers >
                <Stack spacing={2} mb={5}>

                    {imagePreviewUrl === null ?
                        <Box sx={{
                            width: '225px',
                            height: '250px',
                            background: '#D8D8D8',
                            alignSelf: 'center'
                        }}>
                        </Box>
                        :
                        <Box
                            component="img"
                            src={imagePreviewUrl}
                            width="225px"
                            sx={{ alignSelf: 'center' }}
                        />
                    }
                    {newExam.pic ? <a href={newExam.pic} target="_blank" rel="noreferrer"><Typography align="center" variant="body2">{newExam.pic}</Typography></a> : null}
                    <Button variant="contained" component="label" >
                        <ImageIcon /> เลือกรูปภาพ
                        <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                    </Button>

                    <TextField
                        size="small"
                        variant="outlined"
                        label="ชื่อข้อสอบ"
                        onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                    />

                    <TextField
                        size="small"
                        variant="outlined"
                        label="รายละเอียด"
                        onChange={(e) => setNewExam({ ...newExam, detail: e.target.value })}
                    />

                    <TextField
                        size="small"
                        variant="outlined"
                        label="ราคา"
                        value={newExam?.amount}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">บาท</InputAdornment>,
                        }}
                        onChange={(e) => setNewExam({ ...newExam, amount: e.target.value })}
                    />

                    <FormControl size="small">
                        <InputLabel>วิชา</InputLabel>
                        <Select
                            value={newExam?.subject_id}
                            label="วิชา"
                            onChange={(e) => setNewExam({ ...newExam, subject_id: e.target.value })}
                        >
                            {subject?.map((val, key) => {
                                return (
                                    <MenuItem value={val.subject_id}>
                                        {val.subject_name === '' ? '-' : val.subject_name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel>ประเภทข้อสอบ</InputLabel>
                        <Select
                            value={newExam?.category_id}
                            label="ประเภทข้อสอบ"
                            onChange={(e) => setNewExam({ ...newExam, category_id: e.target.value })}
                        >
                            {category?.map((val, key) => {
                                return (
                                    <MenuItem value={val.category_id}>
                                        {val.category_name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                </Stack>
            </DialogContent>

            <DialogActions sx={{ display: "flex", justifyContent: "space-between", mx: 2 }}>
                <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={onSubmit}
                >
                    เพิ่ม
                </Button>
            </DialogActions>

        </Dialog >
    )
}

export default AddExam