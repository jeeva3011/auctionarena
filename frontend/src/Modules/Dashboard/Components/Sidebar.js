import React from 'react';
import SidebarStyle from '../styles/Sidebar.module.css';
import { TfiMenu } from 'react-icons/tfi';
import { RiDashboardLine } from 'react-icons/ri';
import { FaPlus, FaList, FaSearch} from 'react-icons/fa';
import logo from '../../../assets/logo-white.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed? false: true);

  const toggleHandler = () => {
   if(isExpanded){
    setIsExpanded(false);
    localStorage.setItem('sidebar-collapsed',true);
    return;
   } 
    setIsExpanded(true);
    localStorage.removeItem('sidebar-collapsed');
   
  };
  return (
    <div
      className={
        isExpanded
          ? SidebarStyle.sidebar
          : SidebarStyle.sidebar + ' ' + SidebarStyle.collapsed
      }
    >
      <div className={SidebarStyle.header}>
        <TfiMenu
          data-testid = 'menu'
          className={SidebarStyle.icon}
          onClick={toggleHandler}
          title='Menu'
        />
        <img className={SidebarStyle.logo} src={logo} alt='logo' />
      </div>
      <div className={SidebarStyle.items}>
        <Link  to='/dashboard'  className={SidebarStyle.item} >
          <RiDashboardLine className={SidebarStyle.icon} title='Dashboard' />
          <span className={SidebarStyle.text}>Dashboard</span>
        </Link>
        <Link  to='/dashboard/createauction' className={SidebarStyle.item}>
          <FaPlus className={SidebarStyle.icon} title='Create Auction' />
          <span className={SidebarStyle.text}>Create Auction</span>
        </Link>
        <Link to='/dashboard/myauction' className={SidebarStyle.item}>
          <FaList className={SidebarStyle.icon} title='My Auction' />
          <span className={SidebarStyle.text}>My Auction</span>
        </Link>
        <Link to='/dashboard/findauction' className={SidebarStyle.item}>
          <FaSearch className={SidebarStyle.icon} title='Find Auction' />
          <span className={SidebarStyle.text}>Find Auction</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
