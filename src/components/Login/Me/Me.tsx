import useCustomContext from "../../../hooks/useCustomContext";
import { useTranslation } from 'react-i18next';
import { restApi } from "../../../api/api";
import { NavLink, useNavigate } from "react-router-dom";
import BoxContainer from "./Box/Box.tsx";
import { RiArrowDropRightLine } from 'react-icons/ri'
import { Button, ButtonGroup, Dialog, DialogActions, DialogTitle } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { LogOut, UserPen, UserX } from 'lucide-react'
import { useState } from 'react'

const Me = () => {

  const {setIsAuth, setPreloader, admin} = useCustomContext()
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [open, setOpen] = useState({delete: false, out: false});

  async function deleteUser() {
    try {
          setPreloader(true)
          const responce = await restApi.deleteUser(admin.id)
          if(responce.status > 199 && responce.status < 300 || responce.isDeleted) {
            alert('Пользователь удален')
            setIsAuth(false)
          } else alert('Что-то пошло не так. Попробуйте еще раз!')
    } finally {
      setPreloader(false)
      setOpen({delete: false, out: false})
    }
  }

  function goOut() {
    setIsAuth(false)
    setOpen({delete: false, out: false})
  }

  return (<div className="login__me">
              <div className="bread">
                <NavLink to={'/'}>{t('MAIN')}</NavLink>
                <RiArrowDropRightLine />
                <span>{t('admin')}</span>
              </div>
              <BoxContainer />
              <div className="login__me-btns">
                  <Dialog
                    open={open.out || open.delete}
                    onClose={() => setOpen({delete: false, out: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                      <DialogTitle id="alert-dialog-title">
                        {open.delete ? t('deleteAdminText') : t('goOutText')}
                      </DialogTitle>
                      <DialogActions>
                        <Button color='inherit' onClick={() => setOpen({delete: false, out: false})}>{t('cancel')}</Button>
                        <Button color='success' onClick={open.delete ? deleteUser : goOut} autoFocus>{t('confirm')}</Button>
                      </DialogActions>
                  </Dialog>
                  <ButtonGroup fullWidth variant="text" color='inherit' aria-label="Loading button group">
                      <LoadingButton onClick={() => navigate('/clients/edit/' + admin?.id)} startIcon={<UserPen />}>{t('edit')}</LoadingButton>
                      <LoadingButton loading={open.out} onClick={() => setOpen({...open, out: true})} loadingPosition="start" startIcon={<LogOut />}>{t('go out')}</LoadingButton>
                      <LoadingButton onClick={() => setOpen({...open, delete: true})} loading={open.delete} loadingPosition="start" startIcon={<UserX />}>{t('delete')}</LoadingButton>
                  </ButtonGroup>
              </div>
          </div>);
}
export default Me;