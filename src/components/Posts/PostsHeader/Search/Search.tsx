import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import useCustomContext from '../../../../hooks/useCustomContext'
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button';
import {  IPost, PostsSearchProps, PostsServer, SearchValues } from '../../../../types/posts'
import { restApi } from '../../../../api/api'
import { ChangeEvent, memo, MouseEvent, useState } from 'react'
import { initialValues } from '../../../../data/data'
import { checkWritingNum, scrollToTop, scrollToTopCallBack } from '../../../../utils/utils'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { TextSearch } from 'lucide-react';

const Search = memo(({setIsOpen}: PostsSearchProps) => {

	const { register, handleSubmit, resetField, formState: { errors } } = useForm<SearchValues>();
	const {setPreloader} = useCustomContext()
	const [searched, setSearched] = useState<PostsServer>(initialValues.initialPosts)
	const [govern, setGovern] = useState<{isOk: boolean, isError: boolean}>({isOk: false, isError: false})
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [pagination, setPagination] = useState({pageCount: 5, directive: 0})

	const onSubmit: SubmitHandler<SearchValues> = async (data: SearchValues) => {
        try {
            setPreloader(true)
			const responce = await restApi.searchPosts(data.search)
			if(!!responce?.total) {
				setGovern({...govern, isOk: true})
				setSearched(responce)
			} else {
				resetField('search')
				setGovern({...govern, isError: true})
			}
        } finally {
            setPreloader(false)
			setTimeout(() => setGovern({...govern, isOk: false}), 5000)
        }
    }

	function switchPage(_event: ChangeEvent<unknown>, page: number) {
		scrollToTop()
		const directive: number = --page * pagination.pageCount
		setPagination({...pagination, directive})
	}

	function deletePost(event: MouseEvent, id: number) {
		event.stopPropagation()
		setSearched({...searched, posts: searched.posts.filter(post => post.id !== id)})
	}

	return (<div className='search'>
				<form onSubmit={handleSubmit(onSubmit)} className='search__form'>
						<TextField autoFocus fullWidth {...register("search", {required: true, maxLength: 80, minLength: 2})} color="success"
								id="outlined-basic" label={t('search')} variant="standard" />
						<Button type='submit' size='large' variant="text" color="inherit"><TextSearch  /></Button>
				</form>
				<div className='search__info'>
						<Collapse in={!!errors.search || govern.isOk || govern.isError}>
							{govern.isOk && <Alert severity="success">{searched.total} {t('searchSuccessPost')}</Alert>}
							{!!errors.search && <Alert severity="error">{t('errorCommentsS')}</Alert>}
							{govern.isError && <Alert severity="error">{t('errorValidation')}</Alert>}
						</Collapse>
				</div>
				<div className='search__result'>
					{searched?.posts?.filter((_post: IPost, i) => i >= pagination.directive && i < pagination.directive + pagination.pageCount).map(post => <div className="search__result-post" onClick={() => scrollToTopCallBack(navigate('/posts/' + post.id))} key={post.id}>
						<div className='id'>
							{checkWritingNum(post.id)}
						</div>
						<div className='title'>
							{post.title}
						</div>
						<DeleteIcon onClick={(event) => deletePost(event, post.id)} color="disabled" className='delete' />
					</div>)}

					{searched?.posts?.length > pagination.pageCount && <div className='search__pagination'><Pagination color="primary" onChange={(event, page) => switchPage(event, page)} count={Math.ceil(searched.total / pagination.pageCount)} variant="outlined" shape="rounded" /></div>}
				</div>
				<Button onClick={() => setIsOpen(false)} className='close' size='small' type='submit' variant="text" color="success">{t('collapse')}</Button>
			</div>);
})
export default Search;