import './index.css'
import Loader from 'react-loader-spinner'

const Profile = props => {
  const {profileApiStatus, profileDetails, onClickprofileRetryBtn} = props
  const retryBtnTrigger = () => {
    onClickprofileRetryBtn()
  }
  const renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  const renderSuccessView = () => {
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="Profilecontainer">
        <img src={profileImageUrl} alt="profile" className="profileImageUrl" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-shortBio">{shortBio}</p>
      </div>
    )
  }
  const renderFailureView = () => (
    <div className="ProfileFailureContainer">
      <button type="button" className="RetryBtn" onClick={retryBtnTrigger}>
        Retry
      </button>
    </div>
  )
  switch (profileApiStatus) {
    case 'LOADING':
      return renderLoadingView()
    case 'SUCCESS':
      return renderSuccessView()
    default:
      return renderFailureView()
  }
}
export default Profile
