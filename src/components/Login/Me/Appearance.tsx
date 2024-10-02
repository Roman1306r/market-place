import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { IoMdFemale } from "react-icons/io";
import { IoIosMale } from "react-icons/io";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightScale } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { GiHairStrands } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";
import {AdminInfoProps} from "../../../types/login.ts";
import { memo } from 'react'

const Appearance = memo(({user}: AdminInfoProps) => {
    
  const { t } = useTranslation();

  return (<div className='me__appearence'>
              <h2>{t('appearance')}</h2>
              <Stack sx={{ width: '100%' }} spacing={0}>
                  <Alert icon={false} severity="success">{t('gender')}: {t(user?.gender)} {user?.gender == 'female' ? <IoMdFemale /> : <IoIosMale /> }</Alert>
                  <Alert icon={false} severity="success">{t('height')}: {user?.height} <GiBodyHeight/></Alert>
                  <Alert icon={false} severity="success">{t('weight')}: {user?.weight} <FaWeightScale/></Alert>
                  <Alert icon={false} severity="success">{t('eyeColor')}: {user?.eyeColor} <FaEye/></Alert>
                  <Alert icon={false} severity="success">{t('hair')}: {user?.hair?.color}, {user?.hair?.type} <GiHairStrands/></Alert>
                  <Alert icon={false} severity="success">{t('bloodGroup')}: {user?.bloodGroup} <MdBloodtype/></Alert>
              </Stack>
              <p>{t('warningClient')}</p>
          </div>);
})
export default Appearance;