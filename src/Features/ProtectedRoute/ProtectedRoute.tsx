import React from 'react';
import {Outlet, Navigate} from "react-router";

type ProtectedRouteProps = {
    isAllowed: boolean,
    redirectPath?: string,
}

export const ProtectedRoute = ({isAllowed, redirectPath = '/'}: ProtectedRouteProps) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace={true} />
    }
    return (
        <Outlet/>
    );
};