import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import Axios from 'axios'
import ApproveTable from './ApproveTable';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Approve() {

  const [allSlip, setAllSlip] = useState()
  const [filterSlip, setFilterSlip] = useState("pending-Slip");

  const approvedSlips = allSlip?.filter((item) => item.status === "อนุมัติแล้ว");
  const rejectedSlips = allSlip?.filter((item) => item.status === "ไม่อนุมัติ");
  const pendingSlips = allSlip?.filter((item) => item.status === "รออนุมัติ");


  useEffect(() => {
    Axios.get('http://localhost:8333/getAllSlip').then((res) => {
      setAllSlip(res.data)
    })
  }, [])

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 2 }}>
        <Box>
          <Typography>มีหลักฐานการโอนทั้งหมด {allSlip?.length} รายการ</Typography>
          <Typography>อนุมัติแล้ว {approvedSlips?.length} รายการ</Typography>
          <Typography>ไม่อนุมัติ {rejectedSlips?.length} รายการ</Typography>
          <Typography>รออนุมัติ {pendingSlips?.length} รายการ</Typography>

        </Box>

        <ButtonGroup variant="outlined" size='large' >
          <Button
            sx={{
              background: filterSlip === 'all-Slip' ? '#1976d2' : null,
              color: filterSlip === 'all-Slip' ? '#fff' : '',
            }}
            onClick={() => setFilterSlip("all-Slip")}
          >
            ทั้งหมด({allSlip?.length})
          </Button>
          <Button
            sx={{
              background: filterSlip === 'pending-Slip' ? '#1976d2' : null,
              color: filterSlip === 'pending-Slip' ? '#fff' : '',
            }}
            onClick={() => setFilterSlip("pending-Slip")}>รออนุมัติ({pendingSlips?.length})</Button>
          <Button
            sx={{
              background: filterSlip === 'approved-Slip' ? '#1976d2' : null,
              color: filterSlip === 'approved-Slip' ? '#fff' : '',
            }}
            onClick={() => setFilterSlip("approved-Slip")}>อนุมัติแล้ว({approvedSlips?.length})</Button>
          <Button
            sx={{
              background: filterSlip === 'rejected-Slip' ? '#1976d2' : null,
              color: filterSlip === 'rejected-Slip' ? '#fff' : '',
            }}
            onClick={() => setFilterSlip("rejected-Slip")}>ไม่อนุมัติ({rejectedSlips?.length})</Button>
        </ButtonGroup>

      </Box>

      <ApproveTable
        allSlip={allSlip}
        setAllSlip={setAllSlip}
        filterSlip={filterSlip}
        approvedSlips={approvedSlips}
        rejectedSlips={rejectedSlips}
        pendingSlips={pendingSlips}
      />
    </Stack>
  )
}

export default Approve