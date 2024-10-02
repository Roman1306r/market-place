import { ChangeEvent, memo, useEffect, useState } from 'react'
import useCustomContext from '../../../hooks/useCustomContext'
import { restApi } from '../../../api/api'
import { IPost, PostAllProps } from '../../../types/posts';
import { scrollToTop } from '../../../utils/utils'
import Post from './../Post/Post'
import PostsHeader from '../PostsHeader/PostsHeader'
import Pagination from '@mui/material/Pagination';

const PostsAll = memo(({getPostsByTag, setPosts, posts} : PostAllProps) => {

	const {setPreloader} = useCustomContext()
	const [pagination, setPagination] = useState({skip: 0, limit: 9})

	useEffect(() => {
		getPosts(pagination.limit, pagination.skip)
	}, [])

	async function getPosts(limit: number, skip: number) {
		try {
			setPreloader(true)
			const response = await restApi.getPostsAll(limit, skip)
			setPagination({...pagination, skip: response.skip})
			response.posts.forEach((p: IPost) => {
				p.isLiked = false
				p.isDisliked = false
			} )
			setPosts(response)
			return {total: response.total}
		} finally {
			setPreloader(false)
		}
	}

	function switchPage(_event: ChangeEvent<unknown>, page: number) {
		scrollToTop()
		const skip: number = --page * pagination.limit
		getPosts(pagination.limit, skip)
	}

	return (<div className='posts__body-all'>
					<PostsHeader posts={posts} setPosts={setPosts} />
					<div className='all'>
						{posts.posts.map(post => <Post posts={posts} setPosts={setPosts} getPostsByTag={getPostsByTag} key={post.id} post={post} />)}
					</div>
					<div className='posts__body-all-pagination'>
						<Pagination onChange={(event, page) => switchPage(event, page)} count={Math.ceil(posts.total / pagination.limit)} shape="rounded" />
					</div>
			</div>);
})
export default PostsAll;