import React, { useState } from 'react'
import { DashboardCardProps } from '../../common/interfaces/Interfaces';
import { CircularProgressbar } from 'react-circular-progressbar';
import { motion, AnimateSharedLayout } from "framer-motion";
import 'react-circular-progressbar/dist/styles.css'
import './BasicCard.css'
import { MdOutlineCancelPresentation } from 'react-icons/md';
import Chart from 'react-apexcharts';


// type Props = {};


const BasicCard = (props: any) => {
    const [expanded, setExpanded] = useState(false);

  return (
        <AnimateSharedLayout>
        {
            expanded ? (
                <ExpandedCard param={props} setExpanded={()=> setExpanded(false)} />
            ) : ( 
            <CompactCard param={props} setExpanded={()=> setExpanded(true)} /> 
            )
        }
        </AnimateSharedLayout>
  )
}


function CompactCard (props: any){
    const Png = props.param.png;
    return (
        <motion.div className="CompactCard"
        style={{
            background: props.param.color.background,
            boxShadow: props.param.color.boxShadow
        }}
        onClick={props.setExpanded}
        layoutId="expandableCard"
        >
            <div className="radialBar">
                <CircularProgressbar value={props.param.barValue} text={`${props.param.barValue}%`}/>
                <span>{props.param.title}</span>
            </div>
            <div className="detail">
                <Png />
                <span> ${props.param.value}</span>
                <span>Last 24 hours</span>
            </div>
        </motion.div>
    )
}

function ExpandedCard (props: any) {
    const data: any = {
        options: {
          chart: {
            type: "area",
            height: "auto",
          },

          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.35,
          },

          fill: {
            colors: ["#fff"],
            type: "gradient",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            colors: ["white"],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: true,
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z",
            ],
          },
        },
    };

    return (
        <motion.div className="ExpandedCard" 
    style={{  
        background: props.param.color.background, 
        boxShadow: props.param.color.boxShadow 
    }}
    layoutId="expandableCard"
    >
        <div style={{
                alignSelf: 'flex-end',
                cursor: 'pointer',
                color: 'white',
            }}>
            <MdOutlineCancelPresentation onClick={props.setExpanded} />
            
        </div>
        <span>{props.param.title}</span>
        <div className="chartContainer">
            
            <Chart options={data.options} series={props.param.series} type="area" />
        </div>
        <span>Last 24 hours</span>
    </motion.div>
    )
    
}

export default BasicCard