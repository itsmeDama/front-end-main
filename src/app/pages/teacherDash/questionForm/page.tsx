import type {NextPage} from "next";
import styles from './QuestionForm.module.scss';
import QuestionCard from "@/app/components/questionCard/QuestionCard";
import TeacherQuestionForm from "@/app/components/questionForm/QuestionForm";
import {getmyclassrooms} from "@/app/api/teacherMark";
import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {getAllQuestion} from "@/app/api/teacherQuestion";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

const QuestionForm: NextPage = () => {

    const [classRooms, setClassRooms] = useState([]);
    const [selectedClassRoom, setSelectedClassRoom] = useState({
        className: '',
        uuid: ''
    });
    const [questionObj, setQuestionObj] = useState([]);

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

    const updateQuestion = async () => {
        try {
            const response = await getAllQuestion(selectedClassRoom.uuid);
           setQuestionObj(response.question)
        } catch (error: any) {
            AntdNotification.error({message: error});
        }
    }

    useEffect(() => {
        if (selectedClassRoom.uuid !== '') {
            const fetchData = async () => {
                try {
                    const response = await getAllQuestion(selectedClassRoom.uuid);
                    setQuestionObj(response.question)
                } catch (error: any) {
                    AntdNotification.error({message: error});
                }
            }
            fetchData();
        }
    }, [selectedClassRoom.uuid]);

    const handleClassRoomSelect = (classRoom) => {
        setSelectedClassRoom(classRoom);
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.questionSection}>
                    {questionObj.map((question, index) => {
                       return <QuestionCard key={index} onUpdateQuestion={updateQuestion} question={question} />
                    })}
                </div>
                <div className={styles.formSection}>
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
                    <TeacherQuestionForm
                        classId={selectedClassRoom.uuid}
                        onUpdateQuestion={updateQuestion}
                    />
                </div>
            </div>
        </div>
    )
}

export default QuestionForm;