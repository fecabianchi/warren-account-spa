import React, { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import HistoryContext from "../contexts/HistoryContext"
import { deposit, getAccountInfo, getAccounts, payment, withdraw } from "../services/AccountService"

function UserStats(props) {
  const [show, setShow] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [value, setValue] = useState(0)
  const [selectedAccount, setSelectedAccount] = useState('')
  const [account, setAccount] = useState()
  const [accounts, setAccounts] = useState([])
  const [, updateHistories] = useContext(HistoryContext)

  const handleWithdraw = async (e) => {
    e.preventDefault()
    try {
      await withdraw(value)
      updateAccountInfo()
      setValue(0)
      setShow(false)
    } catch (err) {
      setShow(false)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      payment({
        value,
        accountId: selectedAccount,
      }).then(() => {
        updateAccountInfo()
        setValue(0)
        setShowPaymentModal(false)
      })
    } catch (err) {
      setShowPaymentModal(false)
    }
  }

  const handleDeposit = async (e) => {
    e.preventDefault()
    try {
      await deposit(value)
      updateAccountInfo()
      setValue(0)
      setShowDepositModal(false)
    } catch (err) {
      setShowDepositModal(false)
    }
  }

  const handleSelected = (e) => {
    setSelectedAccount(e.target.value)
  }

  const handleValueChange = (e) => {
    setValue(e.target.value)
  }

  const handleDepositClose = () => setShowDepositModal(false)
  const handleDepositShow = () => setShowDepositModal(true)

  const handlePaymentModalClose = () => setShowPaymentModal(false)
  const handlePaymentModalShow = () => setShowPaymentModal(true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function updateAccountInfo() {
    getAccountInfo().then(({ data }) => {
      setAccount(data)
      updateHistories()
    })
  }

  useEffect(() => {
    getAccounts().then(({ data }) => {
      setAccounts(data)
    })
    updateAccountInfo()
  }, [])

  return (
    <Container style={{ marginBottom: 10 }}>
      <Table striped bordered hover>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr key="id">
            <td>#</td>
            <td>{account?._id}</td>
          </tr>
          <tr key="nome">
            <td>Nome</td>
            <td>{account?.name}</td>
          </tr>
          <tr key="saldo">
            <td>Saldo</td>
            <td>R$ {(account?.balance ?? 0).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow} block>
            Retirada
          </Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleDepositShow} block>
            Deposito
          </Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={handlePaymentModalShow} block>
            Pagamento
          </Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Retirada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formValue">
              <Form.Label>Valor</Form.Label>
              <Form.Control value={value} type="number" placeholder="Valor" onChange={handleValueChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleWithdraw} type="submit">
            Retirar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDepositModal} onHide={handleDepositClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formValue">
              <Form.Label>Valor</Form.Label>
              <Form.Control value={value} type="number" placeholder="Valor" onChange={handleValueChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDepositClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleDeposit} type="submit">
            Depositar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={handlePaymentModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formValue">
              <Form.Label>Valor</Form.Label>
              <Form.Control value={value} type="number" placeholder="Valor" onChange={handleValueChange} />
            </Form.Group>
            <Form.Group controlId="formSelect">
              <Form.Label>Conta</Form.Label>
              <Form.Control as="select" onChange={handleSelected} value={selectedAccount}>
                <option key="empty" value="" />
                {accounts.length ?
                  accounts.map((accountData, i) => {
                    return (
                      <option key={i} value={accountData._id}>{accountData.name}</option>
                    )
                  })
                  : null}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePaymentModalClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handlePayment} type="submit" disabled={selectedAccount === ''}>
            Transferir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default UserStats
