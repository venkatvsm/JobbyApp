import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navBar">
      <div className="nav_cardContainer">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav_website_logo"
          />
        </Link>
        <ul className="nav_listContainer">
          <li className="nav_link_lg">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="nav_link_sm">
            <Link to="/" className="link">
              <AiFillHome />
            </Link>
          </li>
          <li className="nav_link_lg">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
          <li className="nav_link_sm">
            <Link to="/jobs" className="link">
              <BsFillBriefcaseFill />
            </Link>
          </li>
          <li>
            <button
              className="logout_button_sm"
              onClick={onClickLogoutBtn}
              aria-label="log out"
              type="button"
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="logout_button_lg"
          onClick={onClickLogoutBtn}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
