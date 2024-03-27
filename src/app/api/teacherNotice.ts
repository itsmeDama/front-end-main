const API_URL = 'http://localhost:4000';
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

export const createNotice = async (header, content) => {
    const response = await fetch(`${API_URL}/user/teacher/createnotice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({noticeHeader:header , noticeContent: content}),
        credentials: 'include',
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});

    } else {
        return response.json();
    }

};

export const getNotices = async () => {
    const response = await fetch(`${API_URL}/user/teacher/getnotices`, {
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

export const updateNoticeHeader = async (id, header) => {
    const response = await fetch(`${API_URL}/user/teacher/updatenoticeheader`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({noticeId:id, noticeHeader:header}),
        credentials: 'include',
    });

    if (response.status !== 202) {
        const data = await response.json();
        AntdNotification.error({message: data.message});

    } else {
        return response.json();
    }

};

export const updateNoticeContent = async (id, content) => {
    const response = await fetch(`${API_URL}/user/teacher/updatenoticecontent`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({noticeId:id, noticeContent:content}),
        credentials: 'include',
    });

    if (response.status !== 202) {
        const data = await response.json();
        AntdNotification.error({message: data.message});

    } else {
        return response.json();
    }

};

export const deleteNotice = async (noticeId) => {
    const response = await fetch(`${API_URL}/user/teacher/deletenotice`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({noticeId: noticeId}),
        credentials: 'include',
    });

    if (response.status !== 204) {
        const data = await response.json();
        AntdNotification.error({ message: data.message });
    } else {
        return null
    }
};