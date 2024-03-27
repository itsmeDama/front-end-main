const API_URL = 'http://localhost:4000';
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

export const getStudentMarks = async (examId) => {
    const response = await fetch(`${API_URL}/user/student/getmymarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({examId: examId}),
        credentials: 'include',
    });

    if (response.status !== 200) {
        const data = await response.json();
        AntdNotification.error({message: data.message});

    } else {
        return response.json();
    }

};