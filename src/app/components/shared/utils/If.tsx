import { IfProps } from "@/app/types/Utils";
import React from 'react';

export const If: React.FC<IfProps> = ({condition, children}) => {
    return condition ? <>{children}</>: null;
};