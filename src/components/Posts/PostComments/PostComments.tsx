import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import useCustomContext from '../../../hooks/useCustomContext'
import { restApi } from '../../../api/api'
import { CommentsServer, CommValues, IComment, PostsCommentsProps } from '../../../types/comments'
import { initialValues } from '../../../data/data'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { scrollToTopCallBack } from '../../../utils/utils'
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { Tooltip } from '@mui/material'
import { MessageCircleOff, Pencil, UserRound } from 'lucide-react'
import { ThumbsUp } from 'lucide-react'
import { m } from 'framer-motion'
import { cardVariants2 } from '../../../variants/variants'

const PostComments = memo(({id}: PostsCommentsProps) => {

	const { t } = useTranslation()
	const {setPreloader, admin} = useCustomContext()
	const [comments, setComments] = useState<CommentsServer>(initialValues.initialComments)
	const navigate = useNavigate()
	const { register, handleSubmit, resetField, formState: { errors } } = useForm<CommValues>();
	const [notCurrect, setNotCurrect] = useState<boolean>(false)
	const [isAdded, setIsAdded] = useState<boolean>(false)
	const [editBody, setEditBody] = useState<{value: string, error: boolean, mode: boolean}>({value: '', error: false, mode: false})

	async function getComments(id: number) {
		try {
			setPreloader(true)
			const response = await restApi.getPostsComments(id)
			if(!response?.message) {
				response?.comments.forEach((c: IComment) => c.isLiked = false)
				setComments(response)
			}
		} finally {
			setPreloader(false)
		}
	}
	
	useEffect(() => {
		getComments(Number(id))
	}, [id])

	const onSubmit: SubmitHandler<CommValues> = async (data: CommValues) => {
        try {
            setPreloader(true)
			resetField("comm")
			const body = {
				body: data.comm,
				postId: Number(id),
				userId: admin.id
			}
			const responce = await restApi.addNewComment(body)
			if(typeof responce === 'number') {
				setNotCurrect(true)
			} else {
				setIsAdded(true)
				responce.likes = 0
				responce.isLiked = false
				setComments({...comments, comments: [responce, ...comments.comments]})
			}
        } finally {
            setPreloader(false)
        }
    }

	function deleteComment(id: number) {
		setComments({...comments, comments: comments.comments.filter(comm => comm.id !== id)})
		setIsAdded(false)
	}

	function editComment(id: number) {
		if(editBody.value.length < 5 || editBody.value.length > 80) return setEditBody({...editBody, error: true})
		const {comments: commArray} = comments
		commArray[comments.comments.findIndex(c => c.id === id)].body = editBody.value
		setComments({...comments, comments: commArray})
		setEditBody({value: '', error: false, mode: false})
	}

	function addLike(id: number, l: number, isLiked: boolean) {
		let foundedIndex = comments.comments.findIndex((c: IComment) => c.id === id)
		const {comments: commArray} = comments
		if(isLiked) {
			commArray[foundedIndex].likes = --l
			commArray[foundedIndex].isLiked = false
		} else {
			commArray[foundedIndex].likes = ++l
			commArray[foundedIndex].isLiked = true
		}
		setComments( {...comments, comments: commArray})
	}

	return (comments.total ? <m.div 
								variants={cardVariants2}
								initial="offscreen"
								whileInView="onscreen"
								viewport={{ once: true, amount: 0.8 }}	
								className='postComments'>
								<h3>{t('commentsTitle')}</h3>
								<Collapse in={!!errors.comm || notCurrect}>
									{notCurrect ? <Alert severity="error">{t('errorValidation')}</Alert> : <Alert severity="error">{t('errorComments')}</Alert>}
								</Collapse>
								{!isAdded && <form className='postComments-form' onSubmit={handleSubmit(onSubmit)}>
									<TextField {...register("comm", {required: true, maxLength: 80, minLength: 5})} color="success" fullWidth id="outlined-basic" label={t('newComm')} variant="standard" />
									<Button type='submit' variant="text" color="inherit">{t('add')}</Button>
								</form>}
								{comments.comments.map((c: IComment) => <div className='postComments-comment' key={c.id}>
																	<h5><span onClick={() => scrollToTopCallBack(navigate('/clients/' + c.user.id))} className='postComments-comment__user'><UserRound color='grey' /> 
																	<span className='postComments-comment__user-title'>{c.user.fullName}</span>
																	</span>
																	<span>
																		<Tooltip title={t('like')}><ThumbsUp onClick={() => addLike(c.id, c.likes, c.isLiked)} color={c.isLiked ? "green" : "grey"}   className='postComments-comment__likes' /></Tooltip>{c.likes || ''}
																		{admin.id === c.user.id && <Tooltip title={t('edit')}><Pencil onClick={() => setEditBody({...editBody, mode: !editBody.mode})} color="grey" className='postComments-comment__likes' /></Tooltip>}
																		{admin.id === c.user.id && <Tooltip title={t('delete')}><MessageCircleOff onClick={() => deleteComment(c.id)} color="grey" className='postComments-comment__likes' /></Tooltip>}
																	</span></h5>
																	<p>{c.body}</p>
																	{editBody.mode && admin.id === c.user.id && <div className='comment-edit'>
																		<Collapse in={editBody.error}>
																			<Alert severity="error">{t('errorComments')}</Alert>
																		</Collapse>
																		<div className='comment-edit-form'>
																			<TextField onChange={(event) => setEditBody({...editBody, value: event.target.value})} value={editBody.value} color="success" fullWidth id="outlined-basic" label={t('change')} variant="standard" />
																			<Button onClick={() => editComment(c.id)} size='small' color="success" variant="text">{t('submit')}</Button>
																		</div>
																	</div>
																	}
															</div>)}
							</m.div> : '');
})
export default PostComments;