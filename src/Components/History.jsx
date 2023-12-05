import React from 'react'
import { useSelector } from 'react-redux'

const History = () => {
    const { fetchedUser } = useSelector((state) => state.AllUsers, []);
    const username = fetchedUser?.username || "";
    const TransactionHistory = fetchedUser?.TransactionHistory || [];
    return (
        <div>
            <div className="account_rel pt-8 med w-100 ">
                <h1 className="fs-2 m-3">
                    Transaction <span className="fs-3 text-secondary">History</span>
                </h1>

                <div>
                    {TransactionHistory.length > 0 ? (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col whitespace-nowrap">Transaction Type</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TransactionHistory.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.Category}</td>
                                            <td>{item.Amount}</td>
                                            <td>{item.Date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center Transactionhistory">
                            <h3 className="text-secondary">No Transaction History</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default History