import { useTranslation } from 'react-i18next';
import CeilingFooter from "./Ceiling/CeilingFooter.tsx";
import { Tooltip } from '@mui/material'
import { getDateToday } from '../../utils/utils.ts'
import { CalendarDays, Github } from 'lucide-react'

const Footer = () => {

    const { t } = useTranslation();
    const {date, month, year} = getDateToday()

    return (<footer className='footer'>
                <CeilingFooter />
                <div className='footer__floor'>
                    <span><CalendarDays /> {`${date}.${month}.${year}`}</span>
                    <span>{t('createText')} <Tooltip title="Roman1306r"><a target='_blank' href='https://github.com/Roman1306r'><Github /></a></Tooltip></span>
                </div>
            </footer>);
}
export default Footer;