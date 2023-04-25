import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import Axios from 'axios'
import ExamTable from './ExamTable';


function Exam() {

    const [allExam, setAllExam] = useState()

    useEffect(() => {
        Axios.get('http://localhost:8333/getAllExam').then((res) => {
            setAllExam(res.data)
        })
    }, [])

    return (
        <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography>ข้อสอบทั้งหมด {allExam?.length} รายการ</Typography>
                </Box>
            </Box>

            <ExamTable allExam={allExam} />
        </Stack>
    )
}

export default Exam