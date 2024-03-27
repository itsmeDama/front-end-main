import styles from './QuestionCard.module.scss';
import { Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";
import {answerQuestion} from "@/app/api/studentQuestion";

interface QuestionProps {
    question: {
        uuid: string,
        questionContent: string
    }
}

const QuestionCard: React.FC<QuestionProps> = (props) => {
    const { question } = props;
    const [answer, setAnswer] = useState<string>('');
    const [submit, setSubmit] = useState<boolean>(false);

    const answerHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const response = await answerQuestion(answer, question.uuid);
            if (response) {
                AntdNotification.success({message: 'Answer recorded!'});
            }
        } catch (error: any) {
            AntdNotification.error({message: error});
        }
        setSubmit(true);
    }
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h4>{question.questionContent}</h4>
            </div>
            <Form.Group className={submit ? styles.hide : styles.block}>
                <p>Replay</p>
                <Form.Control onChange={(e) => setAnswer(e.target.value)} as='textarea' />
                <Button className={styles.btn} onClick={answerHandler}>Submit</Button>
            </Form.Group>
            <div className={submit ? styles.block : styles.hide}>
                <h2>Your answer is submitted</h2>
            </div>
        </div>
    )
}

export default QuestionCard;