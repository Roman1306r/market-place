import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Info } from 'lucide-react'
import { scrollToTopCallBack } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
import { actionsSpeedDial } from '../../data/data'
import { useTranslation } from 'react-i18next'

export default function BasicSpeedDial() {

  const navigate = useNavigate()
  const { t } = useTranslation();

  return (<SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 56, left: 10 }}
            icon={<Info />}
          >
              {actionsSpeedDial.map((action) => ( <SpeedDialAction
                key={t(action.name)}
                icon={<action.icon />}
                tooltipTitle={t(action.name)}
                onClick={() => action.isNewTab ? window.open(action.link, '_blank') : scrollToTopCallBack(navigate('/contacts'))}
              />
              ))}
          </SpeedDial>);
}