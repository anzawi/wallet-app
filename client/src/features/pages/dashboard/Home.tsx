import {observer} from "mobx-react-lite";
import {Chart} from "../../components/Chart";
import {useStore} from "../../../app/stores/store";
import {useEffect} from "react";

function Home() {
    const {transactionStore} = useStore()
    useEffect(() => {
        transactionStore.getDataForChart()
    }, [transactionStore])
    return (
        <>
            {transactionStore.loaded ?
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 overflow-x-hidden  bg-gray-200">
                        <div className="container mx-auto px-6 py-8">
                            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

                            <div className="mt-4">
                                <div className="flex flex-wrap -mx-6">
                                    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                                        <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                            <div className="mx-5">
                                                <h4 className="text-2xl font-semibold text-gray-700">{transactionStore.totalTransaction}</h4>
                                                <div className="text-gray-500">Total Transaction</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Chart approved={transactionStore.totals?.approved}
                                   declined={transactionStore.totals?.declined}
                                   pending={transactionStore.totals?.pending}/>
                        </div>
                    </main>
                </div>
            : <div className={'content-center text-center'}>Loading Chart for you ...</div>}
        </>
    );
}

export default observer(Home);
