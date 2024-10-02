import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { restApi } from '../../../api/api';
import useCustomContext from '../../../hooks/useCustomContext';
import { useNavigate } from 'react-router-dom';
import {checkFieldsFormLogin, timeoutExit} from "../../../utils/utils.ts";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import {LoginValues} from "../../../types/login.ts";
import {useState} from "react";
import TextField from '@mui/material/TextField';
import { ShieldAlert } from 'lucide-react'

const LoginForm = () => {

    const { t } = useTranslation();
    const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm<LoginValues>();
    const {setPreloader, setIsAuth, setAdmin, path, setPath} = useCustomContext()
    const navigate = useNavigate()
    const [notLogin, setNotLogin] = useState<boolean>(false)
    const [isShrink, setShrink] = useState<{ shrink: boolean } | undefined>(undefined)

    function addNewAccount() {
        setShrink({shrink: true})
        setValue("username", "emilys")
        setValue("password", "emilyspass")
    }
    function resetLoginForm() {
        resetField("username")
        resetField("password")
    }

    const onSubmit: SubmitHandler<LoginValues> = async (data: LoginValues) => {
        try {
            setPreloader(true)
            const response = await restApi.login(data.username, data.password)
            if(response.accessToken) {
                setIsAuth(true)
                resetLoginForm()
                const dataAdmin = await restApi.getAdmin(response.accessToken)
                setAdmin(dataAdmin?.data)
                timeoutExit(dataAdmin!.SEANS, response.refreshToken, navigate, continueLogin, setIsAuth)
                if(path) {
                    navigate(path)
                    setPath('')
                } 
            } else setNotLogin(true)
        } finally {
            setPreloader(false)
        }
    }

    async function continueLogin(refreshToken: string) {
        try {
            setPreloader(true)
            const response = await restApi.refreshAuth(refreshToken)
            if(response?.data.accessToken) timeoutExit(response!.SEANS, response?.data.refreshToken, navigate, continueLogin, setIsAuth)
            else setIsAuth(false)
        } finally {
            setPreloader(false)
        }
    }

    return (<form className='login__form' onSubmit={handleSubmit(onSubmit)}>
                <h2>{t('login')}</h2>
                <div className='login__form-container'>
                    <Collapse in={checkFieldsFormLogin(errors) || notLogin}>
                        {notLogin ? <Alert severity="error">{t('errorValidation')}</Alert> :
                            <Alert severity="error">{t('required')}</Alert>}
                    </Collapse>
                    <TextField InputLabelProps={isShrink} autoFocus fullWidth {...register("username", {required: true, maxLength: 80})} color="success"
                               id="outlined-basic" label={t('username') + '*'} variant="outlined"/>
                    <TextField InputLabelProps={isShrink} fullWidth {...register("password", {required: true, maxLength: 80})} color="success"
                               id="outlined-basic" label={t('password') + '*'} variant="outlined"/>
                </div>
                <p onClick={addNewAccount} className='login__form-notacc'><ShieldAlert color='grey' />{t('not-acc')}</p>
                <input value={t('sign in')} className='login__form-submit' type="submit"/>
            </form>);
}
export default LoginForm;