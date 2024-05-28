import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobs
  return (
    <li className="similarJobs_listItems">
      <div className="companyLogoContainer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <div>
        <h1 className="Description_heading">Description</h1>
        <p className="Description_para">{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobs
