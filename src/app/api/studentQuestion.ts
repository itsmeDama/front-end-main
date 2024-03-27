const API_URL = 'http://localhost:4000';
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

export const getStudentQuestion = async () => {
    const response = await fetch(`${API_URL}/user/student/getquestions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        //body: JSON.stringify({classRoomId:classId}),
        credentials: 'include',
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});
    }

    return response.json();

};

export const answerQuestion = async (content, id) => {
    const response = await fetch(`${API_URL}/user/student/answerquestion`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({answerContent:content, questionId: id}),
        credentials: 'include',
    });

    if (response.status !== 202) {
        const data = await response.json();
        AntdNotification.success({message: data.message});

    } else {
        return response.json();
    }

};