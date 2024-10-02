import { useEffect, useState } from 'react';
import useCustomContext from '../../hooks/useCustomContext';
import { NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BasketBody from './BasketBody/BasketBody'
import { RiArrowDropRightLine } from 'react-icons/ri'
import Delivery from './Delivery/Delivery'
import Payment from './Payment/Payment'

const Basket = () => {

  const {isAuth, setPath} = useCustomContext()
  const navigate = useNavigate()
  const { t } = useTranslation();
  const params = useParams()
  const [options, setOptions] = useState({isDelivery: false, isPayment: false})

  useEffect(() => {
    if(!isAuth) {
      setPath('/basket')
      return navigate('/login')
    } 
    checkOptions()
    return () => setOptions({isDelivery: false, isPayment: false})
  }, [params])

  function checkOptions() {
    if(!params['*']) return setOptions({isDelivery: false, isPayment: false})
      else {
        const arrayParams = params['*'].split('/')
        if(!arrayParams[1]) setOptions({isDelivery: true, isPayment: false})
        else setOptions({isDelivery: true, isPayment: true})    
      }
  }

  return (<section className='basket'>
              <div className="bread basket-bread">
                      {!options.isDelivery && !options.isPayment 
                      ? <>
                          <NavLink to={'/'}>{t('MAIN')}</NavLink>
                          <RiArrowDropRightLine />
                          <span>{t('basket')}</span>
                      </>
                      : <>
                            {options.isDelivery && !options.isPayment
                              ? <>
                                  <NavLink to={'/'}>{t('MAIN')}</NavLink>
                                  <RiArrowDropRightLine />
                                  <NavLink to={'/basket'}>{t('basket')}</NavLink>
                                  <RiArrowDropRightLine />
                                  <span>{t('delivery')}</span>
                                </>
                              : <>
                                  <NavLink to={'/'}>{t('MAIN')}</NavLink>
                                  <RiArrowDropRightLine />
                                  <NavLink to={'/basket'}>{t('basket')}</NavLink>
                                  <RiArrowDropRightLine />
                                  <NavLink to={'/basket/delivery'}>{t('delivery')}</NavLink>
                                  <RiArrowDropRightLine />
                                  <span>{t('pay')}</span>
                              </>
                            }    
                        </>
                      }
              </div>
              <Routes>
                  <Route path='/' element={<BasketBody />}  />
                  <Route path='/delivery' element={<Delivery />}  />
                  <Route path='/delivery/payment' element={<Payment />}  />
              </Routes>
          </section>);
}
export default Basket;