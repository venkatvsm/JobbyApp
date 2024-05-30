import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import FilterGroup from '../FilterGroup'
import JobItems from '../JobItems'

class Jobs extends Component {
  state = {
    profileApiStatus: 'LOADING',
    profileDetails: [],
    activeTypeOfEmployement: [],
    activesalaryRange: '',
    searchInput: '',
    jobsApiStatus: 'LOADING',
    jobsDetails: [],
  }

  componentDidMount() {
    this.renderJobsList()
    this.renderprofileDetails()
  }

  renderprofileDetails = async () => {
    this.setState({profileApiStatus: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails: updatedData, profileApiStatus: 'SUCCESS'})
    } else {
      this.setState({profileApiStatus: 'FAILURE'})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.renderJobsList()
  }

  SearchBarContainer = screen => {
    const {searchInput} = this.state
    return (
      <div className="SearchBarContainer" id={`${screen}`}>
        <input
          type="search"
          value={searchInput}
          className="searchInput"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          aria-label="search"
          className="searchBtn"
          data-testid="searchButton"
          onClick={this.onClickSearchBtn}
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  onClickprofileRetryBtn = () => {
    this.renderprofileDetails()
  }

  onChangeEmploymentTrigger = id => {
    const {activeTypeOfEmployement} = this.state
    if (activeTypeOfEmployement.includes(id)) {
      const updated = activeTypeOfEmployement.filter(
        eachItem => eachItem !== id,
      )
      this.setState({activeTypeOfEmployement: updated}, this.renderJobsList)
    } else {
      this.setState(
        {activeTypeOfEmployement: [...activeTypeOfEmployement, id]},
        this.renderJobsList,
      )
    }
  }

  onChangeSalaryRangeTrigger = id => {
    this.setState({activesalaryRange: id}, this.renderJobsList)
  }

  renderSideBar = () => {
    const {profileApiStatus, profileDetails, activesalaryRange} = this.state
    return (
      <div className="sideBarContainer">
        {this.SearchBarContainer('smallsize')}
        <Profile
          profileApiStatus={profileApiStatus}
          profileDetails={profileDetails}
          onClickprofileRetryBtn={this.onClickprofileRetryBtn}
        />
        <hr className="horizontalBreakLine" />
        <FilterGroup
          onChangeEmploymentTrigger={this.onChangeEmploymentTrigger}
          onChangeSalaryRangeTrigger={this.onChangeSalaryRangeTrigger}
          activesalaryRange={activesalaryRange}
        />
      </div>
    )
  }

  renderJobsList = async () => {
    const {activesalaryRange, activeTypeOfEmployement, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeTypeOfEmployement.join(
      ',',
    )}&minimum_package=${activesalaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        jobDescription: eachItem.job_description,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsDetails: updatedData, jobsApiStatus: 'SUCCESS'})
    } else {
      this.setState({jobsApiStatus: 'FAILURE'})
    }
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsDetails} = this.state
    if (jobsDetails.length === 0) {
      return (
        <div className="failureContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure_image"
          />
          <h1 className="failure_heading">No Jobs Found</h1>
          <p className="failure_para">
            We Could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobsList-Container">
        {jobsDetails.map(eachItem => (
          <JobItems key={eachItem.id} jobsDetails={eachItem} />
        ))}
      </ul>
    )
  }

  onClickRetryBtn = () => {
    this.renderJobsList()
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure_image"
      />
      <h1 className="failure_heading">Oops! Something Went Wrong</h1>
      <p className="failure_para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure_btn"
        type="button"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div className="jobscontainer">
        <Header />
        <div className="jobs-cardContainer">
          {this.renderSideBar()}
          <div className="jobsResultContainer">
            {this.SearchBarContainer('largesize')}
            {this.renderJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
