import { RiArrowDropRightLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { delivery } from '../../data/data'
import { useTranslation } from 'react-i18next'

const Deliveriies = () => {

	const { t } = useTranslation();

	return (<section className='delivery'>
				<div className="bread">
					<NavLink to={'/'}>{t('MAIN')}</NavLink>
                    <RiArrowDropRightLine />
                    <span>{t('delivery')}</span>
				</div>
				<h1>{t('delivery')}</h1>
				<p>{t('pickup')} - {t('vtb')} (8.00 - 19.00 {t('monFri')})</p>
				<p>{t('deliveryTime')}</p>
				<div className='delivery__body'>
					{delivery.map(item => <div className='delivery__body-item' key={item.id}>
												<div>{t(item.langTitle)}</div>
												<div>{typeof item.sum1 === 'number' ? item.sum1 + ' $' : t(item.sum1)}</div>
												<div>{typeof item.sum2 === 'number' ? item.sum2 + ' $' : t(item.sum2)}</div>
												<div>{t(item.sum3)}</div>
											</div>)}
				</div>
			</section>);
}
export default Deliveriies;