import styles from './NoticeCard.module.scss';
import { Button, Form} from "react-bootstrap";
import {updateNoticeHeader, updateNoticeContent, deleteNotice} from "@/app/api/teacherNotice";
import React, {useEffect, useState} from "react";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

interface NoticeCardProps {
    notice: {
        noticeHeader: string;
        noticeContent: string;
    };

    onUpdateNoticeObj: () => void;

}

const NoticeCard: React.FC<NoticeCardProps> = (props) => {
    const { notice, onUpdateNoticeObj } = props;
    const [header, setHeader] = useState<string>('');
    const [content, setContent] = useState<string>('');


    const headerUpdateHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
           const response = await updateNoticeHeader(notice.uuid, header);
            if (response) {
                AntdNotification.success({message: 'Update Notice Header Successfully'});
            }
        } catch (error) {
            AntdNotification.error({message: error});
        }
        onUpdateNoticeObj();
    }

    const contentUpdateHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await updateNoticeContent(notice.uuid, content);
            if(response) {
                AntdNotification.success({message: 'Update Notice Content Successfully'});
            }
        } catch (error) {
            AntdNotification.error({message: error});
        }
        onUpdateNoticeObj();
    }

    const noticeDeleteHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await deleteNotice(notice.uuid);
            if(response) {
                AntdNotification.success({message: 'Delete Notice Successfully'});
            }
        } catch (error) {
            AntdNotification.error({message: error});
        }
        onUpdateNoticeObj();
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h4>{notice.noticeHeader}</h4>
                <Button variant="danger" onClick={noticeDeleteHandler}>Close</Button>
            </div>
            <Form.Group>
                <Form.Control
                    type='text'
                    onChange={(e) => setHeader(e.target.value)}
                />
                <Button variant="success" className={styles.btn} onClick={headerUpdateHandler}>Update Notice Header</Button>
            </Form.Group>
            <p className={styles.para}>
                {notice.noticeContent}
            </p>
            <Form.Group>
                <Form.Control as='textarea'
                onChange={(e) => setContent(e.target.value)}
                />
                <Button variant="success" className={styles.btn} onClick={contentUpdateHandler}>Update Notice Content</Button>
            </Form.Group>
        </div>
    )
}

export default NoticeCard;