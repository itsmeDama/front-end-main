import styles from './NoticeCard.module.scss';
import React from "react";

interface NoticeCardProps {
    notice: {
        noticeHeader: string;
        noticeContent: string;
    };

}

const NoticeCard:React.FC<NoticeCardProps> = (props) => {
    const { notice } = props;
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2>{notice.noticeHeader}</h2>
                <p>
                    {notice.noticeContent}
                </p>
            </div>
        </div>
    )
}

export default NoticeCard;