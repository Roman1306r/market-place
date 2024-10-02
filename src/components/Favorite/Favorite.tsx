import { useCallback, useEffect, useState } from 'react';
import useCustomContext from '../../hooks/useCustomContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaggageClaim, ChevronDown, ChevronUp, CircleDollarSign, ShoppingBag, ShoppingCart } from 'lucide-react'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip } from '@mui/material'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { IProduct } from '../../types/products'
import { AiOutlineDelete } from 'react-icons/ai'
import { scrollToTop, scrollToTopCallBack } from '../../utils/utils'

const Favorite = () => {

	const {basket, favorite, setBasket, isAuth, setFavorite, setPath} = useCustomContext()
	const navigate = useNavigate()
	const [open, setOpen] = useState<{open: boolean, id: null | number, addToBasket: boolean, idDelete: number}>({open: false, id: null, addToBasket: false, idDelete: 0});
	const { t } = useTranslation();

	useEffect(() => {
		if(!isAuth) {
			setPath('/favorits')
			return navigate('/login')
		} 
		setFavorite(favorite.map(p => {
			if(basket.find(product => product?.id === p?.id)) return {...p, inBasket: true}
			else return {...p, inBasket: false}
		}))
	}, [favorite, basket])

	const clearFavor = useCallback(() => {
		setFavorite([])
		localStorage.removeItem('favorite')
	}, [])

	const deleteProduct = (id: number) => {
		setFavorite(favorite.filter(p => p.id !== id))
		localStorage.setItem('favorite', JSON.stringify(favorite.filter(p => p.id !== id)))
		setOpen({open: false, id: null, addToBasket: false, idDelete: 0})
	}

	const setNewAmount = (id: number, isSum: boolean) => {
		if(isSum) {
			setFavorite(favorite.map(product => product.id === id ? { ...product, amount: product.amount + 1 } : product))
			localStorage.setItem('favorite', JSON.stringify(favorite.map(product => product.id === id ? { ...product, amount: product.amount + 1 } : product)))
		} else {
			setFavorite(favorite.map(product => product.id === id ? { ...product, amount: product.amount - 1 } : product))
			localStorage.setItem('favorite', JSON.stringify(favorite.map(product => product.id === id ? { ...product, amount: product.amount - 1 } : product)))
		}  
	}

	const addToBasket = (product: IProduct) => {
		setBasket([{...product, inBasket: true}, ...basket])
		localStorage.setItem('basket', JSON.stringify([{...product, inBasket: true}, ...basket]))
		setOpen({...open, addToBasket: true, idDelete: product.id})
	}

	return (<section className='basket'>
				<div className="bread basket-bread">
					<NavLink to={'/'}>{t('MAIN')}</NavLink>
					<RiArrowDropRightLine />
					<span>{t('favorites')}</span>       
				</div>
				<h1>{t('favorites')}</h1>
				{!favorite.length
				? <article className='basket__notproduct'>
						<p>{t('favoritesEmpty')}</p>
						<NavLink to={'/catalog'}><Button sx={{display: 'flex', gap: '10px'}} size='large' color='success' variant="outlined"><ShoppingBag />{t('Каталог')}</Button></NavLink>
				</article>
				: <article className='basket__body'>
					<table className="table favorite">
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
										open={open.open || open.addToBasket}
										onClose={() => setOpen({addToBasket: false, open: false, id: null, idDelete: 0})}
										aria-labelledby="alert-dialog-title"
										aria-describedby="alert-dialog-description"
										sx={{cursor: 'pointer'}}
								>
										{open.open 
										? <img onClick={() => setOpen({addToBasket: false, open: false, id: null, idDelete: 0})} style={{maxWidth: '100%'}} src={favorite.find(p => p.id == open.id)?.images[0]} alt="dialog" />
										:<>
											<DialogTitle id="alert-dialog-title">
												{t('deleteFavotite')}
											</DialogTitle>
											<DialogActions>
												<Button color='inherit' onClick={() => setOpen({...open, addToBasket: false, idDelete: 0})}>{t('cancel')}</Button>
												<Button variant='contained' color='success' onClick={() => deleteProduct(open.idDelete)} autoFocus>{t('confirm')}</Button>
											</DialogActions>
										</>}
								</Dialog>
								<tbody>
								{favorite.map((p: IProduct, i: number) => <tr key={p.id}>
																				<Tooltip title={t('delete')}><td data-label="" onClick={() => deleteProduct(p.id)}><AiOutlineDelete /></td></Tooltip>
																				<td data-label="№">{i + 1}</td>
																				<Tooltip title={t('look')}><td data-label={t('image')} style={{cursor: 'pointer'}} onClick={() => setOpen({...open, open: true, id: p?.id})}><img width={90} src={p?.thumbnail} alt={p?.title} /></td></Tooltip>
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
																				{p.inBasket 
																				? <Tooltip title={t('openBasket')}><td data-label={t('action')} onClick={() => scrollToTopCallBack(navigate('/basket'))} style={{cursor: 'pointer'}}><BaggageClaim color='#03A543' /></td></Tooltip>
																				: <Tooltip title={t('to basket')}><td data-label={t('action')} onClick={() => addToBasket(p)} style={{cursor: 'pointer'}}><ShoppingCart /></td></Tooltip>}
																		</tr>)}
								</tbody>
								<tfoot>
								<tr>
									<td colSpan={6}>{t('total')}</td>
									<td data-label={t('total')} className='price' colSpan={2}><span>{favorite.reduce((cur, acc) =>  cur + (acc.price * acc.amount), 0).toFixed(2)} <CircleDollarSign size={30} /></span></td>
								</tr>
							</tfoot>
						</table>
					<div className='basket__body-btns'>
							<Button color="inherit" variant='contained' onClick={clearFavor}>{t('clearFavorits')}</Button>
					</div>
				</article>}
			</section>);
}
export default Favorite;