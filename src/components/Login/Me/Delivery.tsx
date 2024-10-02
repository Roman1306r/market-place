import { Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Delivery = () => {

	const { t } = useTranslation();

	return (<div className='purchases'>
				<h2>{t('delivery')}</h2>
				<Alert icon={false} sx={{width: '100%'}} variant="outlined" severity="success">{t('notDelivery')}</Alert>
			</div>);
}
export default Delivery;