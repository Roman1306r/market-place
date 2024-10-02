import { useTranslation } from 'react-i18next';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { IoMdFemale } from "react-icons/io";
import { IoIosMale } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { FaInfo } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import {AdminInfoProps} from "../../../types/login.ts";
import useCustomContext from '../../../hooks/useCustomContext.ts'
import { memo } from 'react'

const Basic = memo(({user}: AdminInfoProps) => {
    
  const { t } = useTranslation();
  const {admin} = useCustomContext()
  
  return (<div className="me__basic">
              <div className="me__basic-header">
                <h2>{user?.firstName} {user?.lastName} {user?.id === admin.id && <span>({t('admin')})</span>}</h2>
              </div>
              <Stack sx={{ width: '100%' }} spacing={0}>
                <Alert icon={false} severity="success">{t('gender')}: {t(user?.gender)} {user?.gender == 'female' ? <IoMdFemale /> : <IoIosMale /> }</Alert>
                <Alert icon={false} severity="success">{t('age')}: {user?.age} <FaInfo /></Alert>
                <Alert icon={false} severity="success">{t('username')}: {user?.username} <IoLogInOutline /></Alert>
                <Alert icon={false} severity="success">{t('birthDate')}: {user?.birthDate} <FaBirthdayCake /></Alert>
                <Alert icon={false} severity="success">{t('role')}: {user?.role} <MdAdminPanelSettings /></Alert>
                <Alert icon={false} severity="success">{t('phone')}: {user?.phone} <FaPhoneAlt /></Alert>
                <Alert icon={false} severity="success">{'Email'}: {user?.email} <MdOutlineEmail /></Alert>
                <Alert icon={false} severity="success">{t('university')}: {user?.university} <FaUniversity/></Alert>
              </Stack>
              <p>{t('warningClient')}</p>
          </div>);
})
export default Basic;
