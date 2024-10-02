import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { catalog } from '../../../data/data'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { m } from 'framer-motion'
import { Button, Divider, FormControlLabel, Radio, RadioGroup, TextField, Tooltip } from '@mui/material'
import { memo, useState } from 'react'
import { scrollToTopCallBack } from '../../../utils/utils'
import { CatalogSearchProps } from '../../../types/products'

const SidebarCatalog = memo(({seacrhParams, setSearchParams, setIsShrink}: CatalogSearchProps) => {

  const { t } = useTranslation();
  const params = useParams()
  const [isShrinkSidebar, setIsShrinkSidebar] = useState(false)
  const navigate = useNavigate()
  
  const scrollTo = () => window.innerWidth < 768 ? setIsShrink(false) : false

  return (<m.aside 
              animate={{width: isShrinkSidebar ? '5%' : '25%'}}
              transition={{type: 'spring', stiffness: 300, damping: 20}}
              className='catalog__body-sidebar'>
              <div className={isShrinkSidebar ? 'catalog__body-sidebar-chooise shrink' :'catalog__body-sidebar-chooise'}>
                  {isShrinkSidebar ? <PanelLeftOpen className='shrink-icon' onClick={() => setIsShrinkSidebar(false)} /> : <PanelLeftClose  className='shrink-icon' onClick={() => setIsShrinkSidebar(true)} />}
                  {catalog.categories.map((p) => <NavLink onClick={scrollTo} to={'/catalog/' + p.title} key={p.id}><button>{!isShrinkSidebar ? <><span style={{color: params['*'] === p.title ? '#03A543' : ''}}>{t(p.title)}</span><span>{p.amount}</span></>: <Tooltip title={t(p.title)}><p.icon/></Tooltip>}</button></NavLink> )}
              </div>
              {!isShrinkSidebar && <div className='catalog__body-sidebar-filter'>
                <h4 id='sortId'>{t('sortProducts')}</h4>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={seacrhParams.sortBy}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchParams({...seacrhParams, sortBy: (event.target as HTMLInputElement).value})}
                >
                  <FormControlLabel value="title" control={<Radio size='small' color="default" />} label={t('title')} />
                  <FormControlLabel value="category" control={<Radio size='small' color="default" />} label={t('category')} />
                  <FormControlLabel value="stock" control={<Radio size='small' color="default" />} label={t('amount')} />
                  <FormControlLabel value="price" control={<Radio size='small' color="default" />} label={t('price')} />
                  <FormControlLabel value="rating" control={<Radio size='small' color="default" />} label={t('rating')} />
                </RadioGroup>
                <Button onClick={() => scrollToTopCallBack(navigate('/catalog/sort'))} fullWidth color='inherit' variant="contained">{t('sort')}</Button>
                <Divider />
                <h4 id='searchId'>{t('seacrhProducts')}</h4>
                <TextField fullWidth value={seacrhParams.search} onChange={(event) => setSearchParams({...seacrhParams, search: event.target.value})} color="success" id="standard-basic" label={t('search')} variant="standard" />
                <Button onClick={() => scrollToTopCallBack(navigate('/catalog/search'))} fullWidth color='inherit' variant="contained">{t('search')}</Button>
              </div>}
          </m.aside>);
})
export default SidebarCatalog;