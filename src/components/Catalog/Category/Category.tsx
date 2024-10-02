import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCustomContext from '../../../hooks/useCustomContext';
import { restApi } from '../../../api/api';
import Product from '../Product/Product';
import { useTranslation } from 'react-i18next';
import { IProduct } from '../../../types/products'
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, ButtonGroup, Menu, MenuItem, Tooltip } from '@mui/material'
import { Grid2X2, Rows2, Star, Weight } from 'lucide-react'
import { BadgeDollarSign} from 'lucide-react'

const Category = memo(({id}: {id: number}) => {

  const { t } = useTranslation();
  const [goods, setGoods] = useState<IProduct[] | []>([])
  const [prop, setProp] = useState({price: false, rating: false, weight: false})
  const {category} = useParams<{category: any}>()
  const {setPreloader} = useCustomContext()
  const [isSort, setIsSort] = useState({price: false, rating: false, weight: false})
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isLineStyle, setIsLineStyle] = useState(false)

  useEffect(() => {
    getGoods(category)
  }, [category])

  async function getGoods(category: string) {
    try {
      setPreloader(true)
      const responce = await restApi.getProductsByCategory(category)   
      setGoods(responce.products.filter((p: IProduct) => p.id !== id))
    } finally {
      setPreloader(false)
    }
  }

  function sortDataByOneKey(key: string, arr: IProduct[], isReverse = false) {
      setProp({...prop, [key]: isReverse ? false : true})
      return setGoods(arr.sort((a: any, b: any) => isReverse ? a[key] < b[key] ? -1 : 1 : a[key] < b[key] ? 1 : -1))
  }

  function sortDataByTwoKeys(key: string, key2: any, arr: IProduct[], isReverse = false) {
      setProp({...prop, [key2]: isReverse ? false : true})
      return setGoods(arr.sort((a: any, b: any) => isReverse ? a[key][key2] < b[key][key2] ? -1 : 1 : a[key][key2] < b[key][key2] ? 1 : -1))
  }

  function sort(arr: IProduct[], key: string, key2 = '') {
      return function() {
          setIsSort({...isSort, [key]: true})
          setTimeout(() => setIsSort({...isSort, [key]: false}), 1000)
          if(key2) {
            return prop[key2 as keyof typeof prop] ? sortDataByTwoKeys(key, key2, arr, true) : sortDataByTwoKeys(key, key2, arr)
          } else {
            return prop[key as keyof typeof prop] ? sortDataByOneKey(key, arr, true) : sortDataByOneKey(key, arr)
          }
      }
  }
  
  let sortByPrice = sort(goods, 'price')
  let sortByRating = sort(goods, 'rating')
  let sortByWeight = sort(goods, 'weight')

  function setViewElements(isLine: boolean) {
    setIsLineStyle(isLine)
    setAnchorEl(null)
  }

  return (<section className='category__container catalog__group'>
                <div className='category__container-top'>
                    <h2>{t(category).toUpperCase()}</h2>
                    <div className='category__container-top-sort'>
                      <Tooltip title={t('viewItems')}>
                          <Button 
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined} 
                                variant='outlined' 
                                className='view'
                                color='inherit' 
                                size="small" 
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                                {isLineStyle ? <Rows2 /> : <Grid2X2 />}
                          </Button>
                      </Tooltip>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={() => setViewElements(true)}><Rows2 /></MenuItem>
                        <MenuItem onClick={() => setViewElements(false)}><Grid2X2 /></MenuItem>
                      </Menu>
                      <ButtonGroup variant="outlined" aria-label="Loading button group">
                          <Tooltip title={t('sort by price')}><LoadingButton color='inherit' size="small" onClick={sortByPrice} loading={isSort.price} ><span className='sort__span'><BadgeDollarSign /></span></LoadingButton></Tooltip>
                          <Tooltip title={t('sort by rating')}><LoadingButton color='inherit' size="small" onClick={sortByRating} loading={isSort.rating} ><span className='sort__span'><Star /></span></LoadingButton></Tooltip>
                          <Tooltip title={t('sort by weight')}><LoadingButton color='inherit' size="small" onClick={sortByWeight} loading={isSort.weight} ><span className='sort__span'><Weight /></span></LoadingButton></Tooltip>
                      </ButtonGroup>  
                    </div>
                </div>
                <div className='catalog__group-item'>
                  <div className={isLineStyle ? 'catalog__group-item-products line' : 'catalog__group-item-products'} >
                      {goods.map(g => <Product key={g.id} product={g} />)}
                  </div>
                </div>
          </section>);
})
export default Category;