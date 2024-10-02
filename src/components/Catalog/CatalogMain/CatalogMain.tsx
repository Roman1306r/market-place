import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useCustomContext from '../../../hooks/useCustomContext'
import { restApi } from '../../../api/api'
import Product from '../Product/Product'
import { IProduct, ServerProducts } from '../../../types/products'
import { Button } from '@mui/material'
import { catalog } from '../../../data/data'
import { GiPriceTag } from "react-icons/gi";
import { CloudDownload } from 'lucide-react'
import { m } from 'framer-motion'
import { cardVariants2 } from '../../../variants/variants'

const CatalogMain = () => {

  const { t } = useTranslation();
  const [products, setProducts] = useState<ServerProducts>({total: 0, skip: 0, limit: 0, products: []})
  const {setPreloader} = useCustomContext()
  const [countLoading, setCountLoading] = useState({skip: 0, limit: 9})
  const [orderWeek, setOrderWeek] = useState<IProduct[] | []>([])

  useEffect(() => {
      getProductsAll(countLoading.skip, countLoading.limit)
  }, [countLoading])

  useEffect(() => {
    getBestOffer()
    getProductsAll(countLoading.skip, countLoading.limit)
  }, [])
  
  async function getProductsAll(skip: number, limit: number) {
      try {
        setPreloader(true)
        const response = await restApi.getAllProducts(skip, limit)
        setProducts({...products, products: [...products?.products, ...response.products], total: response.total})
      } finally {
        setPreloader(false)
      }
  }
  async function getBestOffer() {
    try {
        setPreloader(true)
        const category = catalog.categories[Math.floor(Math.random() * catalog.categories.length)].title
        const responce = await restApi.getProductsByCategory(category)
        setOrderWeek(responce.products.map((product: IProduct) => ({...product, price: +(product.price *= (1 + (product.discountPercentage / 100))).toFixed(2)})))
    } finally {
        setPreloader(false)
    }
  }

  return (<section className='catalog__group'>  
              <article className='catalog__group-item'>
                  <m.h2
                    variants={cardVariants2}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.8 }}
                  >{t('bestWeek')} <GiPriceTag className='shake' /></m.h2>
                  <div className='catalog__group-item-products sale'>{orderWeek.slice(0, 3).map(p => <Product key={p.id} product={p} />)}</div>
              </article>
              <article className='catalog__group-item'>
                  <m.h2
                    variants={cardVariants2}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.8 }}
                  >{t('popular')} <GiPriceTag className='shake' /></m.h2>
                  <div className='catalog__group-item-products'>{orderWeek.slice(-3).map(p => <Product key={p.id} product={p} />)}</div>
              </article>
              <article className='catalog__group-item'>
                  <m.h2
                    variants={cardVariants2}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.8 }}
                  >{t('otherGoods')}</m.h2>
                  <div className='catalog__group-item-products'>{products?.products.map(p => <Product key={p.id} product={p} />)}</div>
                  {products.products.length < products.total  && <div className='more'><Button startIcon={<CloudDownload />}  color='success' onClick={() => setCountLoading({...countLoading, skip: countLoading.skip + countLoading.limit})} variant="outlined">{t('showmore')}</Button></div>}
              </article>
          </section> );
}
export default CatalogMain;
