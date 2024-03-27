import type { NextPage} from "next";
import styles from './Question.module.scss';
import QuestionCard from "@/app/components/studntQuestionCard/StudentQuestionCard";
import {getStudentQuestion} from "@/app/api/studentQuestion";
import {useEffect, useState} from "react";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

const Question: NextPage = () => {
    const [questionObj, setQuestionObj] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStudentQuestion();
                setQuestionObj(response.questions)
            } catch (error: any) {
                AntdNotification.error({message: error});
            }
        }
        fetchData();
    }, [])
    return (
        <div className={styles.container}>
            <h1>Question Page</h1>
            <div className={styles.form}>
                {questionObj.map((question, index) => {
                    return <QuestionCard key={index} question={question} />
                })}
            </div>
        </div>
    )
}

export default Question;