import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom"
import AppBar from "./components/AppBar"
import { authenticate } from './services/AuthService'
import Accounts from "./views/Accounts"
import Home from "./views/Home"

function App() {
  const [authenticated, setAuthenticated] = useState(null)
  useEffect(() => {
    authenticate({ email: 'demo@demo.com', password: '123456' })
      .then((result) => { setAuthenticated(result) },
        (error) => {
          console.log('error', error)
        }
      )
  }, [])
  return ( authenticated ? 
    <Container>
      <AppBar />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/accounts">
          <Accounts />
        </Route>
      </Router>
    </Container>
  : null)
}

export default App
