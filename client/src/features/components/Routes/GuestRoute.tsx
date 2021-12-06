import { Navigate, useLocation } from 'react-router-dom';
import {useStore} from "../../../app/stores/store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    const{userStore} = useStore()

    if (userStore.isLoggedin) {
        if (!userStore.isAdmin)
        return <Navigate to="/profile" state={{ from: location }} />;
        else
            return <Navigate to="/dashboard" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;