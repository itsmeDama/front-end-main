const API_URL = 'http://localhost:4000';
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

export const registerTeacher = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});
    } else {
        AntdNotification.success({message: 'Registration Successfully!'});
        return response.json();
    }

};

export const registerStudent = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});

    } else {
        AntdNotification.success({message: 'Registration Successfully!'});
        return response.json();
    }

};

export const getAllClass = async () => {
    const response = await fetch(`${API_URL}/public/getclassrooms`, {
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

export const login = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});
    } else {
        AntdNotification.success({message: 'Logged Successfully!!'});
        return response.json();
    }

};
