import React from 'react';
import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from "formik";
import {LockClosedIcon} from "@heroicons/react/solid";
import {useStore} from "../../app/stores/store";
import ErrorSection from "../components/ErrorSection";

function Register() {
    const {userStore} = useStore();
    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your
                            account
                        </h2>
                    </div>
                    <Formik initialValues={{
                        name: '', email: '', password: '', password_confirmation: ''
                    }} onSubmit={(values, {setSubmitting}) =>
                        userStore.register(values).catch(() => setSubmitting(false))}>
                        {({handleSubmit, isSubmitting}) => (
                            <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                <ErrorSection/>
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">
                                            Username
                                        </label>
                                        <Field
                                            name="name"
                                            type="text"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div className={'flex justify-between'}>
                                        <div className={'w-1/2'}>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <Field
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className={'w-1/2'}>
                                            <label htmlFor="password" className="sr-only">
                                                Re-Password
                                            </label>
                                            <Field
                                                name="password_confirmation"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-br focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Re-Password"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-gray-500 hover:bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500${isSubmitting ? ' loading' : ''}`}
                                    >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <LockClosedIcon className={`h-5 w-5 ${isSubmitting ? 'text-gray-500 group-hover:text-gray-500' : 'text-indigo-500 group-hover:text-indigo-400'}`}
                                                  aria-hidden="true"/>
                                </span>
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default observer(Register);
