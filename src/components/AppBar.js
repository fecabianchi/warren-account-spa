import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

function AppBar() {
  return <Navbar>
    <Nav className="mr-auto">
      <Nav.Link href="/">Warren Account</Nav.Link>
    </Nav>
  </Navbar>
}

export default AppBar
