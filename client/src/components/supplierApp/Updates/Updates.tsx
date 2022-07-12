import React from 'react'
import './Updates.css'
import { UpdatesData } from './UpdatesData'

const Updates = () => {
  return (
    <div className="Updates">
        {UpdatesData.map((update, id)=>{
            return (
                <div className="update" key={id}>
                    <div className="noti">
                        <div style={{marginBottom: '0.5rem'}}>
                        <span>{update.noti} </span>
                        <span>{update.time}</span> 
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Updates
