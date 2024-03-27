import type {NextPage} from "next";
import styles from './StudetCard.module.scss';
import React from "react";

const StudentCard: NextPage = (props) => {
    const { student } = props;
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h5>name: {student.firstname} {student.lastname}</h5>

            </div>
            <div className={styles.content}>
                <div className={styles.markList}>
                    <ul>
                        {student.marks.sort((a, b) => a.subject.subjectname.localeCompare(b.subject.subjectname)).slice(0,3).map((subject)=> {
                            return <li>{subject.subject.subjectname}: {subject.markValue? subject.markValue : "N/A"}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.markList}>
                    <ul>
                        {student.marks.sort((a, b) => a.subject.subjectname.localeCompare(b.subject.subjectname)).slice(3,6).map((subject)=> {
                            return <li>{subject.subject.subjectname}: {subject.markValue? subject.markValue : "N/A"}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.markList}>
                    <ul>
                        {student.marks.sort((a, b) => a.subject.subjectname.localeCompare(b.subject.subjectname)).slice(6,9).map((subject)=> {
                            return <li>{subject.subject.subjectname}: {subject.markValue? subject.markValue : "N/A"}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StudentCard;