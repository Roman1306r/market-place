import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { returnCorrectAmountNumbers } from '../../../utils/utils';
import { FaLandmarkFlag } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import {AdminInfoProps} from "../../../types/login.ts";
import { memo } from 'react'

const Adress = memo(({user}: AdminInfoProps) => {

  const { t } = useTranslation();

  return (<div className='me__address'>
              <h2>{t('address')}</h2>
              <Stack sx={{ width: '100%' }} spacing={0}>
                    <Alert icon={false} severity="success">{t('country')}: {user?.address?.country} <FaLandmarkFlag /></Alert>
                    <Alert icon={false} severity="success">{t('state')}: {t(user?.address?.state)} {t(user?.address?.stateCode)} <FaCity /></Alert>
                    <Alert icon={false} severity="success">{t('city')}: {t(user?.address?.city)} <FaCity /></Alert>
                    <Alert icon={false} severity="success">{t('address')}: {t(user?.address?.address)} <FaRegAddressCard /></Alert>
                    <Alert icon={false} severity="success">{t('zipcode')}: {t(user?.address?.postalCode)} <FaBarcode /></Alert>
                    <Alert icon={false} severity="success">{t('coords')}: {returnCorrectAmountNumbers(user?.address?.coordinates?.lat, 3)}, {returnCorrectAmountNumbers(user?.address?.coordinates?.lng, 3)} <FaMapMarkerAlt /></Alert>
              </Stack>
              <p>{t('warningClient')}</p>
          </div>);
})
export default Adress;