import type { NextPage } from "next";
import styles from './NoticeForm.module.scss';
import { Button, Form} from "react-bootstrap";
import { Notice } from "@/app/models/Notice";
import React, {useState} from "react";
import { AntdNotification } from "@/app/components/shared/notifications/Notifications";
import {createNotice} from "@/app/api/teacherNotice";

const NoticeForm: NextPage = ({onUpdateNoticePanel}) => {
    const initNoticeData: Notice = {
        header: '',
        content: ''
    };
    const [noticeData, setNoticeData] = useState<Notice>(initNoticeData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);

    const headerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNoticeData({...noticeData, header: event.target.value});
    };

    const contentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNoticeData({...noticeData, content: event.target.value});
    };

    const validateNoticeData = (data: Notice): boolean[] => {
        setHasValidationErr([]);

        if(data.header == ''){
            AntdNotification.error({message: 'Please enter notice header'});
            hasValidationErr.push(true);
        }

        if(data.content == ''){
            AntdNotification.error({message: 'Please enter notice content'});
            hasValidationErr.push(true);
        }

        return hasValidationErr;
    }

    const submitBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        if (!validateNoticeData(noticeData).includes(true)){
            try {
                const response = await createNotice(noticeData.header, noticeData.content);
                if (response) {
                    AntdNotification.success({message: 'Notice added Successfully'});
                }
            } catch(error: any) {
                console.error('Error fetching data:', error);
            }
        }
        onUpdateNoticePanel();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Enter Notice</h1>
            <Form className={styles.form}>
                <Form.Group className={styles.group}>
                    <Form.Label className={styles.label}>Notice Header : </Form.Label>
                    <Form.Control className={styles.input} type='text' onChange={(e) => headerChange(e)}></Form.Control>
                </Form.Group>
                <Form.Group className={styles.group}>
                    <Form.Label className={styles.label}>Notice Content : </Form.Label>
                    <Form.Control as={'textarea'} className={styles.input} onChange={(e) => contentChange(e)}></Form.Control>
                </Form.Group>
                <div className={styles.btnBox}>
                    <Button className={styles.btn} onClick={submitBtnHandler}>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default NoticeForm;