'use client';
import type { NextPage} from "next";
import styles from './Navbar.module.scss';
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const Navbar: NextPage = () => {
    const router = useRouter();

    const homeHandler = (event: React.MouseEvent<HTMLButtonElement>):void => {
        router.push('../../../pages/landing');
    }
    const loginHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        router.push('../../../pages/auth/login');
    }

    const regHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        router.push('../../../pages/auth/register');
    }

    return (
        <>
            <div className={styles.container}>
                <Button className={styles.btnHome} onClick={homeHandler}>
                    <FontAwesomeIcon icon={faGraduationCap} />
                    Home
                </Button>
                <div className={styles.btnBox}>
                    <Button className={styles.btnLog} onClick={loginHandler}>Sign In</Button>
                    <Button className={styles.btnLog} onClick={regHandler}>Sign Up</Button>
                </div>
            </div>
        </>
    )
}

export default Navbar;