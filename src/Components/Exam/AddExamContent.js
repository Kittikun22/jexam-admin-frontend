import React, { useState, useEffect } from "react";
import Axios from 'axios'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box, Divider, Tooltip, IconButton } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Checkbox from '@mui/material/Checkbox';

const initialArray = {
    "id": 1,
    "paragraph": "",
    "question": "",
    "question_image_sm": "",
    "question_image_md": "",
    "question_image_lg": "",
    "choice": [{
        "choicevalue": "a",
        "choicetext": "",
        "choice_image_sm": "",
        "choice_image_md": "",
        "choice_image_lg": "",
        "point": 0
    },
    {
        "choicevalue": "b",
        "choicetext": "",
        "choice_image_sm": "",
        "choice_image_md": "",
        "choice_image_lg": "",
        "point": 0
    },
    {
        "choicevalue": "c",
        "choicetext": "",
        "choice_image_sm": "",
        "choice_image_md": "",
        "choice_image_lg": "",
        "point": 0
    },
    {
        "choicevalue": "d",
        "choicetext": "",
        "choice_image_sm": "",
        "choice_image_md": "",
        "choice_image_lg": "",
        "point": 0
    }
    ],
    "point": 1,
    "answer": "",
    "answerDescription": "",
    "answerImage": "",
    "category": ""
}

const initialQuestionImage = {
    "question_image_sm": '',
    "question_image_md": '',
    "question_image_lg": '',
    "answerImage": ''
}

const additionalChoice = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']


function AddExamContent({ openAddExamContent, setOpenAddExamContent, selectExam, setSelectExam }) {

    const [newExamContent, setNewExamContent] = useState([])

    const [newQuestion, setNewQuestion] = useState(initialArray)

    const [file, setFile] = useState({})
    const [quesiontImagePreviewUrl, setQuesiontImagePreviewUrl] = useState(initialQuestionImage)

    const highestPoint = newQuestion.choice.reduce(
        (highest, choice) => Math.max(highest, parseInt(choice.point)),
        0
    );

    useEffect(() => {
        setNewQuestion({ ...newQuestion, point: parseInt(highestPoint) })
    }, [highestPoint])


    const handleClose = () => {
        setOpenAddExamContent(false);
        setNewExamContent([])
        setSelectExam()
        setFile({})
        setQuesiontImagePreviewUrl(initialQuestionImage)
    };

    const addQuestion = (e) => {
        e.preventDefault()
        setNewExamContent(prevItems => [...prevItems, newQuestion]);
        setNewQuestion({
            ...newQuestion, id: parseInt(newQuestion.id + 1),
            "paragraph": "",
            "question": "",
            "question_image_sm": "",
            "question_image_md": "",
            "question_image_lg": "",
            "choice": [{
                "choicevalue": "a",
                "choicetext": "",
                "choice_image_sm": "",
                "choice_image_md": "",
                "choice_image_lg": "",
                "point": 0
            },
            {
                "choicevalue": "b",
                "choicetext": "",
                "choice_image_sm": "",
                "choice_image_md": "",
                "choice_image_lg": "",
                "point": 0
            },
            {
                "choicevalue": "c",
                "choicetext": "",
                "choice_image_sm": "",
                "choice_image_md": "",
                "choice_image_lg": "",
                "point": 0
            },
            {
                "choicevalue": "d",
                "choicetext": "",
                "choice_image_sm": "",
                "choice_image_md": "",
                "choice_image_lg": "",
                "point": 0
            }
            ],
            "point": 1,
            "answer": "",
            "answerDescription": "",
            "answerImage": "",
            "category": ""
        })
        setFile({})
        setQuesiontImagePreviewUrl(initialQuestionImage)
    }

    const handleAddChoice = () => {
        if (newQuestion.choice.length > 11) {
            //
        } else {
            const newChoice = {
                "choicevalue": additionalChoice[newQuestion.choice.length],
                "choicetext": "",
                "choice_image_sm": "",
                "choice_image_md": "",
                "choice_image_lg": "",
                "point": 0
            };
            const addQuestion = { ...newQuestion };
            addQuestion.choice.push(newChoice);
            setNewQuestion(addQuestion);
        }
    };

    const handleChoiceChange = (index, prop) => (event) => {
        const value = event.target.value
        console.log(prop);
        let newChoice;
        if (prop === 'point') {
            newChoice = { ...newQuestion.choice[index], [prop]: parseInt(value) };
        } else {
            newChoice = { ...newQuestion.choice[index], [prop]: value };
        }
        const newChoices = [...newQuestion.choice.slice(0, index),
            newChoice,
        ...newQuestion.choice.slice(index + 1)
        ];
        const updatedQuestion = { ...newQuestion, choice: newChoices };
        setNewQuestion(updatedQuestion);
    };

    const handleImageFile = async (e, key) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(file)
            setQuesiontImagePreviewUrl({ ...quesiontImagePreviewUrl, [key]: reader.result })
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append('file', file)
        await Axios.post('http://localhost:8000/uploadQuestionPic', formData).then((res) => {
            setNewQuestion({ ...newQuestion, [key]: res.data.image_src })
        })
    }

    const handleChoiceImageFile = async (e, index, key) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(file)
            setQuesiontImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append('file', file)

        await Axios.post('http://localhost:8000/uploadQuestionPic', formData).then((res) => {
            const newChoice = { ...newQuestion.choice[index], [key]: res.data.image_src };
            const newChoices = [
                ...newQuestion.choice.slice(0, index),
                newChoice,
                ...newQuestion.choice.slice(index + 1)
            ];
            const updatedQuestion = { ...newQuestion, choice: newChoices };
            setNewQuestion(updatedQuestion);
        })
    }

    const handleOnSubmitAddExamContent = async () => {
        await Axios.post("http://localhost:8333/addExamContent", {
            exam_id: selectExam?.exam_id,
            exam_content: JSON.stringify(newExamContent)
        }).then((res) => {
            if (res.data.message === 'successfully') {
                handleClose()
                setOpenConfirmAddExamContent(false)
            } else {
                console.log("ไม่สำเร็จ");
            }
        })
    }

    const [openConfirmAddExamContent, setOpenConfirmAddExamContent] = useState(false)

    const handleCloseConfirmAddExamContent = () => {
        setOpenConfirmAddExamContent(false)
    }

    console.log("คำถามข้อนี้ => ", newQuestion)
    console.log("รวมคำถามทั้งหมด =>", newExamContent);

    console.log("คะแนนข้อนี้ => ", newQuestion.point);

    return (
        <>
            <Dialog open={openAddExamContent} fullWidth="true" maxWidth="xl" >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" align="center">
                        เพิ่มเนื้อหาข้อสอบ
                    </Typography>
                    <Typography align="center">
                        เพิ่มคำถามไปแล้ว {newExamContent?.length} ข้อ
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ minHeight: '500px' }} dividers >
                    <Box component='form' onSubmit={addQuestion}>

                        <Stack spacing={2} mb={4} p={2} sx={{ border: '#8B1874 solid 5px', borderRadius: 5 }}>
                            <Typography align="center" variant="h6">คำถาม</Typography>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    label="ข้อที่"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 0
                                        }
                                    }}
                                    sx={{ width: '10%' }}
                                    value={newQuestion.id}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, id: parseInt(e.target.value) })}
                                />
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    label="หมวดหมู่ (category)"
                                    value={newQuestion.category}
                                    sx={{ width: '80%' }}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                                />
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    label="คะแนนเต็มข้อนี้"
                                    disabled
                                    sx={{ width: '10%' }}
                                    value={newQuestion?.point}
                                    onChange={() => setNewQuestion({ ...newQuestion, point: parseInt(highestPoint) })}
                                />
                            </Box>

                            <TextField
                                size="small"
                                variant="outlined"
                                label="คำถาม"
                                value={newQuestion.question}
                                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                            />

                            <TextField
                                size="small"
                                variant="outlined"
                                label="บทความ"
                                value={newQuestion.paragraph}
                                onChange={(e) => setNewQuestion({ ...newQuestion, paragraph: e.target.value })}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {quesiontImagePreviewUrl.question_image_sm === null ?
                                        null
                                        :
                                        <Box
                                            component="img"
                                            src={quesiontImagePreviewUrl.question_image_sm}
                                            width="175px"
                                            sx={{ alignSelf: 'center' }}
                                        />
                                    }
                                    <Tooltip title="Break point => xs: 40% md: 35%">
                                        <Button variant="contained" component="label" >
                                            <ImageIcon /> รูปคำถามขนาดเล็ก
                                            <input hidden accept="image/*" type="file" onChange={(e) => handleImageFile(e, "question_image_sm")} />
                                        </Button>
                                    </Tooltip>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {quesiontImagePreviewUrl.question_image_md === null ?
                                        null
                                        :
                                        <Box
                                            component="img"
                                            src={quesiontImagePreviewUrl.question_image_md}
                                            width="175px"
                                            sx={{ alignSelf: 'center' }}
                                        />
                                    }
                                    <Tooltip title="Break point => xs: 70% md: 65%">
                                        <Button variant="contained" component="label" >
                                            <ImageIcon /> รูปคำถามขนาดกลาง
                                            <input hidden accept="image/*" type="file" onChange={(e) => handleImageFile(e, "question_image_md")} />
                                        </Button>
                                    </Tooltip>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {quesiontImagePreviewUrl.question_image_lg === null ?
                                        null
                                        :
                                        <Box
                                            component="img"
                                            src={quesiontImagePreviewUrl.question_image_lg}
                                            width="175px"
                                            sx={{ alignSelf: 'center' }}
                                        />
                                    }
                                    <Tooltip title="Break point => xs: 95% md: 80%">
                                        <Button variant="contained" component="label" >
                                            <ImageIcon /> รูปคำถามขนาดใหญ่
                                            <input hidden accept="image/*" type="file" onChange={(e) => handleImageFile(e, "question_image_lg")} />
                                        </Button>
                                    </Tooltip>
                                </Box>
                            </Box>

                        </Stack>

                        <Stack spacing={2} mb={4} p={2} sx={{ border: '#000 solid 5px', borderRadius: 5 }}>

                            <Typography align="center" variant="h6">ตัวเลือก</Typography>

                            {newQuestion.choice.map((val, key) => {
                                return (
                                    <>
                                        <Typography>{`ตัวเลือก ${val.choicevalue.toUpperCase()}`}</Typography>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <TextField
                                                sx={{ width: '80%' }}
                                                size="small"
                                                variant="outlined"
                                                label="ข้อความ"
                                                value={newQuestion.choice[key].choicetext}
                                                onChange={handleChoiceChange(key, 'choicetext')}
                                            />

                                            <Tooltip title="ข้อนี้ถูก">
                                                <Checkbox color="success" checked={newQuestion.answer === val.choicevalue ? true : false} value={val.choicevalue}
                                                    onClick={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })} />
                                            </Tooltip>

                                            <TextField
                                                sx={{ width: '10%' }}
                                                size="small"
                                                variant="outlined"
                                                label="คะแนน"
                                                type="number"
                                                InputProps={{
                                                    inputProps: {
                                                        min: 0
                                                    }
                                                }}
                                                required
                                                value={newQuestion.choice[key].point}
                                                onChange={handleChoiceChange(key, 'point')}
                                            />
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: 'center', gap: 2 }}>

                                            <Button variant="contained" component="label" >
                                                <ImageIcon /> รูปตัวเลือกขนาดเล็ก
                                                <input hidden accept="image/*" type="file" onChange={(e) => handleChoiceImageFile(e, key, "choice_image_sm")} />
                                            </Button><Button variant="contained" component="label" >
                                                <ImageIcon /> รูปตัวเลือกขนาดกลาง
                                                <input hidden accept="image/*" type="file" onChange={(e) => handleChoiceImageFile(e, key, "choice_image_md")} />
                                            </Button><Button variant="contained" component="label" >
                                                <ImageIcon /> รูปตัวเลือกขนาดใหญ่
                                                <input hidden accept="image/*" type="file" onChange={(e) => handleChoiceImageFile(e, key, "choice_image_lg")} />
                                            </Button>
                                        </Box>
                                        <Divider />
                                    </>
                                )
                            })}

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Tooltip title="เพิ่มตัวเลือก">
                                    <IconButton color='success'
                                        onClick={handleAddChoice}
                                        sx={{
                                            transition: "all 0.25s ease",
                                            "&:hover": {
                                                scale: '1.3'
                                            }
                                        }}>
                                        <AddCircleIcon sx={{ fontSize: 32 }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                        </Stack>

                        <Stack spacing={2} mb={4} p={2} sx={{ border: '#000 solid 5px', borderRadius: 5 }}>

                            <Typography align="center" variant="h6">เฉลย</Typography>

                            <TextField
                                size="small"
                                variant="outlined"
                                label="คำอธิบายเฉลย"
                                value={newQuestion.answerDescription}
                                onChange={(e) => setNewQuestion({ ...newQuestion, answerDescription: e.target.value })}
                            />


                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {quesiontImagePreviewUrl.answerImage === null ?
                                    null
                                    :
                                    <Box
                                        component="img"
                                        src={quesiontImagePreviewUrl.answerImage}
                                        width="175px"
                                        sx={{ alignSelf: 'center' }}
                                    />
                                }
                                <Button variant="contained" component="label" sx={{ width: '20%', alignSelf: 'center' }}>
                                    <ImageIcon /> รูปเฉลย
                                    <input hidden accept="image/*" type="file" onChange={(e) => handleImageFile(e, "answerImage")} />
                                </Button>
                            </Box>


                        </Stack>

                        <Stack>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                            >
                                เพิ่มคำถาม
                            </Button>
                        </Stack>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ display: "flex", justifyContent: "space-between", mx: 2 }}>
                    <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                    <Button
                        variant="contained"
                        color="success"
                        // onClick={handleOnSubmitAddExamContent}
                        onClick={() => setOpenConfirmAddExamContent(true)}
                    >
                        เพิ่มเนื้อหาข้อสอบ
                    </Button>
                </DialogActions>

            </Dialog >

            <Dialog
                open={openConfirmAddExamContent}
                onClose={handleCloseConfirmAddExamContent}
                fullWidth="true" maxWidth="sm"
            >
                <DialogTitle >
                    <Typography align="center" variant="h5">ยืนยันการเพิ่มเนื้อหาข้อสอบ</Typography>
                </DialogTitle>
                <DialogContent align="center">
                    <Typography>
                        คำถามทั้งหมด {newExamContent?.length} ข้อ
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Button variant="contained" sx={{ width: '20%' }} onClick={handleCloseConfirmAddExamContent}>กลับ</Button>
                    <Button variant="contained" sx={{ width: '20%' }} color="success" onClick={handleOnSubmitAddExamContent} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default AddExamContent