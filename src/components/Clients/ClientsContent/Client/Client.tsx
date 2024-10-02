import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { restApi } from '../../../../api/api.ts';
import { useTranslation } from 'react-i18next';
import {scrollToTopCallBack } from '../../../../utils/utils.ts';
import useCustomContext from '../../../../hooks/useCustomContext.ts';
import {ClientsProps, Post, User} from "../../../../types/clients.ts";
import ClientInfo from "./ClientInfo.tsx";
import {initialValues} from "../../../../data/data.ts";
import { Settings, UserRoundX } from 'lucide-react'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip } from '@mui/material'

const Client = memo(({setUsers, users, setError, setSuccess}: ClientsProps) => {

    const {t} = useTranslation();
    const {userId} = useParams<{userId: string}>()
    const [user, setUser] = useState<User>(initialValues.initialUser)
    const [defaultParams] = useState<{userId: number}>({userId: 1})
    const [post, setPost] = useState<Post[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const {setPreloader, admin, setIsAuth} = useCustomContext()
    const navigate = useNavigate()

    useEffect(() => {
      if(!userId) getInfoAboutUser(defaultParams.userId)
      else {
        const num: number = Number(userId)
        getInfoAboutUser(num)
      }
    }, [userId])

    async function getInfoAboutUser(id: number) {
      try {
        setPreloader(true)
        const response = await restApi.getSingleUser(id)
        const posts = await restApi.getUserPosts(id)
        setPost(posts.posts)
        setUser(response)
      } finally {
        setPreloader(false)
      }
    }
    
    async function deleteClient(id: number) {
      try {
        setPreloader(true)
        const responce = await restApi.deleteUser(id)
        if(responce.status > 199 && responce.status < 300 || responce.isDeleted) {
          setSuccess(t('deleteMessageSuccess'))
          setUsers({...users, users: users.users.filter((u: User) => u.id !== id)})
          navigate('/clients/' + (id + 1))
          setIsAuth(false)
        } else {
          setError(t('deleteMessageError'))
        }
      } finally {
        setOpen(false)
        setPreloader(false)
      }
    }

    return (<article className='client'>
                <ClientInfo post={post} user={user} />
                <Dialog
                          open={open}
                          onClose={() => setOpen(false)}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {t('deleteClientText')}
                          </DialogTitle>
                          <DialogActions>
                            <Button color='inherit' onClick={() => setOpen(false)}>{t('cancel')}</Button>
                            <Button color='success' onClick={() => scrollToTopCallBack(deleteClient(user?.id))} autoFocus>{t('confirm')}</Button>
                          </DialogActions>
                </Dialog>
                <div className='clients__bottom'>
                    {user.id === admin.id && <Tooltip title={t('edit')}><Button color='inherit' variant="text" onClick={() => scrollToTopCallBack(navigate('/clients/edit/' + user?.id))} className='edit'><Settings size={30} /></Button></Tooltip>}
                    <Tooltip title={t('delete') + ' ' + user?.firstName}><Button color='inherit' variant="text" onClick={() => setOpen(true)} className='delete'><UserRoundX size={30} /></Button></Tooltip>
                </div>
            </article>);
})
export default Client;