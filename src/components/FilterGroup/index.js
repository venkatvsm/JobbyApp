import './index.css'
// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const renderEmploymentList = () => {
    const {onChangeEmploymentTrigger} = props
    return employmentTypesList.map(eachItem => {
      const onChangeEmployment = () => {
        onChangeEmploymentTrigger(eachItem.employmentTypeId)
      }
      return (
        <li key={eachItem.employmentTypeId} className="employment-list">
          <input
            value={eachItem.employmentTypeId}
            type="checkbox"
            id={eachItem.employmentTypeId}
            onChange={onChangeEmployment}
          />
          <label htmlFor={eachItem.employmentTypeId} className="label">
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1 className="employment-heading">Type Of Employment</h1>
      <ul className="employment-list-Container">{renderEmploymentList()}</ul>
    </>
  )

  const renderSalaryList = () => {
    const {onChangeSalaryRangeTrigger, activesalaryRange} = props
    return salaryRangesList.map(eachItem => {
      const onChangeSalary = () => {
        onChangeSalaryRangeTrigger(eachItem.salaryRangeId)
      }
      const isChecked = activesalaryRange === eachItem.salaryRangeId
      return (
        <li className="employment-list" key={eachItem.salaryRangeId}>
          <input
            id={eachItem.salaryRangeId}
            type="radio"
            name="SalaryRange"
            checked={isChecked}
            onChange={onChangeSalary}
          />
          <label htmlFor={eachItem.salaryRangeId} className="label">
            {eachItem.label}
          </label>
        </li>
      )
    })
  }
  const renderSalaryRangeTypes = () => (
    <>
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="employment-list-Container">{renderSalaryList()}</ul>
    </>
  )

  return (
    <div className="filtersContainer">
      {renderEmploymentTypes()}
      <hr className="horizontalBreakLine" />
      {renderSalaryRangeTypes()}
    </div>
  )
}
export default FilterGroup
