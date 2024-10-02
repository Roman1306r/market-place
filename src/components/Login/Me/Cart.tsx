import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import useCustomContext from '../../../hooks/useCustomContext'
import { restApi } from '../../../api/api'
import { useEffect, useState } from 'react'
import { CartServer } from '../../../types/login'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Chip, CircularProgress, Stack, Tooltip } from '@mui/material'
import { ChevronDown } from 'lucide-react'

const Cart = () => {
    
	const { t } = useTranslation();
	const params = useParams()
	const {admin, isAuth} = useCustomContext()
	const [carts, setCarts] = useState<CartServer>()
	const [load, setLoad] = useState<boolean>(false)

	async function getCart(id: number) {
		try {
			setLoad(true)
			const response = await restApi.getCartByClient(id)
			setCarts(response)
		} finally {
			setLoad(false)
		}
	}
	
	useEffect(() => {
		if(!params['*'] && !isAuth) getCart(1)
		else if(!params['*'] && isAuth) getCart(admin.id) 
		else getCart(Number(params['*'])) 
	}, [params['*']])

	return (<div className='purchases'>
				<h2>{t('purchases')}</h2>
				<Stack className='purchases__body' sx={{ width: '100%' }} spacing={0}>
					{load
						? <CircularProgress className='progress' size={60} color="success" />
						: <div>{carts?.total === 0 
								? <Alert icon={false} sx={{width: '100%'}} variant="outlined" severity="success">{t('notPurchases')}</Alert>
								: <div>
									{carts?.carts.map(cart => <Accordion sx={{marginBottom: '20px'}} key={cart.id}>
																	<AccordionSummary
																		expandIcon={<Tooltip title={t('look')}><ChevronDown /></Tooltip>}
																		aria-controls="panel1-content"
																		id="panel1-header"
																	>
																		{t('productsPurchased')}
																		<span style={{fontWeight: 800, color: '#03A543', paddingLeft: '10px'}}>{cart.discountedTotal} $</span>
																	</AccordionSummary>
																	<AccordionDetails>
																		<Chip icon={<span style={{color: 'black', fontWeight: 900}}>{cart.totalQuantity}</span>}  variant="outlined" color="success" label={t('amountProduct')} />
																		<Chip icon={<span style={{color: 'black', fontWeight: 900}}>{cart.total + '$'}</span>} variant="outlined" color="success"  label={t('priceWithout')} />
																		<Chip icon={<span style={{color: 'black', fontWeight: 900}}>{cart.discountedTotal + '$'}</span>}  variant="outlined" color="success" label={t('priceWit')} />
																		<div style={{marginTop: '20px'}} className='purchases__products'>
																			{cart.products.map(product => <div style={{display: 'flex', marginBottom: '10px', borderBottom: '1px solid #F5F5F5', gap: '20px'}} className='purchases__product' key={product.id}>
																												<img width={180} style={{maxWidth: '100%'}} src={product.thumbnail} alt={product.title} />
																												<div>
																													<h3 style={{fontWeight: 800}}>{product.title}</h3>
																													<p>{t('amount')}: {product.quantity}</p>
																													<p>{t('payded')}: <span style={{color: '#03A543', fontWeight: 700}}>{product.discountedTotal}$</span></p>
																												</div>		
																										</div>)}
																		</div>
																	</AccordionDetails>
																</Accordion>)}
								</div>}
						</div>}
				</Stack>			
			</div>);
}
export default Cart;