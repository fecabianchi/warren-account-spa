import React, { useContext, useEffect } from "react"
import { Table } from "react-bootstrap"
import HistoryContext from "../contexts/HistoryContext"

function History(props) {
  const [histories, updateHistories] = useContext(HistoryContext)

  useEffect(() => {
    updateHistories()
  }, [])

  return <Table striped bordered hover>
    <thead>
      <tr>
        <th># Transação</th>
        <th># Usuário</th>
        <th>Valor</th>
        <th>Operação</th>
      </tr>
    </thead>
    <tbody>
      {histories.length ?
        histories.map(history => {
          return (
            <tr key={history._id}>
              <td>{history._id}</td>
              <td>{history.userId}</td>
              <td>R$ {(history?.value ?? 0).toFixed(2)}</td>
              <td>{history.operation === 'withdraw' ? 'Retirada' : 'Depósito'}</td>
            </tr>
          )
        })
        : null}
    </tbody>
  </Table>
}

export default History
