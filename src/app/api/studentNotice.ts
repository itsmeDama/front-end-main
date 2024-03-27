const API_URL = 'http://localhost:4000';
import {AntdNotification} from "@/app/components/shared/notifications/Notifications";

export const getStudentNotices = async () => {
    const response = await fetch(`${API_URL}/user/student/getnotices`, {
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