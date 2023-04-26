import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import Axios from 'axios'
import ExamTable from './ExamTable';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import AddExam from './AddExam';

function Exam() {

    const [openAddExam, setOpenAddExam] = useState(false)

    const [allExam, setAllExam] = useState()
    const [filterExam, setFilterExam] = useState("all-exam")

    const ALEVELExams = allExam?.filter((item) => item.category_name === "A-LEVEL");
    const TGATExams = allExam?.filter((item) => item.category_name === "TGAT");
    const TPATExams = allExam?.filter((item) => item.category_name === "TPAT");
    const NETSATExams = allExam?.filter((item) => item.category_name === "NETSAT");

    useEffect(() => {
        Axios.get('http://localhost:8333/getAllExam').then((res) => {
            setAllExam(res.data)
        })
    }, [])

    return (

        <>
            <AddExam openAddExam={openAddExam} setOpenAddExam={setOpenAddExam} />

            <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography>ข้อสอบทั้งหมด {allExam?.length} รายการ</Typography>
                        <Typography>ข้อสอบ NETSAT {NETSATExams?.length} รายการ</Typography>
                        <Typography>ข้อสอบ TGAT {TGATExams?.length} รายการ</Typography>
                        <Typography>ข้อสอบ TPAT {TPATExams?.length} รายการ</Typography>
                        <Typography>ข้อสอบ A-LEVEL {ALEVELExams?.length} รายการ</Typography>
                    </Box>

                    <ButtonGroup variant="outlined" size='large' >
                        <Button
                            sx={{
                                background: filterExam === 'all-exam' ? '#1976d2' : null,
                                color: filterExam === 'all-exam' ? '#fff' : '',
                            }}
                            onClick={() => setFilterExam("all-exam")}
                        >
                            ทั้งหมด({allExam?.length})
                        </Button>
                        <Button
                            sx={{
                                background: filterExam === 'netsat-exam' ? '#1976d2' : null,
                                color: filterExam === 'netsat-exam' ? '#fff' : '',
                            }}
                            onClick={() => setFilterExam("netsat-exam")}>NETSAT({NETSATExams?.length})</Button>
                        <Button
                            sx={{
                                background: filterExam === 'tgat-exam' ? '#1976d2' : null,
                                color: filterExam === 'tgat-exam' ? '#fff' : '',
                            }}
                            onClick={() => setFilterExam("tgat-exam")}>TGAT({TGATExams?.length})</Button>
                        <Button
                            sx={{
                                background: filterExam === 'tpat-exam' ? '#1976d2' : null,
                                color: filterExam === 'tpat-exam' ? '#fff' : '',
                            }}
                            onClick={() => setFilterExam("tpat-exam")}>TPAT({TPATExams?.length})</Button>
                        <Button
                            sx={{
                                background: filterExam === 'alevel-exam' ? '#1976d2' : null,
                                color: filterExam === 'alevel-exam' ? '#fff' : '',
                            }}
                            onClick={() => setFilterExam("alevel-exam")}>A-LEVEL({ALEVELExams?.length})</Button>
                    </ButtonGroup>

                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddExam(true)}
                    >
                        เพิ่มข้อสอบ
                    </Button>

                </Box>



                <ExamTable
                    allExam={allExam}
                    ALEVELExams={ALEVELExams}
                    TGATExams={TGATExams}
                    TPATExams={TPATExams}
                    NETSATExams={NETSATExams}
                    filterExam={filterExam}
                />
            </Stack>
        </>
    )
}

export default Exam