import info from './../../../assets/main/info.jpg'
import { useTranslation } from 'react-i18next';
import { m } from "framer-motion";
import { cardVariants } from '../../../variants/variants'

const MainInfo = () => {

	const { t } = useTranslation();
	
	return (<section className='main__page-info'>
				<h2>{t('mainInfo')}</h2>
				<div className='main__page-info-body'>
					<div className='main__page-info-body-picture'>
						<img src={info} alt='info' />
					</div>
					<div className='main__page-info-body-text'>
							<m.h3
								variants={cardVariants}
								initial="offscreen"
								whileInView="onscreen"
								viewport={{ once: true, amount: 0.8 }}
							>{t('mainInfoTitle')}</m.h3>
							<m.p
								variants={cardVariants}
								initial="offscreen"
								whileInView="onscreen"
								viewport={{ once: true, amount: 0.8 }}
							>{t('mainInfoText')}</m.p>
							<m.h3
								variants={cardVariants}
								initial="offscreen"
								whileInView="onscreen"
								viewport={{ once: true, amount: 0.8 }}
							>{t('mainInfoTitleService')}</m.h3>
							<m.p
								variants={cardVariants}
								initial="offscreen"
								whileInView="onscreen"
								viewport={{ once: true, amount: 0.8 }}
							>{t('mainInfoTextService')}</m.p>
					</div>
				</div>	
			</section>);
}
export default MainInfo;