const API_URL = 'http://localhost:4000';
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

export const createQuestion = async (question , classId) => {
    const response = await fetch(`${API_URL}/user/teacher/createquestion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({questionContent:question , classRoomId:classId}),
        credentials: 'include',
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});

    } else {
        return response.json();
    }

};

export const getAllQuestion = async (classId) => {
    const response = await fetch(`${API_URL}/user/teacher/getquestions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({classRoomId:classId}),
        credentials: 'include',
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});
    }

    return response.json();

};

export const deleteQuestion = async (questionId) => {
    const response = await fetch(`${API_URL}/user/teacher/deletequestion`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({questionId: questionId}),
        credentials: 'include',
    });

    if (response.status !== 204) {
        const data = await response.json();
        AntdNotification.error({ message: data.message });
    } else {
        return null
    }
};