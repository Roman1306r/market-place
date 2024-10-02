import { navHeader } from '../../../data/data';
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import logo from './../../../assets/logo.png'
import { Tooltip } from '@mui/material'

const Floor = () => {

    const { t } = useTranslation();
    
    return (<div className='header__floor'>
                <div className='header__floor-logo'><Tooltip title={t('MAIN')}><NavLink to='/'><img width={100} src={logo} alt='logo' /></NavLink></Tooltip></div>
                <div></div>
                <nav className='header__floor-menu'>
                    {navHeader.map(item => <NavLink className={({ isActive }) => isActive ? "active" : ""}  key={item.id} to={item.link}><span>{t(item.title)}</span></NavLink> )}
                </nav>
            </div>);
}
export default Floor;