'use client';
import type { NextPage} from "next";
import styles from './StudentDash.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import { Button } from "react-bootstrap";
import { If } from '../../components/shared/utils/If';
import Mark from "@/app/pages/studentDash/marks/page";
import Notice from "@/app/pages/studentDash/notice/page";
import Question from "@/app/pages/studentDash/question/page";

const StudentDash: NextPage = () => {
    const [activeTab, setActiveTab] = useState<string>('mark');
    const [activeMark, setActiveMark] = useState<boolean>(true);
    const [activeNotice, setActiveNotice] = useState<boolean>(false);
    const [activeQuestion, setActiveQuestion] = useState<boolean>(false);

    const markHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveTab('mark');
        setActiveMark(true);
        setActiveNotice(false);
        setActiveQuestion(false);
    };

    const noticeHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveTab('notice');
        setActiveNotice(true);
        setActiveMark(false);
        setActiveQuestion(false);
    };

    const questionHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveTab('question');
        setActiveQuestion(true);
        setActiveMark(false);
        setActiveNotice(false);
    };


    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <FontAwesomeIcon icon={faUserPen} className={styles.icon}/>
                <h1>
                    Student Dash Board
                </h1>
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
                </div>
                <div className={styles.contentSection}>
                    <If condition={activeTab === 'mark'}>
                        <Mark />
                    </If>
                    <If condition={activeTab === 'notice'}>
                        <Notice />
                    </If>
                    <If condition={activeTab === 'question'}>
                        <Question />
                    </If>
                </div>
            </div>
        </div>
    )
}

export default StudentDash;