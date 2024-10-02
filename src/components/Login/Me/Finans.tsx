import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { FaIdCard } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { CiBitcoin } from "react-icons/ci";
import { FaWallet } from "react-icons/fa6";
import {AdminInfoProps} from "../../../types/login.ts";
import { memo } from 'react'

const Finans = memo(({user}: AdminInfoProps) => {

  const { t } = useTranslation();

  return (<div className='me__appearence'>
              <h2>{t('finans')}</h2>
              <Stack sx={{ width: '100%' }} spacing={0}>
                  <h4>{t('bank')}</h4>
                  <Alert icon={false} severity="success">{t('cardType')}: {user?.bank?.cardType} <FaIdCard/></Alert>
                  <Alert icon={false} severity="success">{t('cardNumber')}: {user?.bank?.cardNumber} <FaIdCard/></Alert>
                  <Alert icon={false} severity="success">{t('cardExpire')}: {user?.bank?.cardExpire} <FaIdCard/></Alert>
                  <Alert icon={false} severity="success">{t('currency')}: {user?.bank?.currency} <BsCurrencyDollar/></Alert>
                  <Alert icon={false} severity="success">{'iban'}: {user?.bank?.iban} <CiBank/></Alert>
                  <h4>{t('crypto')}</h4>
                  <Alert icon={false} severity="success">{'Coin'}: {user?.crypto?.coin} {user?.crypto?.network}<CiBitcoin/></Alert>
                  <Alert icon={false} severity="success">{t('wallet')}: {user?.crypto?.coin} {user?.crypto?.wallet}<FaWallet/></Alert>
              </Stack>
              <p>{t('warningClient')}</p>
          </div>);
})
export default Finans;
