import type { NextPage} from "next";
import styles from './MarkForm.module.scss';
import StudentCard from "@/app/components/studentCard/StudentCard";
import TeacherMarkForm from "@/app/components/teacherMarkForm/markForm";
import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {getmyclassrooms} from "@/app/api/teacherMark";
import {getAllExams} from "@/app/api/teacherMark";
import {getStudent} from "@/app/api/teacherMark";
import { Button } from "react-bootstrap";

const MarkForm: NextPage = () => {
    const [classRooms, setClassRooms] = useState([]);
    const [selectedClassRoom, setSelectedClassRoom] = useState({
        className: '',
        uuid: ''
    });
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState({
        examName: '',
        uuid: ''
    });
    const [studentObj, setStudentObj] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({
       studentName: '',
       uuid: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getmyclassrooms();
                setClassRooms(response.classRooms);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleClassRoomSelect = (classRoom) => {
        setSelectedClassRoom(classRoom);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllExams();
                setExams(response.exams);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleExamSelect = (exam) => {
        setSelectedExam(exam);
    };

    const getStudentMarks = async () => {
            try {
                const response = await getStudent(selectedClassRoom.uuid, selectedExam.uuid);
                setStudentObj(response.students);
            } catch (error: any) {
                console.error('Error fetching data:', error);
            }
    }

    const handleStudentSelect = (student) => {
        setSelectedStudent({
            studentName :  student.firstname,
            uuid: student.uuid
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.studentSection}>
                    {studentObj.map((student, index)=> {
                        return <StudentCard key={index} student={student}/>
                    })}

                </div>
                <div className={styles.formSection}>
                    <div className={styles.innerGroup}>
                        <DropdownButton id="dropdown-basic-button" title={selectedClassRoom.className ? selectedClassRoom.className : 'Select Class'}>
                            {classRooms.map((classRoom) => (
                                <Dropdown.Item
                                    key={classRoom.uuid}
                                    onClick={() => handleClassRoomSelect(classRoom)}
                                >
                                    {classRoom.className}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <DropdownButton id="dropdown-basic-button" title={selectedExam.examname ? selectedExam.examname : 'Select Exam'}>
                            {exams.map((exams) => (
                                <Dropdown.Item
                                    key={exams.uuid}
                                    onClick={() => handleExamSelect(exams)}
                                >
                                    {exams.examname}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <Button onClick={() => getStudentMarks()}>Load</Button>
                    </div>
                    <div className={styles.studentDrop}>
                        <DropdownButton id="dropdown-basic-button" title={selectedStudent.studentName ? selectedStudent.studentName : 'Select Student'}>
                            {studentObj.map((student) => (
                                <Dropdown.Item
                                    key={student.uuid}
                                    onClick={() => handleStudentSelect(student)}
                                >
                                    {student.firstname}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <TeacherMarkForm
                        examId={selectedExam.uuid}
                        studentId={selectedStudent.uuid}
                    />
                </div>
            </div>
        </div>
    )
}

export default MarkForm;