import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { restApi } from '../../../../api/api.ts';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { memo, useEffect, useState } from 'react';
import { FaStarOfLife } from "react-icons/fa";
import useCustomContext from '../../../../hooks/useCustomContext.ts';
import {createNewClientObject, getCurrentUser, scrollToTop} from '../../../../utils/utils.ts';
import {ClientValues, FormClientProps, NewClient, User} from "../../../../types/clients.ts";
import TextField from '@mui/material/TextField';

const FormClient = memo(({setError, setSuccess, users, setDisabled, disabled}: FormClientProps) => {

    const navigate = useNavigate()
    const {t} = useTranslation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ClientValues>();
    const [isShrink, setShrink] = useState<{ shrink: boolean } | undefined>(undefined)
    const {setPreloader} = useCustomContext()
    const params = useParams<{id: string}>()
    const [editUser, setEditUser] = useState<User | undefined>(undefined)

    useEffect(() => {
      setDisabled({...disabled, btn: true})
      return () => setDisabled({...disabled, btn: false})
    }, []);

    useEffect(() => {
      restApi.getMyIp().then(res => setValue("ip", res ?? ''))
      if(params?.id && users) {
          let found = users.find(u => u.id === Number(params!.id))
          found ? setEditUser(found) : getCurrentUser(Number(params!.id), setEditUser)
      }
    }, [users])

    useEffect(() => {
        if(editUser) setShrink({shrink: true})
        fillFields()
    }, [editUser])

    const onSubmit: SubmitHandler<ClientValues> = async (data: ClientValues) => {
      try {
            setPreloader(true)
            const newClient: NewClient = createNewClientObject(data)
            let response: User;
            if(editUser) response = await restApi.editUser(newClient, editUser?.id)
            else response = await restApi.addNewUser(newClient)
            if(typeof response !== 'number') {
              editUser ?  setSuccess(t('successEdit')) : setSuccess(t('successAdd'))
              scrollToTop()
              setTimeout(() => {
                editUser ?  navigate('/clients/' + editUser?.id) : navigate('/clients/')
              }, 3000)
            } else {
              scrollToTop()
              setError(t('failedOperation'))
            }
      } finally {
            setPreloader(false)
      }
    }

    function fillFields() {
        setValue("firstname", editUser?.firstName ?? '')
        setValue("lastname", editUser?.lastName ?? '')
        setValue("username", editUser?.username ?? '')
        setValue("phone", editUser?.phone ?? '')
        setValue("age", String(editUser?.age) ?? '')
        setValue("country", editUser?.address?.country ?? '')
        setValue("city", editUser?.address?.city ?? '')
        setValue("company", editUser?.company?.name ?? '')
        setValue("major", editUser?.company?.title ?? '')
    }

    return (<div className='form__client'>
                <h2>{editUser ? t('editTitle') + ' ' + editUser?.firstName : t('addNewClient')}</h2>
                <p><FaStarOfLife /> - {t('fieldsWithStar')}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='login__form-container'>
                        <h4>
                            {t('basicInfo')}
                            {errors.firstname || errors.lastname || errors.username || errors.phone || errors.age ?
                                <Alert severity="error">{t('errorValidation')}</Alert> :
                                <Alert severity="warning">{t('warningTextNewUser')}</Alert>}
                        </h4>
                        <div>
                            <TextField autoFocus InputLabelProps={isShrink} fullWidth {...register("firstname", {required: true, maxLength: 80})}  color="success" id="outlined-basic" label={t('name') + '*'} variant="outlined" />
                            <TextField InputLabelProps={isShrink} fullWidth {...register("lastname", {required: true, maxLength: 80})}  color="success" id="outlined-basic" label={t('lastname') + '*'} variant="outlined" />
                            <TextField InputLabelProps={isShrink} fullWidth {...register("username", {required: true, maxLength: 80})}  color="success" id="outlined-basic" label={t('username') + '*'} variant="outlined" />
                            <TextField InputLabelProps={isShrink} fullWidth {...register("phone", {required: true, maxLength: 80})}  color="success" id="outlined-basic" label={t('phone') + '*'} variant="outlined" />
                            <TextField InputLabelProps={isShrink} type="number" fullWidth {...register("age", { min: 6, max: 99 })}  color="success" id="outlined-basic" label={t('age')} variant="outlined" />
                      </div>
                    </div>
                    <div className='login__form-container'>
                      <h4>
                          {t('address')}
                          {errors.country || errors.city ? <Alert severity="error">{t('errorValidation')}</Alert> : <Alert severity="warning">{t('warningTextNewUser')}</Alert>}
                        </h4>
                      <div>
                            <TextField InputLabelProps={isShrink} fullWidth {...register("country", {required: true, maxLength: 80})}  color="success" id="outlined-basic" label={t('country') + '*'} variant="outlined" />
                            <TextField InputLabelProps={isShrink} fullWidth {...register("city", {required: true, maxLength: 80})}  color="success" id="outlined-basic" label={t('city') + '*'} variant="outlined" />
                        </div>
                    </div>
                    <div className='login__form-container'>
                        <h4>
                          {t('company')}
                          {errors.company || errors.major ? <Alert severity="error">{t('errorValidation')}</Alert> : <Alert severity="warning">{t('warningTextNewUser')}</Alert>}
                        </h4>
                        <div>
                            <TextField InputLabelProps={isShrink} fullWidth {...register("company", {required: true, maxLength: 80})}  color="success" id="outlined-basic" label={t('company') + '*'} variant="outlined" />
                            <TextField InputLabelProps={isShrink} fullWidth {...register("major", {maxLength: 80})}  color="success" id="outlined-basic" label={t('major')} variant="outlined" />
                        </div>
                    </div>
                    <div className='login__form-container'>
                        <h4>
                            {t('private')}
                            {errors.userAgent || errors.ip ? <Alert severity="error">{t('errorValidation')}</Alert> :
                                <Alert severity="warning">{t('privateNewUser')}</Alert>}
                        </h4>
                        <div>
                            <TextField InputLabelProps={{shrink: true}} fullWidth defaultValue={navigator.userAgent} {...register("userAgent")}  color="success" id="outlined-basic" label={t('Browser')} variant="outlined" />
                            <TextField InputLabelProps={{shrink: true}} fullWidth {...register("ip", {maxLength: 80})}  color="success" id="outlined-basic" label="IP" variant="outlined" />
                        </div>
                    </div>
                    <input value={t('submit')} className='login__form-submit' type="submit" />
                </form>
            </div>);
})
export default FormClient;
