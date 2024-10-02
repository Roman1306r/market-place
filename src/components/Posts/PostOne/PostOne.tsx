import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { memo, useCallback, useEffect, useState } from 'react'
import useCustomContext from '../../../hooks/useCustomContext'
import { restApi } from '../../../api/api'
import { initialValues } from '../../../data/data'
import imagePostOne from './../../../assets/post/postOne.jpg'
import { IPost, PostOneProps } from '../../../types/posts'
import { addReactionUser, scrollToTopCallBack } from '../../../utils/utils'
import PostComments from '../PostComments/PostComments'
import Post from '../Post/Post'
import { Tooltip } from '@mui/material'
import { Eye, Tags, ThumbsDown, ThumbsUp, Trash, UserRoundSearch } from 'lucide-react'
import { m } from 'framer-motion'
import { cardVariants } from '../../../variants/variants'

const PostOne = memo(({setTitleOpenedPost, posts, setPosts, getPostsByTag}: PostOneProps) => {

	const { t } = useTranslation()
	const params = useParams()
	const {setPreloader, admin} = useCustomContext()
	const [post, setPost] = useState<IPost>(initialValues.initialPost)
	const navigate = useNavigate()

	useEffect(() => {
		getPost(Number(params.id))
	}, [params.id])

	async function getPost(id: number) {
		try {
			setPreloader(true)
			let response = await restApi.getPost(id)
			const samePost = posts.posts.find(post => post.id === id)

			if(response?.message) {
				response = samePost
				setTitleOpenedPost(response.title)
				setPost({...response, isLiked: false, isDisliked: false})
			} else {
				setTitleOpenedPost(response.title)
				samePost
				? setPost({...response, isLiked: samePost?.isLiked, isDisliked: samePost?.isDisliked, reactions: {likes: samePost?.reactions.likes, dislikes: samePost?.reactions.dislikes}})
				: setPost({...response, isLiked: false, isDisliked: false})
			}
		} finally {
			setPreloader(false)
		}
	}

	const deletePost = useCallback((id: number) => {
		setPosts({...posts, posts: posts.posts.filter(post => post.id !== id)})
		navigate('/posts')
		setTitleOpenedPost('')
	}, [])

	return (<div className='posts__body-postOne'>
				<h2>{post.title} {admin.id === post.userId && <Tooltip title={t('delete')}><Trash onClick={() => deletePost(post.id)} className='post-icon' /></Tooltip>} </h2>
				<div className='posts__body-postOne-bg'>
					<img src={imagePostOne} alt={post.title} />
				</div>
				<div className='posts__body-postOne-body'>
					<div className='postOne-body-info'>
						<div className='postOne-body-info-reactions'>
							<span><ThumbsUp onClick={() => addReactionUser(post?.reactions, post?.isLiked, post?.isDisliked, true, post, setPost)} className='post-icon' color={post?.isLiked ? "green": "grey"}  /> {post?.reactions?.likes}</span>
							<span><ThumbsDown onClick={() => addReactionUser(post?.reactions, post?.isLiked, post?.isDisliked, false, post, setPost)} className='post-icon' color={post?.isDisliked ? "red": "grey"} /> {post?.reactions?.dislikes}</span>
						</div>
						<div className='postOne-body-info-views'>
							<span><Eye size={30} color='grey' /> {post?.views || 1}</span>
						</div>
						<div className='postOne-body-info-avatar'>
							<Tooltip title={t('look')}>
								<span onClick={() => scrollToTopCallBack(navigate('/clients/' + post?.userId))}><UserRoundSearch color='grey' /> {t('author')}</span>
							</Tooltip>
						</div>
						<div className='postOne-body-info-tags'>
							<span><Tags size={30} color='grey' /></span>
							<span>{post?.tags?.map(tag => <span onClick={() => getPostsByTag(tag)} className='postOne-tag' key={tag}>#{tag}</span>)}</span>
						</div>
					</div>
					<div className='postOne-body-desc'>{post.body}</div>
				</div>
				<PostComments id={params.id} />
				{!!posts?.posts.length && <m.div 
						variants={cardVariants}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ once: true, amount: 0.8 }}	
					className='posts__body-postOne-randomPosts'>
					<h3>{t('randomPostsTitle')}</h3>
					<div className='all hide'>
						{posts?.posts.slice(0, 3).map(post => <Post key={post?.id} post={post} setPosts={setPosts} getPostsByTag={getPostsByTag} posts={posts} />)}
					</div>
				</m.div>}
			</div>);
})
export default PostOne;