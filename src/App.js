import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/store'
import jwt_decode from 'jwt-decode'
import { setCurrentUser , logoutUser } from './store/actions/authActions'
import setAuthToken from './utils/setAuthToken'
import Register from './components/Admin/Register'
import Login from './components/Admin/Login'



// Check for token to keep user logged in

if (localStorage.jwtToken) {

  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)

  // Decode token and get user info and exp
  const decoded = jwt_decode(token)

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {

    // Logout user
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = "./login"

  }

}

function App() {

  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </Provider>

  )

}

export default App
