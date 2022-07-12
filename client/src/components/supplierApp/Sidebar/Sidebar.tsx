import React, { useState } from 'react'
import './Sidebar.css';
import logo from './../../../assets/logo.png';
import { SidebarData } from './SidebarData';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { MdOutlineMenu } from 'react-icons/md';
import { motion } from 'framer-motion'
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuthState from "../../../zustand/useAuthState";
import axiosInstance from '../../../api/axios';

// interface NabBarProps {
//   user: any;
//   onLogout: () => void;
// }


const Sidebar = (props: any) => {
    const history = useHistory();
    const user = useAuthState((state: any) => state.user);
    const setUser = useAuthState((state: any) => state.setUser);

    const handleLogout = async () => {
        try {
          //delete jwt cookie from browser
          await axiosInstance.get("/users/logout");
          setUser(null);
          history.push("/");
        } catch (error) {
          console.log(error);
        }
    };

    //const [selected, setSelected] = useState(0);
    const location = useLocation();
    const [expanded, setExpanded] = useState(true);
    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }

  return (
    <>
        <div className='bars' 
        style={expanded ? {left: '60%'} : {left: '5%'}}
        onClick={() => setExpanded(!expanded)}
        >
                <MdOutlineMenu />
        </div>
        <motion.div className='Sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth<=768 ? `${expanded}` : ''}
        >
            <div className='s-logo'>
                <img src={logo} alt="Rentd Logo" />
                <span>Rentd</span>
            </div>
        <div className="s-menu">
            {SidebarData.map((item: any, index: any) => {
                return (
                    <div className={location.pathname === item.path ? 'menuItem s-active' : 'menuItem'} key={index}>
                        <Link to={item.path} className="s-menu-item" style={{ textDecoration: "none" }}>
                            <item.icon className="s-icon"/>
                            <span>{item.heading}</span>
                        </Link>
                    </div>
                )
            })}
            <div className="menuItem" onClick={handleLogout}>
                <RiLogoutCircleRLine/>
                <span>Logout</span>
            </div>
        </div>
        </motion.div>
    </>
  )
}

export default Sidebar