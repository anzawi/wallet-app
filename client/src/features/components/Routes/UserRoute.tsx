import { Navigate, useLocation } from 'react-router-dom';
import {useStore} from "../../../app/stores/store";

const UserRoute = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    const{userStore} = useStore()

    if (!userStore.isLoggedin) {
        return <Navigate to="/" state={{ from: location }} />;
    } else if (userStore.isAdmin) {
        return <Navigate to="/dashboard" state={{ from: location }} />;
    }

    return children;
};

export default UserRoute;
