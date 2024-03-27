import styles from './NoticeForm.module.scss';
import NoticeCard from "@/app/components/noticeCard/NoticeCard";
import TeacherNoticeForm from "@/app/components/noticeForm/NotiiceForm";
import {getNotices} from "@/app/api/teacherNotice";
import {useEffect, useState} from "react";
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

const NoticeForm: React.FC = () => {
    const [noticeObj, setNoticeObj] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNotices();
                setNoticeObj(response.notices);
            } catch (error: any) {
                AntdNotification.error({message: error});
            }
        }
        fetchData();
    }, []);

    const updateNoticePanel = async () => {
        try {
            const response = await getNotices();
            setNoticeObj(response.notices);
        } catch (error: any) {
            AntdNotification.error({message: error});
        }
    }

    const updateNoticeObj = async () => {
        try {
            const response = await getNotices();
            setNoticeObj(response.notices);
        } catch (error: any) {
            AntdNotification.error({message: error});
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.noticeSection}>
                    {noticeObj.map((notice, index) => {
                        return <NoticeCard key={index} onUpdateNoticeObj={updateNoticeObj} notice={notice} />
                    })}
                </div>
                <div className={styles.formSection}>
                   <TeacherNoticeForm onUpdateNoticePanel={updateNoticePanel} />
                </div>
            </div>
        </div>
    )
}

export default NoticeForm;