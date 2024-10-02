import { useState, useEffect, ChangeEvent } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import Client from './ClientsContent/Client/Client';
import 'materialize-css';
import FormClient from './ClientsContent/FormClient/FormClient';
import useCustomContext from '../../hooks/useCustomContext';
import SearchPage from './SearchPage/SearchPage';
import {Disabled, UsersServer} from "../../types/clients.ts";
import {initialValues} from "../../data/data.ts";
import ClientsSidebar from "./ClientsSidebar/ClientsSidebar.tsx";
import {restApi} from "../../api/api.ts";
import {scrollToTop} from "../../utils/utils.ts";
import { RiArrowDropRightLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { m } from 'framer-motion'
import Snackbar from '@mui/material/Snackbar';

const Clients = () => {

      const [users, setUsers] = useState<UsersServer>(initialValues.initialUsersServer)
      const navigate = useNavigate();
      const [error, setError] = useState<null | string>(null)
      const [success, setSuccess] = useState<null | string>(null)
      const {isAuth, setPreloader, setPath} = useCustomContext()
      const [disabled, setDisabled] = useState<Disabled>({btn: false, all: false})
      const [pagination, setPagination] = useState({skip: 0, limit: window.innerWidth < 768 ? 5 : 10})
      const { t } = useTranslation()
      const params = useParams()

      useEffect(() => {
            if(!isAuth) {
                  setPath('/clients')
                  return navigate('/login')
            } 
            scrollToTop()
            render(pagination.limit, pagination.skip)  
      }, [])

      useEffect(() => {
            if(params['*'] !== 'new') setDisabled({btn: false, all: false})
      }, [params])

      async function render(limit: number = 10, skip: number = 0) {
            setPreloader(true)
            try {
                const usersInfo = await restApi.getUsersAll(limit, skip)
                setUsers(usersInfo);
                setPagination({...pagination, skip: usersInfo.skip})
                return {total: usersInfo.total}
            } finally {
                setPreloader(false)
            }
      }

      function switchPage(_event: ChangeEvent<unknown>, page: number) {
            scrollToTop()
            const skip: number = --page * pagination.limit
            render(pagination.limit, skip)
      }

      const handleClose = (_event: React.SyntheticEvent | Event) => {
            setSuccess(null);
            setError(null)
      };

      return (<>
                  <div className="bread clients-bread">
				<NavLink to={'/'}>{t('MAIN')}</NavLink>
				<RiArrowDropRightLine />
                        {disabled.all ? <>
                                          <NavLink to={'/clients'}>{t('clientsTitle')}</NavLink>
                                                <RiArrowDropRightLine />
                                                <span>{t('search')} / {t('filter')}</span>
                                          </>
                        : <span>{t('clientsTitle')}</span>}
			</div>
                  <Snackbar
                        open={!!success || !!error}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={success || error}
                  />
                  {window.innerWidth < 768 && <ClientsSidebar users={users} setUsers={setUsers} disabled={disabled} setSuccess={setSuccess} switchPage={switchPage} pagination={pagination} />}
                  <section className={disabled.all ? 'clients search' : 'clients'}>
                        {window.innerWidth > 767 && <ClientsSidebar users={users} setUsers={setUsers} disabled={disabled} setSuccess={setSuccess} switchPage={switchPage} pagination={pagination} />}
                        <m.article 
                              animate={{width: disabled.all ? '100%' : '70%'}}
                              transition={{type: 'spring', stiffness: 200, damping: 10}}
                              className='clients__content'>
                                    <Routes >
                                          <Route path='/new' element={<FormClient disabled={disabled} setDisabled={setDisabled} users={users.users} setError={setError} setSuccess={setSuccess} />}  />
                                          <Route path='/edit/:id?' element={<FormClient disabled={disabled} setDisabled={setDisabled} users={users.users} setError={setError} setSuccess={setSuccess} />}  />
                                          <Route path='/' element={<Client setSuccess={setSuccess} setError={setError} users={users} setUsers={setUsers} />}  />
                                          <Route path='/:userId?' element={<Client setSuccess={setSuccess} setError={setError} users={users} setUsers={setUsers} />}  />
                                          <Route path='/search' element={<SearchPage disabled={disabled} setDisabled={setDisabled} />} />
                                    </Routes>
                        </m.article>
                  </section>
            </>);
}
export default Clients;