import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import useCustomContext from '../../../hooks/useCustomContext'
import { IProduct } from '../../../types/products'
import { restApi } from '../../../api/api'
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { main } from '../../../data/data'
import { useEffect, useState } from 'react'
import { createProduct, scrollToTopCallBack } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    
	const { t } = useTranslation();
	const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<IProduct>();
	const {setPreloader} = useCustomContext()
	const [isOk, setIsOk] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		setValue('shippingInformation', 'Ships in 1 month')
		setValue('returnPolicy', 'No return policy')
		setValue('warrantyInformation', '3 months warranty')
		setValue('weight', 1)
		setValue('dimensions.depth', 1)
		setValue('dimensions.width', 1)
		setValue('dimensions.height', 1)
	}, [])

	const onSubmit: SubmitHandler<IProduct> = async (data: IProduct) => {
		try {
			setPreloader(true)
			const body = createProduct(data)
			const response = await restApi.addProduct(body)
			if(response?.id) {
				reset()
				setIsOk(true)
			}
		} finally {
			setPreloader(false)
		}
	}

	return (<form onSubmit={handleSubmit(onSubmit)} className='add'>
					<h2>{t('newProduct')}</h2>
					<Dialog
							open={isOk}
							onClose={() => setIsOk(false)}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
							sx={{cursor: 'pointer'}}
							>
								<DialogTitle id="alert-dialog-title">
										{t('createdProduct')}
								</DialogTitle>
								<DialogActions>
										<Button color='inherit' onClick={() => setIsOk(false)}>{t('close')}</Button>
										<Button variant='contained' color='success' onClick={() => scrollToTopCallBack(navigate('/catalog'))} autoFocus>{t('Каталог')}</Button>
								</DialogActions>		
					</Dialog>
					<Collapse in={!!errors.title}>
							<Alert severity="error">{t('errorValidation')}</Alert>  
					</Collapse>
					<TextField autoFocus fullWidth {...register("title", {required: true, maxLength: 50})} color="success"
								id="outlined-basic" label={t('title') + '*'} variant="standard" />
					<Collapse in={!!errors.description}>
							<Alert severity="error">{t('errorValidation')}</Alert>  
					</Collapse>
					<TextField fullWidth {...register("description", {required: true, maxLength: 180})} color="success"
								id="outlined-basic" label={t('description') + '*'} variant="standard" />
					<Collapse in={!!errors.amount || !!errors.price || !!errors.discountPercentage}>
							<Alert severity="error">{t('errorValidation')}</Alert>  
					</Collapse>
					<div className='add__row'>
						<TextField type='number' fullWidth {...register("amount", {required: true, min: 1, max: 1000})} color="success"
								id="outlined-basic" label={t('amount') + '*'} variant="standard" />
						<TextField type='number' fullWidth {...register("price", {required: true, min: 0.5, max: 50000})} color="success"
								id="outlined-basic" label={t('price') + '*'} variant="standard" />
						<TextField type='number' fullWidth {...register("discountPercentage", {required: true, min: 0.5, max: 50000})} color="success"
								id="outlined-basic" label={t('sale') + '*'} variant="standard" />
					</div>
					
					<Collapse in={!!errors.brand}>
							<Alert severity="error">{t('errorValidation')}</Alert>  
					</Collapse>
					<TextField fullWidth {...register("brand", {required: true, maxLength: 50})} color="success"
								id="outlined-basic" label={t('brand') + '*'} variant="standard" />
					<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="demo-simple-select-standard-label">{t('category')}</InputLabel>
						<Select
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-standard"
						{...register("category", {required: true})}
						label={t('category')}
						>
							<MenuItem disabled value=""><em>{t('any')}</em></MenuItem>
							{main.sliderInfo.map(c => <MenuItem key={c.id} value={c.title}>{t(c.title)}</MenuItem>)}
						</Select>
					</FormControl>
					<Collapse in={!!errors.weight || !!errors.dimensions}>
							<Alert severity="error">{t('errorValidation')}</Alert>  
					</Collapse>
					<div className='add__row'>
						<TextField type='number' fullWidth {...register("weight", {required: true, min: 1, max: 1000})} color="success"
								id="outlined-basic" label={t('weight') + '*'} variant="standard" />
						<TextField type='number' fullWidth {...register("dimensions.depth", {required: true, min: 1, max: 1000})} color="success"
								id="outlined-basic" label={t('depth') + '*'} variant="standard" />
						<TextField type='number' fullWidth {...register("dimensions.width", {required: true, min: 1, max: 1000})} color="success"
								id="outlined-basic" label={t('width') + '*'} variant="standard" />
						<TextField type='number' fullWidth {...register("dimensions.height", {required: true, min: 1, max: 1000})} color="success"
								id="outlined-basic" label={t('height') + '*'} variant="standard" />
					</div>
					<Collapse in={!!errors.returnPolicy || !!errors.shippingInformation || !!errors.warrantyInformation}>
									<Alert severity="error">{t('errorValidation')}</Alert>  
					</Collapse>
					<div className='add__row'>					
								<TextField fullWidth {...register("returnPolicy", {required: true, maxLength: 100})} color="success" id="outlined-basic" label={t('returnPolicy') + '*'} variant="standard" />
								<TextField fullWidth {...register("shippingInformation", {required: true, maxLength: 100})} color="success" id="outlined-basic" label={t('ships') + '*'} variant="standard" />
								<TextField fullWidth {...register("warrantyInformation", {required: true, maxLength: 100})} color="success" id="outlined-basic" label={t('mainInfoTitle') + '*'} variant="standard" />	
					</div>
					<Button sx={{marginTop: '20px'}} type="submit" variant="contained" color="success">{t('add')}</Button>
			</form>);
}
export default Add;