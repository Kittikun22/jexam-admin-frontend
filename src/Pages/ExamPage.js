import React from 'react'
import MainDrawer from '../Components/MainDrawer'
import Exam from '../Components/Exam/Exam'

function ExamPage() {
  return (
    <MainDrawer ContentComponent={Exam} topicName='ข้อสอบ' />

  )
}

export default ExamPage