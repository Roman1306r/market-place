import { Alert, Button, ButtonGroup, Chip, Collapse, Radio } from '@mui/material'
import { delivery } from '../../../data/data'
import { useTranslation } from 'react-i18next'
import { scrollToTopCallBack } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'
import useCustomContext from '../../../hooks/useCustomContext'
import { useEffect, useState } from 'react'
import { MoveLeft, MoveRight, ShoppingCart } from 'lucide-react'

const Delivery = () => {
	
	const { t } = useTranslation();
	const navigate = useNavigate()
	const {toPayment, setToPayment} = useCustomContext()
	const [selectedValue, setSelectedValue] = useState('a');
	const [sum, setSum] = useState(0);
	const [isChecked, setIsChecked] = useState(true);
	const letters = {
		lower: 'abcdefghij',
		upper: 'ABCDEFGHIJ'
	}

	useEffect(() => {
		if(toPayment.products.length === 1 && !toPayment.products[0].amount) setSum(Number(toPayment.products.reduce((cur, acc) =>  cur + acc.price, 0).toFixed(2)))
		else setSum(Number(toPayment.products.reduce((cur, acc) =>  cur + (acc.price * acc.amount), 0).toFixed(2)))
		window.addEventListener('load', () => toPayment.products.length < 1 ? scrollToTopCallBack(navigate('/basket')) : false)
	}, [])

	function returnToBack() {
		setToPayment({products: [], delivery: ''})
		scrollToTopCallBack(navigate('/basket'))
	}
	
	function nextStep() {
		if(selectedValue === 'a' || selectedValue === 'b') return setIsChecked(false)
		scrollToTopCallBack(navigate('/basket/delivery/payment'))
		switch (selectedValue) {
			case 'c':
				setToPayment({...toPayment, delivery: sum < 300 ? 25 : 'free' })
				break;
			case 'd':
			case 'e':
			case 'f':
				setToPayment({...toPayment, delivery: sum < 300 ? 50 : sum > 1000 ? 'free' : 30 })
				break;
			case 'g':
			case 'h':
				setToPayment({...toPayment, delivery: sum < 300 ? 70 : sum > 1000 ? 'free' : 50 })
				break;
			case 'i':
				setToPayment({...toPayment, delivery: 'free'})
				break;	
			default:
				setToPayment({...toPayment, delivery: 'free'})			
		}
	}

	return (<div className='basket__delivery'>
				<h2>{t('delivery')}</h2>
				<p>{toPayment.products.length === 1 
					?  <Chip component={'span'} sx={{padding: '20px'}}  avatar={<ShoppingCart color='white' />} label={toPayment.products.length + t('oneGood') + Number(sum) + ' $' } color="success" /> 
					:  <Chip component={'span'} sx={{padding: '20px'}} avatar={<ShoppingCart color='white' />} label={toPayment.products.length + t('manyGoods') + Number(sum) + ' $' } color="success" />}</p>
				<p>{t('deliveryTime')}</p>
				<p>{t('pickup')} - {t('vtb')} (8.00 - 19.00 {t('monFri')})</p>
				<div className='basket__delivery__body'>
					<div className='basket__delivery__body-item'>
									<div></div>
									<div>{t('zoneDelivery')}</div>
									<div>{t('to300')}</div>
									<div>{t('from300to1000')}</div>
									<div>{t('from1000')}</div>
					</div>
					{delivery.slice(1).map(item => <div className='basket__delivery__body-item' key={item.id}>
												<div><Radio
														color='success'
														checked={selectedValue === letters.lower[item.id]}
														onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedValue(event.target.value)}		
														value={letters.lower[item.id]}
														name="radio-buttons"
														inputProps={{ 'aria-label': letters.upper[item.id] }}
												/></div>
												<div>{t(item.langTitle)}</div>
												<div className={sum < 300 && selectedValue === letters.lower[item.id] ? 'active' : ''}>{typeof item.sum1 === 'number' ? item.sum1 + ' $' : t(item.sum1)}</div>
												<div className={sum >= 300 && sum < 1000 && selectedValue === letters.lower[item.id] ? 'active' : ''}>{typeof item.sum2 === 'number' ? item.sum2 + ' $' : t(item.sum2)}</div>
												<div className={sum > 1000 && selectedValue === letters.lower[item.id] ? 'active' : ''}>{t(item.sum3)}</div>
											</div>)}
				</div>
				<Collapse sx={{margin: '20px 0'}} in={!isChecked}>
					<Alert variant="filled" severity="error">{t('validationDelivery')}</Alert>
				</Collapse>
				<ButtonGroup size='large' fullWidth variant="contained" color='success' aria-label="Basic button group">
					<Button sx={{gap: '20px'}} onClick={returnToBack}><MoveLeft /> {t('basket')}</Button>
					<Button sx={{gap: '20px'}} onClick={nextStep}>{t('continue')} <MoveRight size={20} /></Button>
				</ButtonGroup>
			</div>);
}
export default Delivery;