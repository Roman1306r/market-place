import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next'
import { ControlProps } from '../../../../../types/clients'
import { memo } from 'react'

const Control = memo(({value, setValue, labels, param}: ControlProps) => {

	const { t } = useTranslation()

	return (<FormControl >
                    <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={value}
                                onChange={(event) => setValue(event, param)}
                            >
                                <FormControlLabel value='any' control={<Radio color="success" />} disabled label={t('any')} />
								{labels.map((val: string) => <FormControlLabel key={val} value={val} control={<Radio color="success" />} label={t(val)} />)}
                    </RadioGroup>
            </FormControl>);
})
export default Control;