import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from "formik";
import {useStore} from "../../../app/stores/store";
import ErrorSection from "../../components/ErrorSection";

function CreateTransaction() {
    const {paymentStore, transactionStore} = useStore()

    useEffect(() => {
        paymentStore.getAll()
    }, [paymentStore])

    return (
        <div className="min-h-full flex flex-col-reverse items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Formik initialValues={{
                payment_method: '',
                transaction_type: 'deposit',
                amount: 0.00,
            }} onSubmit={(values, {setErrors, setSubmitting}) =>
                transactionStore.create(values, setSubmitting)
            }>
                {({handleSubmit, isSubmitting, errors}) => (
                    <Form className="space-y-6 mt-10 mb-4" onSubmit={handleSubmit}>
                        <ErrorSection/>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Amount
                                </label>
                                <Field
                                    name="amount"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Amount"
                                />
                            </div>
                            <div className={'flex justify-between'}>
                                <div className={'w-1/2'}>
                                    <label className="sr-only">
                                        Payment Method
                                    </label>
                                    <Field as={'select'}
                                           name="payment_method"
                                           required
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           placeholder="Payment Method"
                                    >
                                        <option>Select Payment Method</option>
                                        {
                                            paymentStore.payments.map(payment => (
                                                <option key={payment.slug} value={payment.slug}>{payment.name}</option>
                                            ))
                                        }
                                    </Field>
                                </div>
                                <div className={'w-1/2'}>
                                    <label className="sr-only">
                                        Transaction Type
                                    </label>
                                    <Field as={'select'}
                                           name="transaction_type"
                                           type="number"
                                           required
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           placeholder="MIN Depose"
                                    >
                                        <option value='deposit'>Deposit</option>
                                        <option value='withdraw'>Withdraw</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className={'block'}>
                            <button
                                type="submit"
                                //disabled={isSubmitting}
                                className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500${isSubmitting ? ' bg-gray-500 hover:bg-gray-500' : ' bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                Create
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default observer(CreateTransaction);
