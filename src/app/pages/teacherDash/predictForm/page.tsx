'use client';
import type { NextPage} from "next";
import styles from './PredictForm.module.scss';
import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Mark} from "@/app/models/Mark";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const PredictForm: NextPage = () => {
    const initMarkData: Mark = {
        gender: '',
        Mathematics: 999,
        Science: 999,
        English: 999,
        Sinhala: 999,
        History: 999,
        Buddhism: 999,
    };
    const [markData, setMarkData] = useState<Mark>(initMarkData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [selectGender, setSelectGender] = useState<string>('');
    let Gender_F, Gender_M, Religion_A, Religion_B, Religion_C, Religion_S, Sinhala_A, Sinhala_B, Sinhala_C, Sinhala_S, English_A, English_B, English_C, English_S, Science_A, Science_B, Science_C, Science_S, Mathematics_A, Mathematics_B, Mathematics_C, Mathematics_S, History_A, History_B, History_C, History_S;
    let modelData;
    let religion, sinhala, english, science, maths, history;
    const [modelResponse, setModelResponse] = useState<number>(10);
    const [subject, setSubject] = useState<string>('Finding.....');

    const genderChange = (event: any) => {
        setSelectGender(event.target.value);
        setMarkData({...markData, gender: event.target.value});
    }

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

    const markToString = (mark) => {
        if(mark <= 85) {
            return [1, 0, 0, 0];
        } else if (mark >= 75 && mark <= 84 ) {
            return [0, 1, 0, 0]
        } else if (mark >= 45 && mark <= 84) {
            return [0, 0, 1, 0];
        } else {
            return [0, 0, 0, 1];
        }
    }

    const dataProcess = () => {

        if (markData.gender == '0') {
            Gender_F = 0;
            Gender_M = 1;
        } else {
            Gender_F = 1;
            Gender_M = 0;
        }

        religion = markToString(markData.Buddhism);
        Religion_A = religion[0];
        Religion_B = religion[1];
        Religion_C = religion[2];
        Religion_S = religion[3];
        sinhala = markToString(markData.Sinhala);
        Sinhala_A = sinhala[0];
        Sinhala_B = sinhala[1];
        Sinhala_C = sinhala[2];
        Sinhala_S = sinhala[3];
        english = markToString(markData.English);
        English_A = english[0];
        English_B = english[1];
        English_C = english[2];
        English_S = english[3];
        science = markToString(markData.Science);
        Science_A = science[0];
        Science_B = science[1];
        Science_C = science[2];
        Science_S = science[3];
        maths = markToString(markData.Mathematics);
        Mathematics_A = maths[0];
        Mathematics_B = maths[1];
        Mathematics_C = maths[2];
        Mathematics_S = maths[3];
        history = markToString(markData.History);
        History_A = history[0];
        History_B = history[1];
        History_C = history[2];
        History_S = history[3];

        modelData =[
                [Gender_F, Gender_M, Religion_A, Religion_B, Religion_C, Religion_S, Sinhala_A, Sinhala_B, Sinhala_C, Sinhala_C, English_A, English_B, English_C, English_S, Science_A, Science_B, Science_C, Science_S, Mathematics_A, Mathematics_B, Mathematics_C, Mathematics_S, History_A, History_B, History_C, History_S]
        ]
    }

    useEffect(() => {
        if (modelResponse === 0) {
            setSubject('Art');
        } else if (modelResponse === 1) {
            setSubject('Bio');
        } else if (modelResponse === 2) {
            setSubject("commerce");
        } else if (modelResponse === 3) {
            setSubject('Tech');
        } else if (modelResponse === 4) {
            setSubject("Maths");
        } else {
            setSubject('Loading...');
        }
    }, [modelResponse])

    const submitBtnHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (!validateMarkData(markData).includes(true)){
            //AntdNotification.success({message: 'Marks added Successfully'});
            dataProcess();
            const apiUrl = 'http://localhost:8000/predict';
            axios.post(apiUrl, { data: modelData })
                .then(response => {
                    console.log('Predictions:', response.data.predictions);
                    setModelResponse(response.data.predictions[0]);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    console.log('Result: ', modelResponse);

    const validateMarkData = (data: Mark): boolean[] => {
        setHasValidationErr([]);

        if (data.gender == '') {
            AntdNotification.error({message: 'Please Select Gender'});
            hasValidationErr.push(true);
        }

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

        return hasValidationErr;
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputForm}>
                <Form className={styles.form}>
                    <div className={styles.innerGroup}>
                        <div className={styles.markSection}>
                            <Form.Group className={styles.group}>
                                <Form.Label className={styles.label}>Gender</Form.Label>
                                <div className={styles.innerGroup}>
                                    <Form.Check
                                        type='radio'
                                        name='gender'
                                        value={'0'}
                                        checked={selectGender === '0'}
                                        onChange={genderChange}
                                    />
                                    <Form.Label >Male</Form.Label>
                                </div>
                                <div className={styles.innerGroup}>
                                    <Form.Check
                                        type='radio'
                                        name='gender'
                                        value={'1'}
                                        checked={selectGender === '1'}
                                        onChange={genderChange}
                                    />
                                    <Form.Label>Female</Form.Label>
                                </div>
                            </Form.Group>
                            <Form.Group className={styles.group}>
                                <Form.Label className={styles.label}>Mathematics : </Form.Label>
                                <Form.Control className={styles.input} type='number' onChange={(e) => mathsChange(e)}></Form.Control>
                            </Form.Group>
                            <Form.Group className={styles.group}>
                                <Form.Label className={styles.label}>Science : </Form.Label>
                                <Form.Control className={styles.input} type='number' onChange={(e) => scienceChange(e)}></Form.Control>
                            </Form.Group>
                        </div>
                        <div className={styles.markSection}>
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
                            <Form.Group className={styles.group}>
                                <Form.Label className={styles.label}>Buddhism : </Form.Label>
                                <Form.Control className={styles.input} type='number' onChange={(e) => buddhismChange(e)}></Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                    <div className={styles.btnBox}>
                        <Button className={styles.btn} onClick={submitBtnHandler}>Submit</Button>
                    </div>
                </Form>
            </div>
            <div className={styles.predictCard}>
                <h2 className={styles.heading}>Prediction of student subject stream</h2>
                <div className={styles.result}>
                    <FontAwesomeIcon icon={faGraduationCap} className={styles.icon} />
                    <h3>{subject} Stream</h3>
                </div>
            </div>
        </div>
    )
}

export default PredictForm;