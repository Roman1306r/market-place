import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../../utils/utils'
import logo from './../../../assets/logoWhite.png'

const CeilingFooter = () => {

    const {t} = useTranslation();

    return (<div className='footer__ceiling'>
                <div>              
                    <img src={logo} width={200} alt='logo' />
                    <div>Email: <a href='mailto:ivanovroc@gmail.com'>ivanovroc@gmail.com</a></div>
                </div>
                <div>
                    <h3>{t('byClients')}</h3>
                    <NavLink onClick={scrollToTop} to={'/catalog'}>{t('Каталог')}</NavLink>
                    <NavLink onClick={scrollToTop} to={'/catalog'}>{t('popular')}</NavLink>
                    <NavLink onClick={scrollToTop} to={'/catalog'}>{t('bestWeek')}</NavLink>
                </div>
                <div>
                    <h3>{t('О компании')}</h3>
                    <NavLink onClick={scrollToTop} to={'/contacts'}>{t('Контакты')}</NavLink>
                    <NavLink onClick={scrollToTop} to={'/posts'}>{t('postsOf')}</NavLink>
                    <NavLink onClick={scrollToTop} to={'/clients'}>{t('Клиенты')}</NavLink>
                </div>
                <div>
                    <h3>{t('basicInfo')}</h3>
                    <NavLink onClick={scrollToTop} to={'/login'}>{t('auth')}</NavLink>
                    <NavLink onClick={scrollToTop} to={'/'}>{t('info')}</NavLink> 
                    <NavLink onClick={scrollToTop} to={'/delivery'}>{t('delivery')}</NavLink> 
                </div>
            </div>);
}
export default CeilingFooter;