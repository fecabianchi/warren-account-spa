import React, {useState, useEffect} from "react"
import {getAccounts} from "../services/AccountService"
import {Table} from "react-bootstrap"

function Accounts(props) {

    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        getAccounts()
            .then((result) => setAccounts(result.data))
            .catch(console.log)
    }, [])

    return <Table striped bordered hover>
        <thead>
        <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Saldo</th>
        </tr>
        </thead>
        <tbody>
        {accounts.length ?
            accounts.map(account => {
                return (
                    <tr key={account._id}>
                        <td>{account._id}</td>
                        <td>{account.name}</td>
                        <td>{account.balance}</td>
                    </tr>
                )
            })
            : null}
        </tbody>
    </Table>
}

export default Accounts
