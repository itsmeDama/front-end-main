import type { NextPage } from "next";
import styles from './MarkForm.module.scss';
import { Button, Form} from "react-bootstrap";
import { Mark } from "@/app/models/Mark";
import React, {useEffect, useState} from "react";
import { AntdNotification } from "@/app/components/shared/notifications/Notifications";
import {getAllSubject, addMultipleMarks} from "@/app/api/teacherMark";

const MarkForm: NextPage = (props) => {
    const { examId, studentId } = props;
    const initMarkData: Mark = {
        Mathematics: 999,
        Science: 999,
        English: 999,
        Sinhala: 999,
        History: 999,
        Buddhism: 999,
        SubjectI: 999,
        SubjectII: 999,
        SubjectIII: 999
    };
    const [markData, setMarkData] = useState<Mark>(initMarkData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [subject, setSubject] = useState([]);

    const mathsChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, Mathematics: Math.floor(Number(event.target.value))});
    };

    const scienceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, Science: Math.floor(Number(event.target.value))});
    };

    const englishChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, English: Math.floor(Number(event.target.value))});
    };

    const sinhalaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, Sinhala: Math.floor(Number(event.target.value))});
    };

    const historyChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, History: Math.floor(Number(event.target.value))});
    };

    const buddhismChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, Buddhism: Math.floor(Number(event.target.value))});
    };

    const subjectIChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, SubjectI: Math.floor(Number(event.target.value))});
    };

    const subjectIIChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, SubjectII: Math.floor(Number(event.target.value))});
    };

    const subjectIIIChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMarkData({...markData, SubjectIII: Math.floor(Number(event.target.value))});
    };

    const submitBtnHandler =  async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!validateMarkData(markData).includes(true)){
            const subjectsWithMarks = subject.map((s) => {
                const normalizedSubjectName = s.subjectname.replace(/\s+/g, '');
                const markValue =
                    normalizedSubjectName in markData ? markData[normalizedSubjectName] : "N/A";
                return {
                    subjectname: s.subjectname,
                    uuid: s.uuid,
                    markValue: markValue.toString(),
                };
            });

            const markUpdateOObj = {
                studentId,
                examId,
                subjects: subjectsWithMarks
            }

            try {
                const response = await addMultipleMarks(markUpdateOObj);
                if(response) {
                    AntdNotification.success({message: 'Marks added Successfully'});
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const validateMarkData = (data: Mark): boolean[] => {
        setHasValidationErr([]);

        if(data.Mathematics === 999) {
            AntdNotification.error({message: 'Please enter Maths mark'});
            hasValidationErr.push(true);
        } else if ((data.Mathematics > 100 || data.Mathematics < 0) ) {
            AntdNotification.error({message: 'Please enter maths Mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.Science === 999) {
            AntdNotification.error({message: 'Please enter science mark'});
            hasValidationErr.push(true);
        } else if ((data.Science > 100 || data.Science < 0) ) {
            AntdNotification.error({message: 'Please enter science mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.English === 999) {
            AntdNotification.error({message: 'Please enter english mark'});
            hasValidationErr.push(true);
        } else if ((data.English > 100 || data.English < 0) ) {
            AntdNotification.error({message: 'Please enter english mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.Sinhala === 999) {
            AntdNotification.error({message: 'Please enter sinhala mark'});
            hasValidationErr.push(true);
        } else if ((data.Sinhala > 100 || data.Sinhala < 0) ) {
            AntdNotification.error({message: 'Please enter sinhala mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.History === 999) {
            AntdNotification.error({message: 'Please enter history mark'});
            hasValidationErr.push(true);
        } else if ((data.History > 100 || data.History < 0) ) {
            AntdNotification.error({message: 'Please enter history mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.Buddhism === 999) {
            AntdNotification.error({message: 'Please enter buddhism mark'});
            hasValidationErr.push(true);
        } else if ((data.Buddhism > 100 || data.Buddhism < 0) ) {
            AntdNotification.error({message: 'Please enter buddhism mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.SubjectI === 999) {
            AntdNotification.error({message: 'Please enter Subject I mark'});
            hasValidationErr.push(true);
        } else if ((data.SubjectI > 100 || data.SubjectI < 0) ) {
            AntdNotification.error({message: 'Please enter Subject I mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.SubjectI === 999) {
            AntdNotification.error({message: 'Please enter Subject II mark'});
            hasValidationErr.push(true);
        } else if ((data.SubjectII > 100 || data.SubjectII < 0) ) {
            AntdNotification.error({message: 'Please enter Subject II mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        if(data.SubjectIII === 999) {
            AntdNotification.error({message: 'Please enter Subject III mark'});
            hasValidationErr.push(true);
        } else if ((data.SubjectIII > 100 || data.SubjectIII < 0) ) {
            AntdNotification.error({message: 'Please enter Subject III mark in ( 0 - 100 )'});
            hasValidationErr.push(true);
        }

        return hasValidationErr;
    }


    const getSubjectHandler = async () => {
        try {
            const response = await getAllSubject(examId);
            setSubject(response.subjects);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <div className={styles.innerGroup}>
                    <div className={styles.markSection}>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>Mathematics : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => mathsChange(e)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>Science : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => scienceChange(e)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>English : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => englishChange(e)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>Sinhala : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => sinhalaChange(e)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>History : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => historyChange(e)}></Form.Control>
                        </Form.Group>
                    </div>
                    <div className={styles.markSection}>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>Buddhism : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => buddhismChange(e)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>Subject I : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => subjectIChange(e)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>Subject II : </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => subjectIIChange(e)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.group}>
                            <Form.Label className={styles.label}>Subject III: </Form.Label>
                            <Form.Control className={styles.input} type='number' onChange={(e) => subjectIIIChange(e)}></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className={styles.btnBox}>
                    <Button onClick={getSubjectHandler}>Refresh</Button>
                    <Button className={styles.btn} onClick={submitBtnHandler}>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default MarkForm;