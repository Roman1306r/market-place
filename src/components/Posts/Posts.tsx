import { useState } from 'react'
import useCustomContext from '../../hooks/useCustomContext'
import { restApi } from '../../api/api'
import { initialValues } from '../../data/data'
import { PostsServer } from '../../types/posts';
import { scrollToTop } from '../../utils/utils'
import { useTranslation } from 'react-i18next'
import Tags from './Tags/Tags'
import { NavLink, Route, Routes } from 'react-router-dom';
import PostOne from './PostOne/PostOne'
import { RiArrowDropRightLine } from 'react-icons/ri'
import PostsAll from './PostsAll/PostsAll'
import DrawerContent from './Drawer/Drawer'
import Drawer from '@mui/material/Drawer'

const Posts = () => {

	const {setPreloader} = useCustomContext()
	const [posts, setPosts] = useState<PostsServer>(initialValues.initialPosts)
	const [foundedPosts, setFoundedPosts] = useState<PostsServer>(initialValues.initialPosts)
	const { t } = useTranslation()
	const [titleOpenedPost, setTitleOpenedPost] = useState<string>('')
	const [openDrawer, setOpenDrawer] = useState(false);

	async function getPostsByTag(tag: string) {
		try {
			setPreloader(true)
			const response = await restApi.getPostsByTag(tag)
			if(!response?.message) {
				setFoundedPosts(response)
				setOpenDrawer(true)
				scrollToTop()
			} else {
				alert('Error!')
			}
		} finally {
			setPreloader(false)
		}
	}

	return (<section className='posts'>
				<div className="bread">
					<NavLink to={'/'}>{t('MAIN')}</NavLink>
					<RiArrowDropRightLine />
					{titleOpenedPost
					?<><NavLink onClick={() => setTitleOpenedPost('')} to={'/posts'}>{t('Статьи')}</NavLink>
						<RiArrowDropRightLine />
						<span>{titleOpenedPost}</span></>
					: 	<span>{t('Статьи')}</span>}
				</div>
				<Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
					<DrawerContent setOpenDrawer={setOpenDrawer} setFoundedPosts={setFoundedPosts} foundedPosts={foundedPosts} />
				</Drawer>
				<article className='posts__body'>
						<Routes >
								<Route path='/:id' element={<PostOne getPostsByTag={getPostsByTag} setPosts={setPosts} posts={posts} setTitleOpenedPost={setTitleOpenedPost} />}  />
								<Route path='/' element={<PostsAll posts={posts} setPosts={setPosts}  getPostsByTag={getPostsByTag} />} />
						</Routes>
				</article>
				<Tags getPostsByTag={getPostsByTag} />
			</section>);
}
export default Posts;