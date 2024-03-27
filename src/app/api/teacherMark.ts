const API_URL = 'http://localhost:4000';
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

export const getmyclassrooms = async () => {
    const response = await fetch(`${API_URL}/user/teacher/getmyclassrooms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }

    return response.json();

};

export const getAllExams = async () => {
    const response = await fetch(`${API_URL}/public/getexams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }

    return response.json();

};

export const getStudent = async (classId, examId) => {
    const response = await fetch(`${API_URL}/user/teacher/getallstudentbyclassbyexam`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({classRoomId:classId , examId: examId}),
        credentials: 'include',
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});

    } else {
        return response.json();
    }

};

export const getAllSubject = async (examId) => {
    const response = await fetch(`${API_URL}/user/teacher/getallsubjectsbyexam`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({examId: examId}),
        credentials: 'include',
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }

    return response.json();

};

export const addMultipleMarks = async (updatedMark) => {
    const response = await fetch(`${API_URL}/user/teacher/addmultiplemark`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMark),
        credentials: 'include',
    });

    if (response.status !== 200 && response.status !== 201) {
        const data = await response.json();
        AntdNotification.error({message: data.message});
    }

    return response.json();

};