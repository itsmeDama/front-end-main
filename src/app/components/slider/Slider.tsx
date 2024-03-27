import type { NextPage } from "next";
import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import styles from './Slider.module.scss';

const Slider: NextPage = () => {
    return (
        <Marquee pauseOnHover={true} className={styles.slider}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <FontAwesomeIcon icon={faBook} className={styles.icon} />
                    <p className={styles.cardTopic}>Manage Subject</p>
                </div>
                <p className={styles.cardContent}>
                    This system streamlines the
                    allocation of subjects, tracks student progress, and facilitates communication
                    between educators, students, and administrators to enhance the overall learning experience.
                </p>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <FontAwesomeIcon icon={faChartBar} className={styles.icon} />
                    <p className={styles.cardTopic}>Analysis Marks</p>
                </div>
                <p className={styles.cardContent}>
                    Student marks analysis is the process of evaluating and interpreting academic performance
                    data to gain insights into students&apos; achievements and learning patterns. By analyzing marks
                    and grades obtained in different subjects and examinations.
                </p>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <FontAwesomeIcon icon={faGears} className={styles.icon} />
                    <p className={styles.cardTopic}>Predict A/L Stream</p>
                </div>
                <p className={styles.cardContent}>
                    The Student Performance Analysis System is the best solution for
                    improving and evaluating student&apos;s performance and it is the proper way to measure
                    student potential for their future learning path.
                </p>
            </div>
        </Marquee>
    )
}

export default Slider;