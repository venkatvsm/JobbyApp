import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobItems = props => {
  const {jobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
  } = jobsDetails
  return (
    <li className="jobs-listContainer">
      <Link to={`/jobs/${id}`} className="jobsItem_link">
        <div className="companyLogoContainer">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="Description_heading">Description</h1>
          <p className="Description_para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobItems
