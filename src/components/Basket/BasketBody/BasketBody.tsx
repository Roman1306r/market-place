import { IProduct } from '../../../types/products'
import { BadgeDollarSign, ChevronDown, ChevronUp, CircleDollarSign, Trash2 } from 'lucide-react'
import useCustomContext from '../../../hooks/useCustomContext'
import { Button, Dialog, Tooltip } from '@mui/material'
import { useCallback, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import { scrollToTop, scrollToTopCallBack } from '../../../utils/utils'
import NotProduct from '../NotProduct/NotProduct'
import { useTranslation } from 'react-i18next'

const BasketBody = () => {

	const {basket, setBasket, setToPayment, toPayment} = useCustomContext()
	const [open, setOpen] = useState<{open: boolean, id: null | number}>({open: false, id: null});
	const navigate = useNavigate()
	const { t } = useTranslation();

	const deleteProduct = (id: number) => {
		setBasket(basket.filter(p => p.id !== id))
		localStorage.setItem('basket', JSON.stringify(basket.filter(p => p.id !== id)))
	}

	const setNewAmount = (id: number, isSum: boolean) => {
		if(isSum) {
			setBasket(basket.map(product => product.id === id ? { ...product, amount: product.amount + 1 } : product))
			localStorage.setItem('basket', JSON.stringify(basket.map(product => product.id === id ? { ...product, amount: product.amount + 1 } : product)))
		} else {
			setBasket(basket.map(product => product.id === id ? { ...product, amount: product.amount - 1 } : product))
			localStorage.setItem('basket', JSON.stringify(basket.map(product => product.id === id ? { ...product, amount: product.amount - 1 } : product)))
		}  
	}

	const clearBasket = useCallback(() => {
		setBasket([])
		localStorage.removeItem('basket')
	}, [])

	const addToPayment = () => {
		setToPayment({...toPayment, products: basket})
		scrollToTopCallBack(navigate('/basket/delivery'))
	}

	const addProductToPayment = (p: IProduct) => {	
		setToPayment({...toPayment, products: [p]})
		scrollToTopCallBack(navigate('/basket/delivery'))
	}

	return(<>
				<h1>{t('basket')}</h1>
				{!basket.length
				? <NotProduct />
				: <article className='basket__body'> 
						<div className='basket__body-table'>
							<table className="table">
									<thead>
										<tr>
											<th></th>
											<th>№</th>
											<th>{t('image')}</th>
											<th>{t('nameProduct')}</th>
											<th>{t('priceOne')}</th>
											<th>{t('amount')}</th>
											<th>{t('price')}</th>
											<th>{t('action')}</th>
										</tr>
									</thead>
									<Dialog
											open={open.open}
											onClose={() => setOpen({open: false, id: null})}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
											sx={{cursor: 'pointer'}}
									>
											<img onClick={() => setOpen({open: false, id: null})} style={{maxWidth: '100%'}} src={basket.find(p => p.id == open.id)?.images[0]} alt="dialog" />
									</Dialog>
									<tbody>
									{basket.map((p: IProduct, i: number) => <tr key={p.id}>
																					<Tooltip title={t('delete')}><td data-label="" onClick={() => deleteProduct(p.id)}><AiOutlineDelete /></td></Tooltip>
																					<td data-label="№">{i + 1}</td>
																					<Tooltip title={t('look')}><td data-label={t('image')} style={{cursor: 'pointer'}} onClick={() => setOpen({open: true, id: p?.id})}><img width={90} src={p?.thumbnail} alt={p?.title} /></td></Tooltip>
																					<td data-label={t('nameProduct')} className='title__basket__td'><NavLink onClick={scrollToTop} to={`/catalog/${p?.category}/${p?.id}`}>{p?.title}</NavLink></td>
																					<td data-label={t('priceOne')} className='price'><span>{p?.price} <CircleDollarSign size={20} /></span></td>
																					<td data-label={t('amount')}>
																						<div className='amount'>
																							<button disabled={p?.amount <= 1} type="button" onClick={() => setNewAmount(p.id, false)}><ChevronDown size={30} /></button>
																							<input readOnly type="number" name="number" min="1" max={p?.stock} value={p?.amount} />
																							<button disabled={p?.amount >= p?.stock} type="button" onClick={() => setNewAmount(p.id, true)}><ChevronUp size={30} /></button>
																						</div>
																					</td>
																					<td data-label={t('price')} className='price'><span>{(p?.price * p?.amount).toFixed(2)} <CircleDollarSign size={20} /></span></td>
																					<td data-label={t('action')}><Button onClick={() => addProductToPayment(p)}  color='success' variant="contained">{t('buy')}</Button></td>
																			</tr>)}
									</tbody>
									<tfoot>
									<tr>
										<td colSpan={6}>{t('total')}</td>
										<td data-label={t('total')} className='price' colSpan={2}><span>{basket.reduce((cur, acc) =>  cur + (acc.price * acc.amount), 0).toFixed(2)} <CircleDollarSign size={30} /></span></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<div className='basket__body-btns'>
								<Button sx={{gap: '10px'}} size='large' color='inherit' variant='contained' onClick={clearBasket}><Trash2 /> {t('clearBasket')} </Button>
								<Button sx={{gap: '10px'}} size='large' color='success' variant='contained' onClick={addToPayment}><BadgeDollarSign /> {t('offer')} </Button>
						</div>
				</article>}
			</>);
}
export default BasketBody;