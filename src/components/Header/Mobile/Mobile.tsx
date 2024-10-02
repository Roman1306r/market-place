import { navHeader } from '../../../data/data';
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useState } from 'react'
import { Collapse } from '@mui/material'

const Mobile = () => {

    const { t } = useTranslation();
	const [isExpanted, setIsExpanted] = useState(false)
    
    return (<div className='header__mobile'>
				<div onClick={() => setIsExpanted(!isExpanted)} className='header__mobile-icon'>
					<div className={isExpanted ? "header__mobile-icon-burger active" : "header__mobile-icon-burger"}>
						<div className="rect"></div>
						<div className="rect"></div>
						<div className="rect"></div>
					</div>
				</div>
				<Collapse in={isExpanted}>
					<nav className='header__mobile-menu'>
						{navHeader.map(item => <NavLink onClick={() => setIsExpanted(false)} className={({ isActive }) => isActive ? "active" : ""}  key={item.id} to={item.link}><span>{t(item.title)}</span></NavLink> )}
					</nav>
				</Collapse>
            </div>);
}
export default Mobile;