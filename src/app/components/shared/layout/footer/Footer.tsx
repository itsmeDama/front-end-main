import type { NextPage} from "next";
import styles from './Footer.module.scss';

const Footer: NextPage = () => {
    return (
        <div className={styles.footer}>
            <span>Developed by @hdse22.2f group1</span>
            <p>2024 all right reserverd</p>
        </div>
    )
}

export default Footer;