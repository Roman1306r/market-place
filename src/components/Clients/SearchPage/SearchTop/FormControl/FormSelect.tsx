import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ControlProps } from '../../../../../types/clients'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

const FormSelect = memo(({value, setValue, labels, param}: ControlProps) => {

	const { t } = useTranslation()

	return (<FormControl fullWidth>
				<InputLabel id="demo-simple-select-helper-label">{t(param)}</InputLabel>
				<Select
				labelId="demo-simple-select-helper-label"
				id="demo-simple-select-helper"
				value={value}
				label={t(param)}
				onChange={(event: any) => setValue(event, param)}
				>
					<MenuItem disabled value="any">{t('any')}</MenuItem>
					{labels.map((val: string) => <MenuItem key={val} value={val}>{val}</MenuItem>)}
				</Select>
			</FormControl>);
})
export default FormSelect;