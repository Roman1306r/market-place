import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useCustomContext from '../../../hooks/useCustomContext'
import Product from '../Product/Product'
import { CatalogSearchProps, ServerProducts } from '../../../types/products'
import { restApi } from '../../../api/api'
import { Button } from '@mui/material'
import { CloudDownload } from 'lucide-react'
import ScrollIntoView from 'react-scroll-into-view'

const CatalogSort = memo(({seacrhParams}: CatalogSearchProps) => {

  const { t } = useTranslation();
  const [products, setProducts] = useState<ServerProducts>({total: 0, skip: 0, limit: 0, products: []})
  const {setPreloader} = useCustomContext()
  const [countLoading, setCountLoading] = useState({skip: 0, limit: 9})

  useEffect(() => {  
    sortProducts(seacrhParams.sortBy, 9, 0, true) 
  }, [seacrhParams.sortBy])

  useEffect(() => {
    sortProducts(seacrhParams.sortBy, countLoading.limit, countLoading.skip)
  }, [countLoading])

  async function sortProducts(param: string, limit: number, skip: number, isChange: boolean = false) {
    try {
        setPreloader(true)
        const response = await restApi.sortProducts(param, limit, skip)
        if(isChange) setProducts(response)
        else setProducts({...products, products: [...products?.products, ...response.products], total: response.total})
    } finally {
        setPreloader(false)
    }
  }

  return (<section className='catalog__group'>  
				        <h2 style={{marginBottom: '20px', display: 'flex', gap: '10px',justifyContent: 'space-between'}}><span style={{display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600}}>{t('sortBy') + ' '} <span style={{textTransform: 'lowercase', color: '#03A543'}}>{t(seacrhParams.sortBy)}</span></span> <ScrollIntoView scrollOptions={{block: 'center'}} selector="#sortId"><Button id='footer' color='success'  variant="contained">{t('sort')}</Button></ScrollIntoView></h2>
                <article className='catalog__group-item'> 
                    <div className='catalog__group-item-products'>{products?.products.map(p => <Product key={p?.id} product={p} />)}</div>
                    {products?.products.length < products?.total  && <div className='more'><Button startIcon={<CloudDownload />}  color='success' onClick={() => setCountLoading({...countLoading, skip: countLoading.skip + countLoading.limit})} variant="outlined">{t('showmore')}</Button></div>}
                </article>
          </section> );
})
export default CatalogSort;