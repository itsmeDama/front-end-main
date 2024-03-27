'use client';
import type {NextPage} from "next";
import {Button, Form} from "react-bootstrap";
import { User } from "@/app/models/User";
import React, {useState, useEffect} from "react";
import bg from "../../../../../public/images/logBg.jpg";
import styles from "@/app/pages/auth/Register/Register.module.scss";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { AntdNotification} from "@/app/components/shared/notifications/Notifications";
import { registerTeacher, registerStudent, getAllClass } from "@/app/api/auth";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Register: NextPage = () => {

    const router = useRouter();
    const initUserData: User = {
        type: '',
        gender: '',
        firstname: '',
        classid: '',
        lastname: '',
        email: '',
        password: '',
        conPass: ''
    };
    const [userData, setUserData] = useState<User>(initUserData);
    const [selectUser, setSelectUser] = useState<string>('');
    const [selectGender, setSelectGender] = useState<string>('');
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [classRooms, setClassRooms] = useState([]);
    const [selectedClassRoom, setSelectedClassRoom] = useState({
        className: '',
        uuid: ''
    });


    const userChange = (event: any) => {
        setSelectUser(event.target.value);
        setUserData({...userData, type: event.target.value});
    }

    const genderChange = (event: any) => {
        setSelectGender(event.target.value);
        setUserData({...userData, gender: event.target.value});
    }
    const fNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserData({...userData, firstname: event.target.value});
    };

    const lNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserData({...userData, lastname: event.target.value});
    };


    const emailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        validateEmail(event.target.value);
        setUserData({...userData, email: event.target.value});
    };


    const passwordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserData({...userData, password: event.target.value});
    };

    const confPassChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserData({...userData, conPass: event.target.value});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllClass();
                setClassRooms(response.classRoom);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleClassRoomSelect = (classRoom) => {
        setSelectedClassRoom(classRoom);
        setUserData({...userData, classid: classRoom.uuid});
    };


    const submitBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        if (!validateFormData(userData).includes(true)){
            if(userData.type === 'teacher') {
                try {
                    const response = await registerTeacher(userData);
                    if (response) {
                        // router.push('../teacherDash');
                        router.push('./login');
                    }

                } catch (error: any) {
                    AntdNotification.error({message: 'Registration Failed!'});
                }
            }

            if(userData.type === 'student') {
                try {
                    const response = await registerStudent(userData);
                    if (response) {
                        // router.push('../studentDash');
                        router.push('./login');
                    }
                } catch (error: any) {
                    AntdNotification.error({message: 'Registration Failed!'});
                }
            }

        } else {
            console.error('Failed, Enter validate data !');
        }
    };

    const validateFormData = (data: User): boolean[] => {
        setHasValidationErr([]);
        if (data.type == '') {
            AntdNotification.error({message: 'Please Select User Type'});
            hasValidationErr.push(true);
        }
        if (data.gender == '') {
            AntdNotification.error({message: 'Please Select Gender'});
            hasValidationErr.push(true);
        }
        if (data.firstname == '') {
            AntdNotification.error({message: 'Please enter First Name'});
            hasValidationErr.push(true);
        }
        if (data.lastname == '') {
            AntdNotification.error({message: 'Please enter Last Name'});
            hasValidationErr.push(true);
        }
        if (data.classid == '') {
            AntdNotification.error({message: 'Please enter Class Name'});
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
        if (data.conPass == '') {
            AntdNotification.error({message: 'Please conform password'});
            hasValidationErr.push(true);
        }
        if (data.password !== data.conPass) {
            AntdNotification.error({message: 'Please Check your Password !'});
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
               <p className={styles.topic}>REGISTER</p>
               <p className={styles.signText}>HAVE AN ACCOUNT ? <span className={styles.sign} onClick={() => router.push('./login')}>SIGN IN</span></p>
               <Form className={styles.form}>
                   <div className={styles.innerGroup}>
                       <Form.Group className={styles.group}>
                           <Form.Label className={styles.label}>Register As</Form.Label>
                           <div className={styles.innerGroup}>
                               <Form.Check
                                   type='radio'
                                   name='user'
                                   value={'teacher'}
                                   checked={selectUser === 'teacher'}
                                   onChange={userChange}
                               />
                               <Form.Label >Teacher</Form.Label>
                           </div>
                           <div className={styles.innerGroup}>
                               <Form.Check
                                   type='radio'
                                   name='user'
                                   value={'student'}
                                   checked={selectUser === 'student'}
                                   onChange={userChange}
                               />
                               <Form.Label >Student</Form.Label>
                           </div>
                       </Form.Group>
                       <Form.Group className={styles.group} id={styles.genderGroup}>
                           <Form.Label className={styles.label}>Gender</Form.Label>
                           <div className={styles.innerGroup}>
                               <Form.Check
                                   type='radio'
                                   name='gender'
                                   value={'0'}
                                   checked={selectGender === '0'}
                                   onChange={genderChange}
                               />
                               <Form.Label >Male</Form.Label>
                           </div>
                           <div className={styles.innerGroup}>
                               <Form.Check
                                   type='radio'
                                   name='gender'
                                   value={'1'}
                                   checked={selectGender === '1'}
                                   onChange={genderChange}
                               />
                               <Form.Label>Female</Form.Label>
                           </div>
                       </Form.Group>
                   </div>
                   <div className={styles.innerGroup}>
                       <Form.Group className={styles.group}>
                           <Form.Label className={styles.label}>First Name</Form.Label>
                           <Form.Control className={styles.input} type='text' onChange={(e) => fNameChange(e)}/>
                       </Form.Group>
                       <Form.Group className={styles.group} >
                           <Form.Label className={styles.label}>Last Name</Form.Label>
                           <Form.Control className={styles.input} type='text' onChange={(e) => lNameChange(e)}/>
                       </Form.Group>
                   </div>
                   <div className={styles.innerGroup} id={styles.dopGroup}>
                       <Form.Group className={styles.group}>
                           <Form.Label className={styles.label}>Class Name</Form.Label>
                           <DropdownButton id="dropdown-basic-button" title={selectedClassRoom.className ? selectedClassRoom.className : 'Select Class'}>
                               {classRooms.map((classRoom) => (
                                   <Dropdown.Item
                                       key={classRoom.uuid}
                                       onClick={() => handleClassRoomSelect(classRoom)}
                                   >
                                       {classRoom.className}
                                   </Dropdown.Item>
                               ))}
                           </DropdownButton>
                       </Form.Group>
                       <Form.Group className={styles.group} >
                           <Form.Label className={styles.label}>Email</Form.Label>
                           <Form.Control className={styles.input} type='email' onChange={(e) => emailChange(e)}/>
                       </Form.Group>
                   </div>
                  <div className={styles.innerGroup}>
                      <Form.Group className={styles.group} >
                          <Form.Label className={styles.label} >Password</Form.Label>
                          <Form.Control className={styles.input} type='password' onChange={(e) => passwordChange(e)}/>
                      </Form.Group>
                      <Form.Group className={styles.group}>
                          <Form.Label className={styles.label}>Conform Password</Form.Label>
                          <Form.Control className={styles.input} type='password' onChange={(e) => confPassChange(e)}/>
                      </Form.Group>
                  </div>
                   <Button className={styles.btn} onClick={submitBtnHandler}> Submit</Button>
               </Form>
           </div>
        </>
    )
}

export default Register;