import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import React, { memo } from "react"
import { useTranslation } from 'react-i18next'
import useCustomContext from "../../../../hooks/useCustomContext.ts"
import { SearchTopProps } from "../../../../types/clients.ts"

const Search = memo(({ req, setReq, searchUsers, indicator, foundUsers, open }: SearchTopProps) => {

    const { t } = useTranslation()
    const { preloader } = useCustomContext()

    return (<>
                <div className="search__header">
                    <TextField autoFocus fullWidth value={req} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setReq(event.target.value)} color="success" id="outlined-basic" label={t('name')} variant="standard" />
                    <Button size="large" disabled={preloader && true} onClick={searchUsers} variant="contained" color="success">{t('search')}</Button>
                </div>
                <div className="search__medium">
                    <Collapse in={open}>
                        {indicator > 0 && <Alert severity="success">{foundUsers?.total} {t('searchSuccessText')}</Alert>}
                        {indicator < 0 && <Alert severity="error">{t('searchErrorText')}</Alert>}
                    </Collapse>
                </div>
            </>)
})
export default Search
