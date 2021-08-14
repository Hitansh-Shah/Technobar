import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/routes/SignIn/SignIn'
import SignUp from './components/routes/SignUp/SignUp'
import Technophiles from './components/routes/Technophiles/Technophiles'
import { useHistory, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import LandingPage from './components/routes/LandingPage/LandingPage';
import {myaxios, authorize, refreshToken} from './Connections'
import Welcome from './components/Profile/Welcome';
import CompleteProfile from './components/Profile/CompleteProfile'
import DetailProfile from './components/routes/Technophiles/DetailProfile';
import { useAlert } from 'react-alert'
import validator from 'validator';
function App(props) {
    
  const [route, setRoute] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory()
  const alert = useAlert()
  useEffect(() => {
    setRoute(window.location.pathname)
  },[window.location.pathname])
  useEffect(() => {
    setIsLoggedIn(isLoggedIn)
  },[isLoggedIn])
  

  const fetchStatus = async function() {
    authorize(localStorage.getItem('authToken'),localStorage.getItem('refreshToken'),setIsLoggedIn)
    try {
      const res = await myaxios({
          method: 'get',
          url: 'api/users/status'
      })
      if(res.status === 200) {
        setIsLoggedIn(true)
        history.push('/welcome')
        return true
      }
    } catch(e) {
      console.log(e.response)
      setIsLoggedIn(false)
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
      return false
    }
  }
  useEffect(() => {
    setIsLoggedIn(false)
    fetchStatus()
  },[])
  

  const onLogout = async function() {
    const options = {
      method: 'post',
      url: 'api/users/logout'
    }
    
    try {
      const res = await myaxios(options)
      if(res.status === 200) {
        setIsLoggedIn(false)
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
      }
      // console.log(res)
    } catch(e) {
      console.log(e.response)
      if(e.response.data.error === 'jwt expired') {
        refreshToken(onLogout, setIsLoggedIn)
      }
    }
  }
  
  
  const onSignin = async function (e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const rememberMe = document.getElementById('rememberMe').checked
  
    const data = {
      email,
      password
    }
    const options = {
      method: 'post',
      url: 'api/users/login', 
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }
    if(email && password) {
      if(validator.isEmail(email)) {
        try{
          const res = await myaxios(options)
          if(res.status === 200) {
            // console.log(res)
            if(rememberMe) {
              localStorage.setItem('authToken', res.data.authToken)
              localStorage.setItem('refreshToken', res.data.refreshToken)
            }
            return authorize(res.data.authToken, res.data.refreshToken, setIsLoggedIn)
          }
        } catch(e) {
          console.log(e.response)
          if(e.response.status === 400) {
            alert.show("Credentials dont match!!")
          }
        }
      } else {
        alert.show("Invalid input in email field!!")
      }
    } else {
      alert.show("Please provide the required credentials")
    }
    
  }
  
  
  const onSignup = async function(e) {
    e.preventDefault();
    const firstName = document.querySelector('#firstName').value
    const lastName = document.querySelector('#lastName').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
  
    const data = {
      firstName,
      lastName,
      email,
      password
    }
    // console.log(data)
    const options = {
      method: 'post',
      url: '/api/users', 
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }
    if(firstName && lastName && email && password) {
      if(validator.isEmail(email)) {
        if(password.length > 13 || password.length < 8) {
          return alert.show("Minimum and Maximum length of password should be 8 and 13 respectively!!")
        }
        try {
          const res = await myaxios(options)
          if(res.status === 201) {
            authorize(res.data.authToken, res.data.refreshToken, setIsLoggedIn)
          }
          // console.log(res)
        } catch(e) {
          console.log(e.response)
          if(e.response.data.name === "MongoError" && e.response.status === 400) {
            alert.show("Account with this email already exists!!!!!")
          }
        }
      } else {
        return alert.show("Invalid input in email field")
      }
    } else {
      return alert.show("Please enter the required credentials!!")
    }
  }
  if(isLoggedIn) {
    return (
      <div>
        <div className="mainContainer">
          <Navigation route={route} isLoggedIn={isLoggedIn} onLogout={onLogout}/>
        </div>
        <Switch> 
          <Route exact path = "/welcome">
            <Welcome setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route path = "/technophiles/:id/">
            <DetailProfile/>
          </Route>
          <Route exact path = "/technophiles">
            <Technophiles/>
          </Route>
          <Route exact path ='/'>
            <LandingPage route={route}/>
          </Route>
          <Route exact path = '/welcome/complete_profile'>
            <CompleteProfile setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route exact path ='/*'>
            <Redirect to="/welcome" />
          </Route>
        </Switch>
    </div>
    )
  } else {
      return (
        <div>
          <div className="mainContainer">
            <Navigation route={route} isLoggedIn={isLoggedIn} onLogout={onLogout}/>
          </div>
          <Switch> 
            <Route exact path = "/login">
              <SignIn onSignin={onSignin} isLoggedIn={isLoggedIn}/>
            </Route>
            <Route exact path = "/register">
              <SignUp onSignup={onSignup} isLoggedIn={isLoggedIn}/>
            </Route>
            <Route path = '/technophiles/:id'>
              <DetailProfile/>
            </Route>
            <Route path = "/technophiles">
              <Technophiles/>
            </Route>
            <Route exact path ='/'>
              <LandingPage route={route}/>
            </Route>
            <Route exact path ='/*'>
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      )
  }
}

export default withRouter(App);
