import React from "react";
import styles from './StudentAnswerCard.module.scss';
interface AnswerProps {
    answers: {
        answerContent: string;
        student: string
    }
}

const StudentAnswerCard: React.FC<AnswerProps> = (props) => {
    const { answers } = props;
    console.log('Answers: ', answers)
    return (
        <div className={styles.container}>
            <p>Name: {answers.student.firstname}</p>
            <p>Answer: {answers.answerContent}</p>
        </div>
    )
}

export default StudentAnswerCard;