import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = ({allowedRoles}) =>{
    const {auth} = useAuth();
    const location = useLocation();
    const roleArray = auth.accessToken?JSON.parse(auth?.role):[];

    useEffect(()=>{
        console.log("accessToken",auth.accessToken)
        console.log("auth.role: ",auth?.role)
    },[]);

    return(
        roleArray?.find(role => allowedRoles?.includes(role))
        ?<Outlet />
            :auth?.accessToken
            ?<Navigate to = "/unauthorized" state = {{from:location}} replace />
            :<Navigate to = "/login" state = {{from:location}} replace />
    );
}

export default RequireAuth;

