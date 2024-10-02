import { Button } from '@mui/material'
import { ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'

const NotProduct = () => {

  const { t } = useTranslation();

  return (<article className='basket__notproduct'>
              <p>{t('textNotProduct')}</p>
              <NavLink to={'/catalog'}><Button sx={{display: 'flex', gap: '10px'}} size='large' color='success' variant="outlined"><ShoppingBag />{t('Каталог')}</Button></NavLink>
          </article>);
}
export default NotProduct;