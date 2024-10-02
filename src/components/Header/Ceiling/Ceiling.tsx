import { useState } from 'react';
import { RiUserLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Heart, ShoppingCart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../hooks/use-localstorage';
import useCustomContext from '../../../hooks/useCustomContext';
import Popover from '@mui/material/Popover';
import CloseIcon from '@mui/icons-material/Close';
import { Badge, Tooltip } from '@mui/material'
import { scrollToTopCallBack } from '../../../utils/utils'
import { StyledBadge } from './StyledBadge'

const Header = () => {

    const {isAuth, basket, favorite, admin} = useCustomContext()
    const navigate = useNavigate()
    const [popup, setPopup] = useState<HTMLSpanElement | null>(null)
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    const open = Boolean(popup);
    const id = open ? 'simple-popover' : undefined;

    function setEnglish() {
        i18n.changeLanguage('en');
        setLanguage('en');
        setPopup(null)
    }
    function setRussian() {
        i18n.changeLanguage('ru');
        setLanguage('ru');
        setPopup(null)
    }

    return (<div className='header__ceiling'>
                <div style={{backgroundColor: popup ? '#2fcc6e' : ''}} className='header__language'>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={popup}
                        onClose={() => setPopup(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div className='header__ceiling-language-modal'>
                            <h4>{t('changeLan')}</h4>
                            <p>EN | <span onClick={setEnglish}>{t('eng')}</span></p>
                            <p>RU | <span onClick={setRussian}>{t('rus')}</span></p>
                            <CloseIcon onClick={() => setPopup(null)} className='icon' color='disabled' />
                        </div>
                    </Popover>
                    <Tooltip title={t('changeLan')}>
                        <span className='header__ceiling-language-btn' onClick={(event) => setPopup(event.currentTarget)} aria-describedby={id} >{language === 'en' ? 'EN' : 'RU' }</span>
                    </Tooltip>  
                </div>
                <Tooltip title={t('basket')}>
                    <div onClick={() => navigate('/basket')} className='header__ceiling-basket'> 
                        {!!basket.length && isAuth && <Badge sx={{fontSize: '0.5rem'}} max={5} badgeContent={basket.length} color="success"><ShoppingCart size={20} /></Badge>}
                        {!basket.length && !isAuth && <ShoppingCart size={20} />} 
                        {!basket.length && isAuth && <ShoppingCart size={20} />} 
                        {!!basket.length && !isAuth && <ShoppingCart size={20} />} 
                    </div>  
                </Tooltip>
                <Tooltip title={t('search')}>
                    <div onClick={() => navigate('/catalog/search')} className='header__ceiling-search'><FiSearch/></div>
                </Tooltip>
                <Tooltip title={t('favorite')}>
                    <div onClick={() => scrollToTopCallBack(navigate('/favorits'))} className='header__ceiling-favorits'>{!favorite.length ? <Heart size={20} /> : isAuth ? <Badge sx={{fontSize: '0.5rem'}} max={5} badgeContent={favorite.length} color="success"><Heart  size={20} /></Badge> : <Heart size={20} />}</div>
                </Tooltip>
                <div className='header__ceiling-profile'>
                    <NavLink to='/login'>
                        {isAuth 
                            ? <>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <img width={20} src={admin.image} alt='ava' />
                                </StyledBadge>
                                <span className='header__ceiling-profile-text'>{admin.firstName}</span>
                              </>
                            : <>
                                <span className='header__ceiling-profile-text'>{t('sign in')}</span> <RiUserLine/>
                              </>}
                    </NavLink>
                </div>      
            </div>);
}
export default Header;