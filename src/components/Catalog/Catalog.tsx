import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import CatalogMain from './CatalogMain/CatalogMain';
import SidebarCatalog from './SidebarCatalog/SidebarCatalog';
import Category from './Category/Category';
import ProductPage from './ProductPage/ProductPage';
import { useTranslation } from 'react-i18next'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import CatalogSort from './CatalogSort/CatalogSort'
import CatalogSearch from './CatalogSearch/CatalogSearch'
import { Button, Collapse } from '@mui/material'
import { ChevronDown, ChevronUp } from 'lucide-react'

const Catalog = () => {

  const { t } = useTranslation()
  const params = useParams()
  const [options, setOptions] = useState({isCategory: false, isProduct: false, category: '', product: ''})
  const [seacrhParams, setSearchParams] = useState({search: '', sortBy: 'title'})
  const [productTitle, setProductTitle] = useState('')
  const [deleted, setDeleted] = useState<number>(NaN)
  const [isShrink, setIsShrink] = useState(false)

  useEffect(() => {
    checkOptions()
    return () => {
      setOptions({isCategory: false, isProduct: false, category: '', product: ''})
      setProductTitle('')
    } 
  }, [params])

  function checkOptions() {
    if(!params['*']) return setOptions({isCategory: false, isProduct: false, category: '', product: ''})
      else {
        const arrayParams = params['*'].split('/')
        if(!arrayParams[1]) setOptions({isCategory: true, category: arrayParams[0], isProduct: false, product: ''})
        else setOptions({isCategory: true, isProduct: true, category: arrayParams[0], product: productTitle})    
      }
  }
  
  return (<section className='catalog'>
              <div className="bread">
                {!options.isCategory && !options.isProduct 
                ? <>
                    <NavLink to={'/'}>{t('MAIN')}</NavLink>
                    <RiArrowDropRightLine />
                    <span>{t('Каталог')}</span>
                </>
                : <>
                      {options.isCategory && !options.isProduct
                        ? <>
                            <NavLink to={'/'}>{t('MAIN')}</NavLink>
                            <RiArrowDropRightLine />
                            <NavLink to={'/catalog'}>{t('Каталог')}</NavLink>
                            <RiArrowDropRightLine />
                            <span>{t(options.category)}</span>
                          </>
                        : <>
                            <NavLink to={'/'}>{t('MAIN')}</NavLink>
                            <RiArrowDropRightLine />
                            <NavLink to={'/catalog'}>{t('Каталог')}</NavLink>
                            <RiArrowDropRightLine />
                            <NavLink to={'/catalog/' + options.category}>{t(options.category)}</NavLink>
                            <RiArrowDropRightLine />
                            <span>{options.product || productTitle}</span>
                        </>
                      }    
                  </>
                }
              </div>
              
              <div className='catalog__body'>
                  {window.innerWidth < 768 
                  ? <div>
                        <Button sx={{display: 'flex', gap: '20px'}} color='success' fullWidth onClick={() => setIsShrink(!isShrink)} variant="text">{t('variantCategory')} {isShrink ? <ChevronUp /> : <ChevronDown />}</Button>
                        <Collapse className='catalog__sidebar-mobile' in={isShrink}>
                            <SidebarCatalog setIsShrink={setIsShrink} setSearchParams={setSearchParams} seacrhParams={seacrhParams} />
                        </Collapse>
                    </div>
                  : <SidebarCatalog setIsShrink={setIsShrink} setSearchParams={setSearchParams} seacrhParams={seacrhParams} />} 
                  <article className='catalog__body-content'>
                      <div className='catalog__body-content-products'>
                                  <Routes >
                                       <Route path='/' element={<CatalogMain />}  />
                                       <Route path='/sort' element={<CatalogSort setIsShrink={setIsShrink} setSearchParams={setSearchParams} seacrhParams={seacrhParams} />}  />
                                       <Route path='/search' element={<CatalogSearch setIsShrink={setIsShrink} setSearchParams={setSearchParams} seacrhParams={seacrhParams} />}  />
                                       <Route path='/:category' element={<Category id={deleted} />}  />
                                       <Route path='/:category/:id' element={<ProductPage setDeleted={setDeleted} setProductTitle={setProductTitle} />}  />
                                  </Routes>
                      </div>
                  </article>
              </div>
          </section>)
}
export default Catalog;