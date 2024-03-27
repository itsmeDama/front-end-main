import styles from './QuestionCard.module.scss';
import { Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {deleteQuestion} from "@/app/api/teacherQuestion";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";
import StudentAnswerCard from "@/app/components/studentAnswer/StudentAnswerCard";
interface QuestionCardProps {
    question: {
        questionContent: string,
        answers: object,
        uuid: string
    }

    onUpdateQuestion: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
    const {question, onUpdateQuestion} = props;

    const questionDeleteHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await deleteQuestion(question.uuid);
            if (response) {
                AntdNotification.success({message: 'Delete Notice Successfully'});
            }
        }catch (error) {
            AntdNotification.error({message: error});
        }
        onUpdateQuestion();
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Button variant="danger" onClick={questionDeleteHandler}>Close</Button>
            </div>
            <h2>{question.questionContent}</h2>
            <p className={styles.para}>
                {question.answers.map((answers, index) => {
                    return <StudentAnswerCard key={index} answers={answers} />
                })}
            </p>
        </div>
    )
}

export default QuestionCard;
