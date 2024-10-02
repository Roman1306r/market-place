import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { returnCorrectAmountSymbols } from '../../../utils/utils';
import { FaFirefoxBrowser } from "react-icons/fa";
import { SiKeycdn } from "react-icons/si";
import {AdminInfoProps} from "../../../types/login.ts";
import { memo } from 'react'

const Private = memo(({user}: AdminInfoProps) => {
    
  const { t } = useTranslation();

  return (<div className='me__appearence'>
              <h2>{t('private')}</h2>
              <Stack sx={{ width: '100%' }} spacing={0}>
                  <Alert icon={false} severity="success">{t('ip')}: {user?.ip} <SiKeycdn/></Alert>
                  <Alert icon={false} severity="success">{t('userAgent')}: {t(returnCorrectAmountSymbols(user?.userAgent, 60))} <FaFirefoxBrowser/></Alert>
                  <Alert icon={false} severity="success">{t('ssn')}: {user?.ssn} <SiKeycdn/></Alert>
                  <Alert icon={false} severity="success">{t('macAddress')}: {user?.macAddress} <SiKeycdn/></Alert>
                  <Alert icon={false} severity="success">{t('ein')}: {user?.ein} <SiKeycdn/></Alert>
              </Stack>
              <p>{t('warningClient')}</p>
          </div>);
})
export default Private;
