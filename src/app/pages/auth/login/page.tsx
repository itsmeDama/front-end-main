'use client';
import type { NextPage} from "next";
import styles from './Login.module.scss';
import Image from "next/image";
import bg from '../../../../../public/images/logBg.jpg';
import { useRouter} from "next/navigation";
import { Button, Form} from "react-bootstrap";
import { Log } from "@/app/models/User";
import React, {useState} from "react";
import { AntdNotification} from "@/app/components/shared/notifications/Notifications";
import { login } from "@/app/api/auth";

const Login: NextPage = () => {
    const router = useRouter();
    const initLogData: Log = {
        email: '',
        password: '',
        type: ''
    };
    const [logData, setLogData] = useState<Log>(initLogData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [selectUser, setSelectUser] = useState<string>('');

    const userChange = (event: any) => {
        setSelectUser(event.target.value);
        setLogData({...logData, type: event.target.value});
    }
    const emailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        validateEmail(event.target.value);
        setLogData({...logData, email: event.target.value});
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setLogData({...logData, password: event.target.value});
    };

    const submitBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        if (!validateFormData(logData).includes(true)){
           if (logData.type === 'teacher') {
               try {
                   const response = await login(logData);
                   if (response) {
                       router.push('../teacherDash');
                   }
               } catch (error: any) {
                   AntdNotification.error({message: 'Login Failed!'});
               }
           }
            if (logData.type === 'student') {
                try {
                    const response = await login(logData);
                    if (response) {
                        router.push('../studentDash');
                    }
                } catch (error: any) {
                    AntdNotification.error({message: 'Login Failed!'});
                }
            }
        }
    }

    const validateFormData = (data: Log): boolean[] => {
        setHasValidationErr([]);
        if (data.type == '') {
            AntdNotification.error({message: 'Please Select User Type'});
            hasValidationErr.push(true);
        }
        if (data.email == '') {
            AntdNotification.error({message: 'Please enter an Email'});
            hasValidationErr.push(true);
        } else if(!isValidEmail) {
            AntdNotification.error({message: 'Please enter an valid Email'});
            hasValidationErr.push(true);
        }
        if (data.password == '') {
            AntdNotification.error({message: 'Please enter password'});
            hasValidationErr.push(true);
        }

        return hasValidationErr;
    }

    const validateEmail = (email: any) => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (emailRegex.test(email)) {
            setIsValidEmail(true);
        }
    }

    return (
        <>
            <Image src={bg} alt={'background image'} className={styles.bgImg} />
            <div className={styles.logCard}>
                <p className={styles.topic}>LOGIN</p>
                <p className={styles.signText}>DON&apos;T HAVE AN ACCOUNT ? <span className={styles.sign} onClick={() => router.push('./register')}>SIGN UP</span></p>
                <Form className={styles.form}>
                    <Form.Group className={styles.group}>
                        <Form.Label className={styles.label}>Log As</Form.Label>
                        <div className={styles.innerGroup}>
                            <Form.Check
                                type='radio'
                                label={'teacher'}
                                name='user'
                                value={'teacher'}
                                checked={selectUser === 'teacher'}
                                onChange={userChange}
                            />
                        </div>
                        <div className={styles.innerGroup}>
                            <Form.Check
                                type='radio'
                                name='user'
                                label={'student'}
                                value={'student'}
                                checked={selectUser === 'student'}
                                onChange={userChange}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className={styles.group}>
                        <Form.Label className={styles.label}>User E-Mail</Form.Label>
                        <Form.Control className={styles.input} type='email' onChange={(e) => emailChange(e)}></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.group}>
                        <Form.Label className={styles.label}>Password</Form.Label>
                        <Form.Control className={styles.input} type='password' onChange={(e) => passwordChange(e)}></Form.Control>
                    </Form.Group>
                    <Button className={styles.btn} onClick={submitBtnHandler}>Log In</Button>
                </Form>
            </div>
        </>
    )
}

export default Login;