import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <div className="notFoundCardContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notFoundImage"
      />
      <h1 className="notFound_heading">Page Not Found</h1>
      <p className="notFound_para">
        We are sorry the you requested could not be found.
      </p>
    </div>
  </div>
)
export default NotFound
