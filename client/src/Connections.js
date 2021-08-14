import axios from "axios"

const myaxios = axios.create()

myaxios.defaults.baseURL = "https://hitansh-technobar.herokuapp.com/"
// let setIsLoggedIn

// const stateTransfer = (setState) => {
//     setIsLoggedIn = setState
// }

const authorize = function(authToken, refreshToken, setIsLoggedIn) {
    myaxios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    myaxios.defaults.headers.common['refreshToken'] = refreshToken
    return setIsLoggedIn(true)
}

const refreshToken = async function(prevCall, setIsLoggedIn) {
    try {
      const res = await myaxios({
        method: 'get',
        url: 'api/users/refreshToken',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res)
      authorize(res.data.authToken, res.data.refreshToken, setIsLoggedIn)
      prevCall()

    } catch(e) {
      console.log(e.response)
    }
  }

export {
    authorize,
    refreshToken,
    // stateTransfer,
    myaxios
}