import './index.css'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

class JobItemDetails extends Component {
  state = {apistatus: 'LOADING', jobDetails: [], similarJobs: []}

  componentDidMount() {
    this.renderJobsApiCalls()
  }

  renderJobsApiCalls = async () => {
    this.setState({apistatus: 'LOADING'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const JwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: data.job_details.title,
      }
      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        similarJobs: updatedSimilarJobs,
        jobDetails: updatedJobDetails,
        apistatus: 'SUCCESS',
      })
    } else {
      this.setState({apistatus: 'FAILURE'})
    }
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    console.log(similarJobs)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <>
        <div className="JobItemDetails_Cardcontainer">
          <div className="companyLogoContainer">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="companyLogo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="ratingContainer">
                <AiFillStar className="ratingicon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-package_Container">
            <div className="location-employment_Container">
              <div className="Icon_Container">
                <IoLocationSharp className="icon" />
                <p className="icon_para">{location}</p>
              </div>
              <div className="Icon_Container">
                <BsFillBriefcaseFill className="icon" />
                <p className="icon_para">{employmentType}</p>
              </div>
            </div>
            <p className="packagePerAnnum">{packagePerAnnum}</p>
          </div>
          <hr className="horizontalBreakLineEl" />
          <div>
            <div className="description_LinkContainer">
              <h1 className="Description_heading">Description</h1>
              <a href={companyWebsiteUrl} className="linkEl">
                Visit
                <FiExternalLink className="linkIcon" />
              </a>
            </div>
            <p className="Description_para">{jobDescription}</p>
          </div>
          <div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skillsListContainer">
              {skills.map(eachItem => (
                <li className="skillsList_item" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skillsList_image"
                  />
                  <p className="skillsList_para">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="lifeAtCompany_heading">Life at Company</h1>
            <div className="lifeAtCompany_image_para_container">
              <p className="lifeAtCompany_para">{lifeAtCompany.description}</p>
              <img
                className="lifeAtCompany_image"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div className="similarJobsContainer">
          <h1 className="SimilarJobs_heading">Similar Jobs</h1>
          <ul className="similarJobsListContainer">
            {similarJobs.map(eachItem => (
              <SimilarJobs key={eachItem.id} similarJobs={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
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

  renderJobStatus = () => {
    const {apistatus} = this.state
    switch (apistatus) {
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
      <div className="JobItemDetails_container">
        <Header />
        {this.renderJobStatus()}
      </div>
    )
  }
}

export default JobItemDetails
