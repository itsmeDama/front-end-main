import type { NextPage } from "next";
import styles from './QuestionForm.module.scss';
import { Question } from "@/app/models/Question";
import { AntdNotification } from "@/app/components/shared/notifications/Notifications";
import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {createQuestion} from "@/app/api/teacherQuestion";

interface QuestionProps {
    classId: string,
    onUpdateQuestion: () => void;
}

const QuestionForm: React.FC<QuestionProps> = (props) => {
    const { classId, onUpdateQuestion} = props;
    const initQuestionData: Question = {
        studentID: 0,
        question: ''
    }
    const [questionData, setQuestionData] = useState<Question>(initQuestionData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);


    const questionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setQuestionData({...questionData, question: event.target.value});
    };

    const submitBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        if (!validateQuestionData(questionData).includes(true)){
            try {
                const response = await createQuestion(questionData.question ,classId);
                if (response) {
                    AntdNotification.success({message: 'Question create Successfully'});
                }
            } catch (error: any) {
                console.error('Error fetching data:', error);
            }
            onUpdateQuestion();
        }
    };

    const validateQuestionData = (data: Question): boolean[] => {
        setHasValidationErr([]);

        if (classId === '') {
            AntdNotification.error({message: 'Please Select Class'});
            hasValidationErr.push(true);
        }

        if (data.question == '') {
            AntdNotification.error({message: 'Please enter the question'});
            hasValidationErr.push(true);
        }

        return hasValidationErr;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Enter Question</h1>
            <Form className={styles.form}>
                <Form.Group className={styles.group}>
                    <Form.Label className={styles.label}>Enter Question : </Form.Label>
                    <Form.Control as={'textarea'} className={styles.input} onChange={(e) => questionChange(e)}></Form.Control>
                </Form.Group>
                <div className={styles.btnBox}>
                    <Button className={styles.btn} variant={'success'} onClick={submitBtnHandler}>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default QuestionForm;