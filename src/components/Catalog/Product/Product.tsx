import { memo, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import useCustomContext from '../../../hooks/useCustomContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductProps } from '../../../types/products'
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { getCorrectDate, scrollToTop, scrollToTopCallBack } from '../../../utils/utils'
import { BadgeDollarSign, BaggageClaim, Heart, ShoppingCart } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import { m } from 'framer-motion'
import { opacity } from '../../../variants/variants'

const Product = memo(({product} : ProductProps) => {

  const navigate = useNavigate()
  const { t } = useTranslation();
  const {setBasket, basket, setFavorite, favorite, setToPayment, toPayment, isAuth, setPath} = useCustomContext()
  const [isIn, setIsIn] = useState({basket: false, favorite: false})
  
  useEffect(() => {
    if(basket.find(p => product?.id === p?.id)) setIsIn({...isIn, basket: true})
    if(favorite.find(p => product?.id === p?.id)) setIsIn({...isIn, favorite: true})
  }, [])

  function setPathAuth() {
      setPath(`/catalog/${product.category}/${product.id}`)
      navigate('/login')
  }

  function addToBasket() {
    if(!isAuth) return setPathAuth()
    setBasket([{...product, amount: 1, inBasket: true}, ...basket])
    localStorage.setItem('basket', JSON.stringify([{...product, amount: 1, inBasket: true}, ...basket]))
    setIsIn({...isIn, basket: true})
  }
  function addToFavorits() {
    if(!isAuth) return setPathAuth()
    setFavorite([{...product, amount: 1}, ...favorite])
    localStorage.setItem('favorite', JSON.stringify([{...product, amount: 1}, ...favorite]))
    setIsIn({...isIn, favorite: true})
  }

  function addToPayment() {
    if(!isAuth) return setPathAuth()
    scrollToTopCallBack(navigate('/basket/delivery'))
    setToPayment({...toPayment, products: [product]})
  }

  return (<m.div 
                variants={opacity}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                className="product-item">
                <span className="wdp-ribbon">
                    {t('sale')}
                </span>
                <div className="product-img">
                        <Swiper
                              loop={true}
                              lazyPreloadPrevNext={0}
                              className="Swiper-product"
                              modules={[Pagination, Navigation]}
                              navigation={true}
                              pagination={{
                                clickable: true
                              }}
                          >
                          {product?.images?.map((image, index: number) => <SwiperSlide key={index}>
                                                                          <img className='swiper-lazy' loading="lazy" onClick={() => scrollToTopCallBack(navigate(`/catalog/${product.category}/` + product.id))} srcSet={image} alt={product?.title} />
                                                                          <div className="swiper-lazy-preloader"></div>
                                                          </SwiperSlide>)}
                          </Swiper>
                </div>
                <div className="product-list">
                      <NavLink onClick={scrollToTop} to={`/catalog/${product.category}/` + product.id}><h3>{product.title}</h3></NavLink>
                      <div className="stars">
                          <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly /> {product.rating} / 5
                      </div>
                      <div className={product.stock <= 5  ? 'quantity' : 'quantity hide'}>{product.stock === 0 ? t('last') : t('left') + product.stock}</div>
                      <span className="price">{product.price} $ <span className='price__best'>{+(product.price / (1 + (product.discountPercentage / 100))).toFixed(2)} $</span></span>
                      <span className='date__action'>{t('added')}: {getCorrectDate(product.meta.createdAt)}</span>
                      <ButtonGroup className='btn-group' color='inherit' fullWidth variant="text" aria-label="Basic button group">
                        <Tooltip title={t('payment')}><Button onClick={addToPayment}><BadgeDollarSign /></Button></Tooltip>
                        {isIn.basket && isAuth
                        ? <Tooltip title={t('openBasket')}><Button onClick={() => scrollToTopCallBack(navigate('/basket'))}><BaggageClaim color='#03A543' /></Button></Tooltip>
                        : <Tooltip title={t('to basket')}><Button onClick={addToBasket}><ShoppingCart /></Button></Tooltip>}
                        {isIn.favorite && isAuth
                        ? <Tooltip title={t('openFavorite')}><Button onClick={() => scrollToTopCallBack(navigate('/favorits'))}><Heart color='#03A543' style={{fill: "#03A543"}} /></Button></Tooltip>
                        : <Tooltip title={t('favorite')}><Button onClick={addToFavorits}><Heart /></Button></Tooltip>}
                      </ButtonGroup>
                </div>
          </m.div>);
})
export default Product;