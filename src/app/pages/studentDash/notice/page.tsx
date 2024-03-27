import type { NextPage} from "next";
import styles from './Notice.module.scss';
import NoticeCard from "@/app/components/studentNoticeCard/StudentNoticeCard";
import {getStudentNotices} from "@/app/api/studentNotice";
import {useEffect, useState} from "react";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

const Notice: NextPage = () => {
    const [noticeObj, setNoticeObj] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStudentNotices();
                setNoticeObj(response.notices);
            } catch (error: any) {
                AntdNotification.error({message: error});
            }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Notice Page</h1>
            <div className={styles.form}>
                {noticeObj.map((notice, index) => {
                    return <NoticeCard key={index} notice={notice} />
                })}
            </div>
        </div>
    )
}

export default Notice;