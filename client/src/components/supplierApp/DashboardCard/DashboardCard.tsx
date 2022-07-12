import React from 'react'
import { DashboardCardProps } from '../../common/interfaces/Interfaces';
import BasicCard from '../BasicCard/BasicCard';
import './DashboardCard.css';
import { DashboardCardData } from './DashboardCardData';

const DashboardCard = () => {
  return (
    <div className='DashboardCard'>
        {DashboardCardData.map((card: any, id)=> {
            return (
                <div className='cardParentContainer' key={id}>
                    <BasicCard 
                    title={card.title}
                    color={card.color}
                    barValue={card.barValue}
                    value={card.value}
                    png={card.png}
                    series={card.series} />
                </div>
            )
        })}
    </div>
  )
}

export default DashboardCard