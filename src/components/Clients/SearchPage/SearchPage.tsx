import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import React, { memo, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import { restApi } from "../../../api/api"
import { initialValues } from "../../../data/data.ts"
import useCustomContext from "../../../hooks/useCustomContext"
import { SearchPageProps, User, UsersServer } from "../../../types/clients.ts"
import SearchBody from "./SearchBody/SearchBody.tsx"
import Search from './SearchTop/Search.tsx'
import FilterPage from './SearchTop/Filter.tsx'
import { Tooltip } from '@mui/material'
import { Filter } from 'lucide-react'

const SearchPage = memo(({ disabled, setDisabled }: SearchPageProps) => {

    const { t } = useTranslation()
    const [foundUsers, setFoundUsers] = useState<UsersServer>(initialValues.initialUsersServer)
    const { setPreloader } = useCustomContext()
    const [req, setReq] = useState<string>('')
    const [indicator, setIndicator] = useState<number>(-1)
    const [open, setOpen] = useState<boolean>(false)
    const [isFilter, setIsFilter] = useState<boolean>(false)

    useEffect(() => {
      setDisabled({ ...disabled, all: true })
      return () => setDisabled({ ...disabled, all: false })
    }, [])

    async function searchUsers() {
      try {
        if (req.length < 3) {
            setIndicator(-1)
            return setOpen(true)
        }
        setPreloader(true)
        const response = await restApi.searchUsers(req)
        if (response.total < 1) setIndicator(-1)
        else setIndicator(1)
        setFoundUsers(response)
        setReq('')
        setOpen(true)
      } finally {
        setPreloader(false)
        setTimeout(() => setOpen(false), 5000)
      }
    }

    async function filterUsers(key: string, value: string, isNested: boolean | string = false) {
      try {
          setPreloader(true)
          const response = await restApi.filterUsers(key, value, isNested)
          if (response.total < 1) setIndicator(-1)
          else setIndicator(1)
          setFoundUsers(response)
          setOpen(true)
      } finally {
          setPreloader(false)
          setTimeout(() => setOpen(false), 5000)
      }
    }

    function deleteUser(event: React.MouseEvent<HTMLButtonElement>, id: number) {
      event.preventDefault()
      setFoundUsers({ ...foundUsers, users: foundUsers.users.filter((user: User) => user?.id !== id) })
    }

    return (<div className="search">
                <div className='search__settings'>
                  <div className="search-bread ">
                    <span>{isFilter ? t('filter') : t('search')}</span>
                  </div>
                  <ButtonGroup size="small" aria-label="Small button group">
                    <Tooltip title={t('search')}><Button onClick={() => setIsFilter(false)} disabled={!isFilter && true} color="success"><SearchIcon /></Button></Tooltip>
                    <Tooltip title={t('filter')}><Button onClick={() => setIsFilter(true)} disabled={isFilter && true} color="success"><Filter /></Button></Tooltip>
                  </ButtonGroup>
                </div>
                {isFilter
                  ? <FilterPage filterUsers={filterUsers} indicator={indicator} foundUsers={foundUsers} open={open} />
                  : <Search req={req} setReq={setReq} searchUsers={searchUsers} indicator={indicator} foundUsers={foundUsers} open={open} />
                }
                <SearchBody isFilter={isFilter} foundUsers={foundUsers} deleteUser={deleteUser} />
            </div>)
})
export default SearchPage
