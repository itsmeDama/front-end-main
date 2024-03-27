import type { NextPage} from "next";
import styles from './MarkCard.module.scss';

const MarkCard: NextPage = (props) => {
    const { marks } = props;
    return (
        <div className={styles.container}>
            <div className={styles.markCard}>
                <h2>{marks.subjectName}</h2>
                <h2>{marks.markValue}</h2>
            </div>
        </div>
    )
}

export default MarkCard;