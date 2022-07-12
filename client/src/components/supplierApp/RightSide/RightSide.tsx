import React from 'react'
import CustomerReview from '../CustomerReview/CustomerReview'
import Updates from '../Updates/Updates'
import './RightSide.css'

const RightSide = () => {
  return (
    <div className="RightSide">
        <div>
            <h3 className='dashboard-heading'>Updates</h3>
            <Updates />
        </div>
        {/* <div>
            <h3 className='dashboard-heading'> Customer Review</h3>
            <CustomerReview />
        </div> */}
    </div>
  )
}

export default RightSide