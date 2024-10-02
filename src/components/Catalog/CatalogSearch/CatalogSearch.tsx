import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useCustomContext from '../../../hooks/useCustomContext'
import Product from '../Product/Product'
import { CatalogSearchProps, ServerProducts } from '../../../types/products'
import { restApi } from '../../../api/api'
import { Alert, Button } from '@mui/material'
import { CloudDownload } from 'lucide-react'
import ScrollIntoView from 'react-scroll-into-view'

const CatalogSearch = memo(({seacrhParams}: CatalogSearchProps) => {

  const { t } = useTranslation();
  const [products, setProducts] = useState<ServerProducts>({total: 0, skip: 0, limit: 0, products: []})
  const {setPreloader} = useCustomContext()
  const [countLoading, setCountLoading] = useState({skip: 0, limit: 9})

  useEffect(() => {  
    searchProducts(seacrhParams.search, 9, 0, true)
  }, [seacrhParams.search])

  useEffect(() => {
    searchProducts(seacrhParams.search, countLoading.limit, countLoading.skip)
  }, [countLoading])

  async function searchProducts(query: string, limit: number, skip: number, isChange: boolean = false) {
    try {
        setPreloader(true)
        const response = await restApi.searchProducts(query, limit, skip)
        setProducts(response)
        if(isChange) setProducts(response)
        else setProducts({...products, products: [...products?.products, ...response.products], total: response.total})
    } finally {
        setPreloader(false)
    }
  }

  return (<section className='catalog__group'>  
                <h3 style={{marginBottom: '20px', display: 'flex', gap: '10px',justifyContent: 'space-between'}}>

                    <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      {!seacrhParams.search 
                        ? t('foundResults') + ' - ' + products.total 
                        : <>{t('req') + ' '}<span style={{fontWeight: 800}}>{seacrhParams.search}</span> {' ' + t('foundResults') + ' - ' + products.total}</>}
                    </span> 

                    <ScrollIntoView scrollOptions={{block: 'center'}} selector="#searchId">
                        <Button id='footer' color='success'  variant="contained">{t('repeatSearch')}</Button>
                    </ScrollIntoView>
                </h3>
                <article className='catalog__group-item'> 
                    {!products?.total && <Alert sx={{width: '100%'}} variant="outlined" severity="info">{t('nothingSearch')}</Alert>}
                    <div className='catalog__group-item-products'>{products?.products.map(p => <Product key={p?.id} product={p} />)}</div>
                    {products?.products.length < products?.total  && <div className='more'><Button startIcon={<CloudDownload />}  color='success' onClick={() => setCountLoading({...countLoading, skip: countLoading.skip + countLoading.limit})} variant="outlined">{t('showmore')}</Button></div>}
                </article>
          </section> );
})
export default CatalogSearch;