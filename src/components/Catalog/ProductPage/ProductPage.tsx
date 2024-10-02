import { memo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCustomContext from '../../../hooks/useCustomContext';
import { restApi } from '../../../api/api';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import { CgDollar } from "react-icons/cg";
import basketImage from "./../../../assets/basket.gif";
import { FieldsParams, IProduct, IRating, ProductPageProps } from '../../../types/products'
import {  Button, ButtonGroup, Collapse, Dialog, DialogActions, DialogTitle, TextField, Tooltip  } from '@mui/material'
import Review from './Review'
import { getCorrectDate, scrollToTopCallBack } from '../../../utils/utils'
import { Check, CircleDollarSign, Heart, Settings, Trash } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import { catalog } from '../../../data/data'
import Product from '../Product/Product'

const ProductPage = memo(({setProductTitle, setDeleted}: ProductPageProps) => {

  const { t } = useTranslation();
  const params = useParams<{id: any, category: any}>()
  const [product, setProduct] = useState<IProduct | any>()
  const [open, setOpen] = useState({open: false, id: NaN});
  const [delProduct, setDelProduct] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  const [btns, setBtns] = useState({isOk: false, isEdit: false, successEdit: false});
  const [fieldsValue, setFieldsValue] = useState<FieldsParams>({price: 0, stock: 0, title: ''});
  const [isIn, setIsIn] = useState({basket: false, favorite: false});
  const [rating, setRating] = useState<IRating>({average: 0, amount: 0, isCompleted: false, reviews: [], isCollapse: false});
  const {isAuth, basket, setBasket, setPreloader, admin, setPath, favorite, setFavorite, setToPayment, toPayment} = useCustomContext()
  const navigate = useNavigate()
  const [interesting, setInteresting] = useState<IProduct[] | []>([])

  useEffect(() => {
    getInteresting()
  }, [])

  useEffect(() => {
    getProduct(params.id).then(res => {
      setFieldsValue({stock: res?.stock, price: res?.price, title: res?.title})
      setProductTitle(res.title)
    })
  }, [params.id])

  useEffect(() => {
    setRating({...rating, average: product?.reviews.slice(0).reduce((acc: number, val: any) => acc + val.rating, 0) / product?.reviews.length, amount: product?.reviews.length, reviews: product?.reviews.slice(0)})
    if(basket.find(p => product?.id === p?.id)) setIsIn({...isIn, basket: true})
    if(favorite.find(p => product?.id === p?.id)) setIsIn({...isIn, favorite: true})
  }, [product?.reviews])

  async function getProduct(id: number) {
    try {
        setPreloader(true)
        const response = await restApi.getSingleProduct(id)  
        setProduct(response)      
        return response
    } finally {
        setPreloader(false)
    }
  }

  async function getInteresting() {
    try {
        setPreloader(true)
        const category = catalog.categories[Math.floor(Math.random() * catalog.categories.length)].title
        const responce = await restApi.getProductsByCategory(category)
        setInteresting(responce.products.map((product: IProduct) => ({...product, price: +(product.price *= (1 + (product.discountPercentage / 100))).toFixed(2)})))
    } finally {
        setPreloader(false)
    }
  }

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

  async function deleteProduct(id: number) {
    try {
      setPreloader(true)
      const responce = await restApi.deleteProduct(id)
      if(responce?.isDeleted) {
          setBtns({...btns, isOk: true})
          setDeleted(responce?.id)
          setDelProduct(false)
          setTimeout(() => navigate('/catalog/' + product.category), 1500)
      }
    } finally {
      setPreloader(false)
    }
  }
  
  async function editProduct(id: number) {
    try {
      setPreloader(true)
      const body = {
          price: fieldsValue.price,
          stock: fieldsValue.stock,
          title: fieldsValue.title
      }
      const responce = await restApi.updateProduct(id, body)
      if(responce?.id) {
          setProduct({...product, title: responce.title, price: responce.price, stock: responce.stock})
          setBtns({...btns, successEdit: true})
          setProductTitle(responce.title)
          setTimeout(() => setBtns({...btns, successEdit: false, isEdit: false}), 1500)
      }
    } finally {
      setPreloader(false)
    }
  }

  function addToPayment() {
    if(!isAuth) return setPathAuth()
    scrollToTopCallBack(navigate('/basket/delivery'))
    setToPayment({...toPayment, products: [product]})
  }

  return (<div className='product__page'>
                <div className='product__page-container'>
                    <div className='product__page-photo'>
                            <Swiper
                                  loop={true}
                                  className="Swiper"
                                  lazyPreloadPrevNext={0}
                                  modules={[Autoplay, Pagination]}
                                  pagination={{
                                    clickable: true
                                  }}
                                  autoplay={{
                                      delay: 1500,
                                  }}
                              >
                              {product?.images?.map((image: string | undefined, index: number) => <SwiperSlide key={index}>
                                                                        <Tooltip title={t('look')}><img loading="lazy" onClick={() => setOpen({open: true, id: index})} srcSet={image} alt={product?.title} />
                                                                        </Tooltip>  
                                                                        <div className="swiper-lazy-preloader"></div>
                                                              </SwiperSlide>)}
                              </Swiper>
                          
                    </div> 
                    <Dialog
                      open={open.open}
                      onClose={() => setOpen({open: false, id: NaN})}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullScreen
                      sx={{cursor: 'pointer', alignItems: 'center', justifyContent: 'center'}}
                      className='product__page-fullscreenImage'
                    >
                          <img onClick={() => setOpen({open: false, id: NaN})} style={{maxWidth: '100%'}} src={product?.images[open.id]} alt={product?.title} />
                    </Dialog>
                    <Dialog
                      open={delProduct}
                      onClose={() => setDelProduct(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      sx={{cursor: 'pointer'}}
                    >
                          <DialogTitle>
                              {t('deleteProduct')}
                            </DialogTitle>
                            <DialogActions>
                              <Button color='inherit' onClick={() => setDelProduct(false)}>{t('cancel')}</Button>
                              <Button variant='contained' color='success' onClick={() => deleteProduct(product?.id)} autoFocus>{t('confirm')}</Button>
                            </DialogActions>
                    </Dialog>
                    <div className='product__page-info'>
                        <h2>{product?.title}
                          {product?.brand && <span>{t('from')} {product?.brand}</span>}
                        </h2>
                        <p>{product?.description}</p>
                        <p><span>{t('mainInfoTitle')}:</span>  {product?.warrantyInformation}</p>      
                        <h3 className='price'><span className='price__best'>{+(product?.price / (1 + (product?.discountPercentage / 100))).toFixed(2)} <CgDollar /></span>{+(product?.price * (1 + (product?.discountPercentage / 100))).toFixed(2)} <CgDollar /></h3>
                        <div className="stars">
                          <div>
                            <Rating onChange={(_event, newValue) => {
                                  if(!isAuth) {
                                    setPath(`/catalog/${product?.category}/${product?.id}`)
                                    return navigate('/login')
                                  } 
                                  setRating({...rating, average: (rating.average + Number(newValue)) / 2, amount: rating.amount + 1, isCompleted: true, reviews: [{rating: Number(newValue), comment: '', date: String(new Date()), reviewerName: admin.firstName + ' ' + admin.lastName, reviewerEmail: admin.email}, ...rating.reviews ]})
                            }} name="half-rating-read" size="large" value={rating.average || 0} precision={0.5}  readOnly={rating.isCompleted} />
                            <span>{Number(rating?.average.toFixed(1))} / 5</span>
                          </div>
                          <Tooltip title={t('look')}><div className='show-reviews' onClick={() => setRating({...rating, isCollapse: !rating.isCollapse})}><span>{rating.amount}</span>  {t('reviews')}</div></Tooltip>
                        </div>
                        <Collapse in={rating.isCollapse}>
                            <div className='comments'>{rating?.reviews?.map((r, i) => <Review setRating={setRating} rating={rating}  key={i} rev={r} />)}</div>
                        </Collapse>
                        <div className='product__page-btns'>
                            {isIn.basket && isAuth
                            ? <Button className='link-to-basket' size='small' onClick={() => scrollToTopCallBack(navigate('/basket'))} color='success' variant="contained" fullWidth>{t('openBasket')}</Button>
                            : <Button onClick={addToBasket} sx={{display: 'flex', gap: '30px'}} color='success' variant="contained" fullWidth><img width="30" src={basketImage} alt="buy now" />{t('to basket')}</Button>}
                            <ButtonGroup color='inherit' fullWidth variant="text" aria-label="Basic button group">
                              <Tooltip title={t('payment')}><Button onClick={addToPayment}><CircleDollarSign size={30} /></Button></Tooltip>
                              {isIn.favorite && isAuth
                              ? <Tooltip title={t('openFavorite')}><Button onClick={() => scrollToTopCallBack(navigate('/favorits'))}><Heart style={{fill: "#03A543"}} color='#03A543' size={30} /></Button></Tooltip>
                              : <Tooltip title={t('favorite')}><Button onClick={addToFavorits}><Heart size={30} /></Button></Tooltip>}
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div className='product__page-container down'>
                    <div className='product__page-photo'>
                        <Tooltip title={t('look')}><img style={{maxWidth: '100%'}} width={180} onClick={() => setOpenQr(true)} src={product?.meta?.qrCode} alt={product?.title} /></Tooltip> 
                        <div className='params'>
                            <h3>{t('params')}</h3>
                            <p><span>{t('weight')}:</span>  {product?.weight} g.</p>      
                            <p><span>{t('width')}:</span>  {product?.dimensions?.width} in.</p>      
                            <p><span>{t('heightP')}:</span>  {product?.dimensions?.height} in.</p>      
                            <p><span>{t('depth')}:</span>  {product?.dimensions?.depth} in.</p>      
                        </div>  
                    </div> 
                    <Dialog
                      open={openQr}
                      onClose={() => setOpenQr(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      sx={{cursor: 'pointer'}}
                    >
                          <img onClick={() => setOpenQr(false)} style={{maxWidth: '100%'}} src={product?.meta?.qrCode} alt={product?.title} />
                    </Dialog>
                    <div className='product__page-info'>
                        <p><span>{t('ships')}:</span>  {product?.shippingInformation}</p>      
                        <p><span>{t('returnPolicy')}:</span>  {product?.returnPolicy}</p>      
                        <p><span>{t('stock')}:</span>  {product?.stock + ' ' + t('th')}</p>      
                        <p><span>{t('update')}:</span>  {getCorrectDate(product?.meta?.updatedAt)}</p>      
                    </div>
                </div>
                <Collapse in={btns.isEdit}>
                    <form className='editForm'>
                        {btns.successEdit 
                        ?   <Check size={100} color='green' />
                        : <>
                              <h3>{t('edit')}</h3>
                              <TextField fullWidth InputLabelProps={{shrink: true}} value={fieldsValue.title} onChange={(event) => setFieldsValue({...fieldsValue, title: event.target.value})} id="standard-basic" label={t('title')} variant="standard" />
                              <TextField fullWidth InputLabelProps={{shrink: true}} value={fieldsValue.price} onChange={(event) => setFieldsValue({...fieldsValue, price: Number(event.target.value)})} type="number" id="standard-basic" label={t('price')} variant="standard" />
                              <TextField fullWidth InputLabelProps={{shrink: true}} value={fieldsValue.stock} onChange={(event) => setFieldsValue({...fieldsValue, stock: Number(event.target.value)})} type="number" id="standard-basic" label={t('stock')} variant="standard" />
                              <Button fullWidth variant='contained' color='success' onClick={() => editProduct(product?.id)}>{t('submit')}</Button> 
                        </>}
                    </form>    
                </Collapse>
                {isAuth && <ButtonGroup className='product__page__govern' color='inherit' fullWidth variant="text" aria-label="Basic button group">
                    <Tooltip title={t('edit')}><Button onClick={() => setBtns({...btns, isEdit: !btns.isEdit})}><Settings /></Button></Tooltip>
                    <Tooltip title={t('delete')}><Button onClick={() => setDelProduct(true)}>{btns.isOk ? <Check color='green' /> : <Trash />}</Button></Tooltip>
                </ButtonGroup> }     
                <article className='catalog__group-item product-page'>
                          <h2>{t('mayBeIntersting')}</h2>
                          <div className='catalog__group-item-products'>{interesting.slice(0, 3).map(p => <Product key={p.id} product={p} />)}</div>
                </article>       
          </div>);
})
export default ProductPage;