import React, {useEffect} from 'react';
import './index.css';
import {observer} from "mobx-react-lite";
import LoginPage from "../../features/pages/LoginPage";
import Nav from "../../features/components/Nav";
import {useStore} from "../stores/store";
import Dashboard from "../../features/pages/Dashboard";
import {Route, Routes} from "react-router-dom";
import Home from "../../features/pages/dashboard/Home";
import ListPayments from "../../features/pages/dashboard/Payments/ListPayments";
import ListUsers from "../../features/pages/dashboard/Users/ListUsers";
import ListTransactions from "../../features/pages/dashboard/Transaction/ListTransactions";
import PrivateRoute from "../../features/components/Routes/PrivateRoute";
import GuestRoute from "../../features/components/Routes/GuestRoute";
import Profile from "../../features/pages/user/Profile";
import ModalContainer from "../../features/components/ModalContainer";
import ProfileHistory from "../../features/pages/user/ProfileHistory";
import ErrorSection from "../../features/components/ErrorSection";
import UserRoute from "../../features/components/Routes/UserRoute";
import NotFound from "../../features/pages/NotFound";
import Register from "../../features/pages/Register";

function App() {
    const {userStore, commonStore} = useStore();
    useEffect(() => {
        if (commonStore.token) {
            userStore.getCurrentUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, userStore])
    return (
        <>
            {
                !commonStore.appLoaded ?
                    <div className="flex h-screen">
                        <div className="m-auto">
                            <h3 className={'text-3xl'}>Loading ...</h3>
                        </div>
                    </div>
                    :
                    <div className="App">
                        <ErrorSection/>

                        {userStore.isAdmin ?
                            null :
                            <Nav/>
                        }
                        <Routes>
                            <Route path='*' element={<NotFound/>}/>
                            <Route path={'/'} element={
                                <GuestRoute>
                                    <LoginPage/>
                                </GuestRoute>}/>
                            <Route path={'/register'} element={
                                <GuestRoute>
                                    <Register/>
                                </GuestRoute>}/>

                            <Route path={'/dashboard'} element={
                                <PrivateRoute>
                                    <Dashboard/>
                                </PrivateRoute>
                            }>
                                <Route path={'/dashboard/'} element={
                                    <PrivateRoute>
                                        <Home/>
                                    </PrivateRoute>}/>
                                <Route path={'/dashboard/payments'} element={
                                    <PrivateRoute>
                                        <ListPayments/>
                                    </PrivateRoute>
                                }/>
                                <Route path={'/dashboard/users'} element={<PrivateRoute>
                                    <ListUsers/>
                                </PrivateRoute>}/>
                                <Route path={'/dashboard/transaction'} element={<PrivateRoute>
                                    <ListTransactions/>
                                </PrivateRoute>}/>
                            </Route>

                            <Route path={'/profile'} element={
                                <UserRoute>
                                    <Profile/>
                                </UserRoute>
                            }>
                            </Route>
                            <Route path={'/profile/history'} element={
                                <UserRoute>
                                    <ProfileHistory/>
                                </UserRoute>
                            }/>
                        </Routes>
                    </div>
            }

            <ModalContainer/>
        </>
    );
}

export default observer(App);
