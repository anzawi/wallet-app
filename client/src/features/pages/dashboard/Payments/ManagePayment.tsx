import React, {ChangeEvent, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Field, Form, Formik} from "formik";
import {useStore} from "../../../../app/stores/store";
import {PaymentFormValue} from "../../../../app/models/Payment";
import ErrorSection from "../../../components/ErrorSection";

interface Props {
    payment?: PaymentFormValue
}

function ManagePayment({payment}: Props) {
    const {paymentStore} = useStore();
    if (payment)
        paymentStore.setImage(payment.img)

    const initValues = payment ?? {
        name: '',
        currencies: '',
        max_deposit: '',
        min_deposit: '',
        max_withdrawal: '',
        min_withdrawal: '',
        img: paymentStore.image,
        slug: '',
    }
    const [targetPayment, setTargetPayment] = useState(initValues)

    return (
        <div className="min-h-full flex flex-col-reverse items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Formik initialValues={{
                name: targetPayment.name,
                currencies: payment? JSON.parse(targetPayment.currencies) : targetPayment.currencies,
                max_deposit: targetPayment.max_deposit,
                min_deposit: targetPayment.min_deposit,
                max_withdrawal: targetPayment.max_withdrawal,
                min_withdrawal: targetPayment.min_withdrawal,
                img: paymentStore.image,
                slug: targetPayment.slug,
                errors: null
            }} onSubmit={(values, {setSubmitting}) =>
                payment ?
                    paymentStore.update(values).finally(() => setSubmitting(false))
                    :
                    paymentStore.create(values).finally(() => setSubmitting(false))
            }>
                {({handleSubmit, isSubmitting}) => (
                    <Form className="space-y-6 mt-10 mb-4" onSubmit={handleSubmit}>
                        <ErrorSection />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Payment Method Name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Payment Method Name"
                                />
                            </div>
                            <div>
                                <label className="sr-only">
                                    Currencies
                                </label>
                                <Field
                                    name="currencies"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Currencies (USD,JOD,ERU)"
                                />
                            </div>
                            <div className={'flex justify-between'}>
                                <div className={'w-1/2'}>
                                    <label className="sr-only">
                                        MAX Depose
                                    </label>
                                    <Field
                                        name="max_deposit"
                                        type="number"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="MAX Depose"
                                    />
                                </div>
                                <div className={'w-1/2'}>
                                    <label className="sr-only">
                                        MIN Depose
                                    </label>
                                    <Field
                                        name="min_deposit"
                                        type="number"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="MIN Depose"
                                    />
                                </div>
                            </div>
                            <div className={'flex justify-between'}>
                                <div className={'w-1/2'}>
                                    <label className="sr-only">
                                        MAX Withdrawal
                                    </label>
                                    <Field
                                        name="max_withdrawal"
                                        type="number"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="MAX Withdrawal"
                                    />
                                </div>
                                <div className={'w-1/2'}>
                                    <label className="sr-only">
                                        MIN Withdrawal
                                    </label>
                                    <Field
                                        name="min_withdrawal"
                                        type="number"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="MIN Withdrawal"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={'block'}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500${isSubmitting ? 'bg-gray-500 hover:bg-gray-500' : ' bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {payment? 'Edit' : 'Create'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <Formik initialValues={{
                img: paymentStore.image,
                errors: ''
            }} onSubmit={(values, {setErrors}) =>
                paymentStore.uploadImage(values).catch(errors => setErrors({errors: 'file must be image size less than 2048 mb'}))
            }>
                {({handleSubmit, setFieldValue, errors}) => (
                    <Form encType={'multipart/form-data'} onSubmit={handleSubmit}>

                        <div>
                            <label className="sr-only">
                                Image
                            </label>
                            <input
                                onChange={(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                    // @ts-ignore
                                    setFieldValue('img', event.currentTarget.files[0]!)
                                    // @ts-ignore
                                    paymentStore.uploadImage(event.currentTarget.files[0])
                                }}
                                type="file"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Image"
                                accept={'image/*'}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default observer(ManagePayment);
