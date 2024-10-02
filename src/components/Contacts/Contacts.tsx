import { useTranslation } from 'react-i18next';
import AboutForm from '../About/AboutForm/AboutForm'
import { NavLink } from 'react-router-dom'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { contacts } from '../../data/data'
import useCustomContext from '../../hooks/useCustomContext'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from 'react'
import { Collapse, Tooltip } from '@mui/material'
import { m } from 'framer-motion'
import { cardVariants } from '../../variants/variants'

const Contacts = () => {

	const { t } = useTranslation()
	const {isAuth, setPath} = useCustomContext()
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		setTimeout(() => setIsOpen(true), 700)
		return () => setIsOpen(false)
	}, [])

	return (<section className='contacts about'>
				<div className="bread">
					<NavLink to={'/'}>{t('MAIN')}</NavLink>
					<RiArrowDropRightLine />
					<span>{t('Контакты')}</span>
				</div>
				<h2>{t('Контакты')}</h2>
				<div className='contacts__body'>
					{contacts.map(info => <m.div
												variants={cardVariants}
												initial="offscreen"
												whileInView="onscreen"
												viewport={{ once: false, amount: 0.8 }}
												key={info.id} className='contacts__body-contact'>
												<h4>{t(info.title)}</h4>
												{info.option === 'phone' && <div className='contacts__body-contact-phone'>
													{isAuth
													? <a title={t('phone')} href={`tel:${info.body}`}>{info.body}</a>
													: <p>{info.body.slice(0, 9) + '****'}</p>}
													{!isAuth && <Tooltip title={t('look')}><NavLink onClick={() => setPath('/contacts')} to={'/login'}><RemoveRedEyeIcon className='icon' color='disabled' /></NavLink></Tooltip> }
												</div>}
												{info.option === 'email' && <a href={`mailto:${info.body}`}>{info.body}</a>}
												{info.option === 'git' && <a target='_blank' href={`https://github.com/${info.body}`}>{info.body}</a>}
												{!info.option && <p>{t(info.body)}</p>}
										</m.div>)}
				</div>
				<Collapse in={isOpen}>
					<div className='contacts__map'>
						<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d72899.76321344051!2d30.20125290867904!3d55.18121276638762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sus!4v1721510441010!5m2!1sru!2sus" loading="lazy" ></iframe>
					</div>
            	</Collapse>
				<AboutForm />
			</section>);
}
export default Contacts;