import {Dialog, Transition} from '@headlessui/react'
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import React, {Fragment, useRef} from "react";


function ModalContainer() {
    const {modalStore} = useStore();
    const cancelButtonRef = useRef(null)
    return (
        <Transition.Root show={modalStore.modal.open} as={Fragment}>
            <Dialog initialFocus={cancelButtonRef} as="div"
                    className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center"
                    onClose={modalStore.closeModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    <div className={'relative flex bg-white mt-52 rounded'}>{modalStore.modal.body}</div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default observer(ModalContainer);