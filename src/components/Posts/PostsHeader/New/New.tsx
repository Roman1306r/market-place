import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import useCustomContext from '../../../../hooks/useCustomContext'
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button';
import { NewValues, PostsNewProps } from '../../../../types/posts'
import { restApi } from '../../../../api/api'
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete';

const New = memo(({setIsOpen}: PostsNewProps) => {

	const { register, handleSubmit, resetField, formState: { errors } } = useForm<NewValues>();
	const [govern, setGovern] = useState<{isOK: boolean, isError: boolean}>({isOK: false, isError: false})
	const {setPreloader, admin, isAuth, setPath} = useCustomContext()
	const [tags, setTags] = useState<string[]>([])
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [tagsAll, setTagsAll] = useState<string[]>([])

	useEffect(() => {
		if(!isAuth) {
			setPath('/posts')
			return navigate('/login')
		} 
		getTagsAll()
	}, [])

	const onSubmit: SubmitHandler<NewValues> = async (data: NewValues) => {
        try {
            setPreloader(true)
			const body = {
				title: data.title,
				body: data.desc,
				tags: tags,
				reactions: {
				  likes: 0,
				  dislikes: 0
				},
				views: 1,
				userId: admin.id
			}
			const response = await restApi.addNewPost(body)
			if(response.id) {
				setGovern({...govern, isOK: true})
				resetField('desc')
				resetField('title')
				setTags([])
			} else {
				setGovern({...govern, isError: true})
			}
        } finally {
            setPreloader(false)
			setTimeout(() => {
				setGovern({isOK: false, isError: false})
				setIsOpen(false)
			}, 3000)
        }
    }

	async function getTagsAll() {
		const responce = await restApi.getStringsTagsAll()
		setTagsAll(responce)
	}

	return (<div className='new'>
					<div className='new__info'>
							<Collapse in={!!errors.title || !!errors.desc || govern.isOK || govern.isError}>
								{govern.isOK ? <Alert severity="success"> {t('successOperation')}</Alert> : <Alert severity="error"> {t('errorValidation')}</Alert>}
							</Collapse>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className='new__form'>
							<TextField autoFocus fullWidth {...register("title", {required: true, maxLength: 80, minLength: 5})} color="success"
									id="outlined-basic" label={t('title') + '*'} variant="standard"/>
							<TextField multiline rows={2} fullWidth {...register("desc", {required: true, maxLength: 400, minLength: 5})} color="success"
									id="outlined-basic" label={t('desc') + '*'} variant="standard"/>
							<Autocomplete
								multiple
								id="tags-standard"
								onChange={(_event: React.SyntheticEvent, value: string[]) => value.length > 3 ? false : setTags(value)}
								options={tagsAll}
								value={tags}
								getOptionLabel={(option) => option}
								renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									label={t('tags')}
								/>
								)}
							/>
							<Button type='submit' size='large' variant="contained" color="success">{t('submit')}</Button>
					</form>
					<Button onClick={() => setIsOpen(false)} className='close' size='small' type='submit' variant="text" color="success">{t('collapse')}</Button>
			</div>
	);
})
export default New;