import { Button } from '@mui/material'
import pc from './../../../assets/main/pc.png'
import { useTranslation } from 'react-i18next';
import useCustomContext from '../../../hooks/useCustomContext'
import { useNavigate } from 'react-router-dom'
import { scrollToTop, scrollToTopCallBack } from '../../../utils/utils'
import { m } from "framer-motion";
import { cardVariants, cardVariants2, variantDuration } from '../../../variants/variants'
import { useCallback } from 'react'

const MainLogin = () => {

	const { t } = useTranslation();
	const {isAuth, setPath} = useCustomContext()
	const navigate = useNavigate()

	const reditectToCorrectPage = useCallback(() => {
		scrollToTop()
		if(isAuth) scrollToTopCallBack(navigate('/catalog'))
		else {
			setPath('/catalog')
			scrollToTopCallBack(navigate('/login'))
		}
	}, [])

  return (<section className='main__page-login'>
				<div className='main__page-login-info'>
					<m.h2
						variants={cardVariants}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ once: true, amount: 0.8 }}
					>{t('mainLoginTitle')}</m.h2>
					<m.p
						variants={variantDuration}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ once: true, amount: 0.8 }}
					>{t('mainLoginText')}</m.p>
					<Button onClick={reditectToCorrectPage} color="success" size='large' variant="contained">{isAuth ? t('Каталог') : t('sign in')}</Button>
				</div>
				<m.div
					variants={cardVariants2}
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.8 }}
				className='main__page-login-picture'>
					<img src={pc} alt='pc' />
				</m.div>
    	  </section>);
}
export default MainLogin;