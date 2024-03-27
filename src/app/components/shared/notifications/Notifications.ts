import { notification } from 'antd';
import { ArgsProps } from "antd/es/notification/interface";

notification.config({
    style: {
        borderRadius: '25px',
        zIndex: 9999,
    },
});

const defaultOptions: ArgsProps = {
    message: "",
    placement: 'bottomLeft',
    duration: 10,
};

export const AntdNotification = {
    open: (options: ArgsProps): void => {
        notification.open({...defaultOptions, ...options});
    },
    success: (options: ArgsProps): void => {
        notification.success({...defaultOptions, ...options});
    },
    error: (options: ArgsProps): void => {
        notification.error({...defaultOptions, ...options});
    },
    info: (options: ArgsProps): void => {
        notification.info({...defaultOptions, ...options});
    },
    warning: (options: ArgsProps): void => {
        notification.warning({...defaultOptions, ...options});
    },
};
