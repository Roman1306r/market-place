import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { FaRegAddressCard } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa";
import { SiTheboringcompany } from "react-icons/si";
import { GiUrsaMajor } from "react-icons/gi";
import { MdManageAccounts } from "react-icons/md";
import {AdminInfoProps} from "../../../types/login.ts";
import { memo } from 'react'

const Company = memo(({user}: AdminInfoProps) => {
    
  const { t } = useTranslation();

  return (<div className='me__company'>
              <h2>{t('company')}</h2>
              <Stack sx={{ width: '100%' }} spacing={0}>
                  <Alert icon={false} severity="success">{t('nameProduct')}: {user?.company?.name} <SiTheboringcompany/></Alert>
                  <Alert icon={false} severity="success">{t('major')}: {user?.company?.title} <GiUrsaMajor/></Alert>
                  <Alert icon={false} severity="success">{t('department')}: {user?.company?.department} <MdManageAccounts/></Alert>
                  <Alert icon={false} severity="success">{t('address')}: {user?.company?.address?.country} - {user?.company?.address?.state} {user?.company?.address?.stateCode} - {user?.company?.address?.city}
                  - {user?.company?.address?.address} <FaRegAddressCard /></Alert>
                  <Alert icon={false} severity="success">{t('coords')}: {user?.company?.address?.coordinates?.lat}, {user?.company?.address?.coordinates?.lng}  <FaMapMarkerAlt /></Alert>
                  <Alert icon={false} severity="success">{t('zipcode')}: {user?.company?.address?.postalCode} <FaBarcode /></Alert>
              </Stack>
              <p>{t('warningClient')}</p>
          </div>);
})
export default Company;
