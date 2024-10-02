import {useEffect} from 'react';
import AboutVideo from "./AboutVideo/AboutVideo.tsx";
import AboutOffer from "./AboutOffer/AboutOffer.tsx";
import AboutForm from "./AboutForm/AboutForm.tsx";
import { useTranslation } from 'react-i18next';
import { RiArrowDropRightLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import AboutCompany from './AboutCompany/AboutCompany.tsx'

const About = () => {

    useEffect(() => console.clear(), [])
    const { t } = useTranslation()

    return (
    <section className='about'>
        <div className="bread">
            <NavLink to={'/'}>{t('MAIN')}</NavLink>
            <RiArrowDropRightLine />
            <span>{t('О компании')}</span>
				</div>
        <AboutVideo />
        <AboutCompany />
        <AboutOffer />
        <AboutForm />
    </section>
  );
}
export default About;
