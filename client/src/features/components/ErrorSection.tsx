import React from "react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";

function ErrorSection() {
    const {errorsStore} = useStore()
    return (
        <>
        {errorsStore.hasErrors && errorsStore.errors?.code !== 500 ?
                <div>
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    </div>
                    <div
                        className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <ul>
                            {errorsStore.getErrors()?.message.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                : errorsStore.hasErrors && errorsStore.errors?.code === 500 ?
                <div>
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    </div>
                    <div
                        className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        unknown error
                    </div>
                </div>: null}
        </>
    )
}

export default observer(ErrorSection)