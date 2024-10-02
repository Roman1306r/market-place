import { useTranslation } from 'react-i18next'
import { DrawerProps, IPost } from '../../../types/posts'
import Pagination from '@mui/material/Pagination';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { ChangeEvent, memo, MouseEvent, useEffect, useState } from 'react'
import { scrollToTop } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'
import { Trash } from 'lucide-react'

const DrawerContent = memo(({foundedPosts, setFoundedPosts, setOpenDrawer}: DrawerProps) => {

  const { t } = useTranslation()
  const [isOk, setIsOk] = useState<boolean>(false)
  const [pagination, setPagination] = useState({pageCount: 10, directive: 0})
  const navigate = useNavigate()

  useEffect(() => {
      setTimeout(() => setIsOk(true), 500)
      return () => setIsOk(false)
  }, [])

  function deletePost(event: MouseEvent, id: number) {
      event.stopPropagation()
      setFoundedPosts({...foundedPosts, posts: foundedPosts.posts.filter(post => post.id !== id)})
	}

  function switchPage(_event: ChangeEvent<unknown>, page: number) {
      scrollToTop()
      const directive: number = --page * pagination.pageCount
      setPagination({...pagination, directive})
  }

  function openPost(id: number) {
      navigate('/posts/' + id)
      scrollToTop()
      setOpenDrawer(false)
  }

  return (<article className='drawer'>
              <h2>{t('resultsSearch')} </h2>
              <div className='drawer__info'>
                  <Collapse in={isOk && foundedPosts.posts.length > 0}>
                      <Alert severity="success">{foundedPosts.total} {t('searchSuccessPost')}</Alert>
                  </Collapse>
              </div>
              <div className='drawer__result'>
                {foundedPosts.posts.length > 0
                ? <>
                      {foundedPosts.posts.filter((_post: IPost, i) => i >= pagination.directive && i < pagination.directive + pagination.pageCount).map((post) => <div onClick={() => openPost(post.id)} key={post.id} className='drawer__post'>
                                                        <div className='title'>
                                                          {post.title}
                                                        </div>
                                                    <Trash onClick={(event) => deletePost(event, post.id)} color="grey" className='delete' />
                                  </div>)}
                </>
                :  <Alert severity="error">{t('errorText')}</Alert>}

              </div>
              {foundedPosts.total > pagination.pageCount && <div className='drawer__pagination'><Pagination onChange={(event, page) => switchPage(event, page)} count={Math.ceil(foundedPosts.total / pagination.pageCount)} shape="rounded" /></div>}
          </article>);
})
export default DrawerContent;