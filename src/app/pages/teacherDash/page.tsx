'use client';
import type { NextPage} from "next";
import styles from './TeacherDash.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChalkboardTeacher, faChartPie, faCircleQuestion, faEnvelope, faAtom} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import { Button } from "react-bootstrap";
import MarkForm from "@/app/pages/teacherDash/markForm/page";
import NoticeForm from "@/app/pages/teacherDash/noticeForm/page";
import PredictForm from "@/app/pages/teacherDash/predictForm/page";
import QuestionForm from "@/app/pages/teacherDash/questionForm/page";
import {If} from "@/app/components/shared/utils/If";

const TeacherDash: NextPage = () => {
    const [activeTab, setActiveTab] = useState<string>('mark');
    const [activeMark, setActiveMark] = useState<boolean>(true);
    const [activeNotice, setActiveNotice] = useState<boolean>(false);
    const [activeQuestion, setActiveQuestion] = useState<boolean>(false);
    const [activePredict, setActivePredict] = useState<boolean>(false)

    const string = 'this is teacher dash';

    const markHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveTab('mark');
        setActiveMark(true);
        setActiveNotice(false);
        setActiveQuestion(false);
        setActivePredict(false);
    };

    const noticeHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveTab('notice');
        setActiveNotice(true);
        setActiveMark(false);
        setActiveQuestion(false);
        setActivePredict(false);
    };

    const questionHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveTab('question');
        setActiveQuestion(true);
        setActiveMark(false);
        setActiveNotice(false);
        setActivePredict(false);
    };

    const predictHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveTab('predict');
        setActivePredict(true);
        setActiveQuestion(false);
        setActiveMark(false);
        setActiveNotice(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <FontAwesomeIcon icon={faChalkboardTeacher} className={styles.icon} />
                <h1>Teacher Dash Board</h1>
            </div>
            <div className={styles.dashBox}>
                <div className={styles.btnSection}>
                    <Button className={activeMark? styles.selectBtn : styles.btn} onClick={markHandler}>
                        <FontAwesomeIcon icon={faChartPie} className={styles.tabIcon}/>
                        Marks
                    </Button>
                    <Button className={activeNotice? styles.selectBtn : styles.btn} onClick={noticeHandler}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.tabIcon}/>
                        Notice
                    </Button>
                    <Button className={activeQuestion? styles.selectBtn : styles.btn} onClick={questionHandler}>
                        <FontAwesomeIcon icon={faCircleQuestion} className={styles.tabIcon}/>
                        Q/A
                    </Button>
                    <Button className={activePredict? styles.selectBtn : styles.btn} onClick={predictHandler}>
                        <FontAwesomeIcon icon={faAtom} className={styles.tabIcon}/>
                        Predict
                    </Button>
                </div>
                <div className={styles.contentSection}>
                    <If condition={activeTab === 'mark'}>
                        <MarkForm />
                    </If>
                    <If condition={activeTab === 'notice'}>
                        <NoticeForm />
                    </If>
                    <If condition={activeTab === 'question'}>
                        <QuestionForm />
                    </If>
                    <If condition={activeTab === 'predict'}>
                        <PredictForm />
                    </If>
                </div>
            </div>
        </div>
    )
}

export default TeacherDash;