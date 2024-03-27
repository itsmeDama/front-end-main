import type {NextPage} from "next";
import styles from './Landing.module.scss';
import Image from "next/image";
import mainBg from '../../../../public/images/homeBg.jpg';
import Slider from "@/app/components/slider/Slider";

const Landing: NextPage = () => {
    return(
        <>
            <div className={styles.container}>
                <Image src={mainBg} alt={'main image'} loading={'eager'} className={styles.homeBg} />
                <h1 className={styles.topic}>Student Performance Analysis System</h1>
                <Slider />
            </div>
        </>
    )
}

export default Landing;