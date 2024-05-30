import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  rendersubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })
      this.setState({isError: false, username: '', password: ''})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({isError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {isError, errorMsg, username, password} = this.state
    return (
      <div className="login_Container">
        <form className="loginCardContainer" onSubmit={this.rendersubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website_logo"
          />
          <label htmlFor="UserName" className="label">
            USERNAME
          </label>
          <input
            id="UserName"
            value={username}
            className="inputfield"
            type="text"
            placeholder="Username"
            onChange={this.changeUserName}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            id="password"
            value={password}
            className="inputfield"
            type="password"
            placeholder="Password"
            onChange={this.changePassword}
          />
          <button type="submit" className="loginBtn">
            Login
          </button>
          {isError && <p className="error_msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
