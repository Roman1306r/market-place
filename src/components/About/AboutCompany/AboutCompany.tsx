import { useTranslation } from 'react-i18next';
import { main } from '../../../data/data'
import logo from './../../../assets/logo.png'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { scrollToTopCallBack } from '../../../utils/utils'
import { m } from 'framer-motion'
import { cardVariants, cardVariants2, variantDuration } from '../../../variants/variants'

const AboutCompany = () => {

	const { t } = useTranslation();
	const navigate = useNavigate()

	return (
		<article className='about__info'>
			<m.img
				variants={cardVariants}
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ once: true, amount: 0.8 }}
				style={{maxWidth: '100%'}} width={200} src={logo} alt='about' 
			/>
			<m.h2
				variants={cardVariants}
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ once: true, amount: 0.8 }}
			>{t('aboutTitleInfo')}</m.h2>
			<m.h5
				variants={variantDuration}
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ once: true, amount: 0.8 }}
			>{t('aboutTextInfo')}</m.h5>
			<m.div
				variants={cardVariants2}
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ once: true, amount: 0.8 }}
			className='about__info-blocks'>
				{main.aboutInfo.map(info => <div key={info.id}>
												<h3>{info.num}</h3>
												<p>{t(info.langId)}</p>
											</div>)}
			</m.div>
			<Button onClick={() => scrollToTopCallBack(navigate('/catalog'))} size='large' variant="contained" color="success">{t('Каталог')}</Button>
		</article>
	);
}
export default AboutCompany;