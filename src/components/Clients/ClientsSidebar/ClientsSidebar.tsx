import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import 'materialize-css';
import {ClientSidebarProps, User} from "../../../types/clients.ts";
import Users from "./Users/Users.tsx";
import Pagination from '@mui/material/Pagination';
import { Tooltip } from '@mui/material'
import { ArrowUpNarrowWide, UserRoundPlus, UserRoundSearch } from 'lucide-react'
import { m } from 'framer-motion'
import { memo } from 'react'

const ClientsSidebar = memo(({disabled, setSuccess, users, setUsers, switchPage, pagination}: ClientSidebarProps) => {

    const {t} = useTranslation();

    function sort(usersArray: User[], params1: string = '') {
        setSuccess(t('dataSorted'))
        if(!params1) return setUsers({...users, users: usersArray.sort((a, b) => a.id < b.id ? -1 : 1 )})
        else {
            return setUsers({...users, users: usersArray.sort((a, b) => a[params1 as keyof typeof a] < b[params1 as keyof typeof b] ? -1 : 1 )})
        }
    }

    const scrollTo = () => window.innerWidth < 768 ? window.scrollTo({top: 400, behavior: 'smooth'}) : false

    return (<m.aside 
                animate={{transform: disabled.all ? 'translateX(-200%)' : 'translateX(0%)', width: disabled.all ? '0px' : '30%', opacity: disabled.all ? '0' : '1'}}
                transition={{type: 'spring', stiffness: 150, damping: 20}}
                className={disabled.all ? 'clients__sidebar hide' : 'clients__sidebar'} >
                <h1>
                    <NavLink to={'/clients'}>{t('clientsTitle')}</NavLink>
                    <div>
                        <Tooltip title={t('search')}><NavLink className='clients__sidebar-new'  to={'/clients/search'}><UserRoundSearch /></NavLink></Tooltip>
                        <Tooltip title={t('newUser')}><NavLink onClick={scrollTo} className={disabled.btn ? 'clients__sidebar-new hide' : 'clients__sidebar-new'} to={'/clients/new'}><UserRoundPlus /></NavLink></Tooltip>
                    </div>
                </h1>
                <div className='clients__sidebar-sort'>
                    <button onClick={() => sort(users.users)}><ArrowUpNarrowWide size={15} /> ID</button>
                    <button onClick={() => sort(users.users, 'firstName')}><ArrowUpNarrowWide size={15} /> {t('name')}</button>
                    <button onClick={() => sort(users.users, 'age')}><ArrowUpNarrowWide size={15} /> {t('age')}</button>
                    <button onClick={() => sort(users.users, 'gender')}><ArrowUpNarrowWide size={15} /> {t('gender')}</button>
                </div>
                <ul className='clients__sidebar-container'>
                    {!users?.users.length ? <h3>{t('noClients')}</h3> : <Users users={users.users} />}
                </ul>
                <div className='clients__sidebar-pagination'>
                    <Pagination onChange={(event, page) => switchPage(event, page)} count={Math.ceil(users.total / pagination.limit)}  shape="rounded" />
                </div>
            </m.aside>);
})
export default ClientsSidebar;