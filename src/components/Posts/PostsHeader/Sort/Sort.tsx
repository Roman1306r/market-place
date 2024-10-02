import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useTranslation } from 'react-i18next'
import {  IPost, IPropSort, PostsSortProps } from '../../../../types/posts'
import { memo, useState } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Tooltip } from '@mui/material'
import { Eye, ListOrdered, ThumbsDown, ThumbsUp } from 'lucide-react'

const Sort = memo(({setIsOpen, posts, setPosts}: PostsSortProps) => {

	const { t } = useTranslation()
	const [isOk, setIsOk] = useState<boolean>(false)
	const [prop, setProp] = useState<IPropSort>({id: false, views: false, likes: false, dislikes: false})

	function sortDataByOneKey(key: string, arr: IPost[], isReverse = false) {
		setProp({...prop, [key]: isReverse ? false : true})
		return setPosts({...posts, posts: arr.sort((a, b) => isReverse ? a[key as keyof typeof a] < b[key as keyof typeof b] ? -1 : 1 : a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1)})
	}

	function sortDataByTwoKeys(key: string, key2: any, arr: IPost[], isReverse = false) {
		setProp({...prop, [key2]: isReverse ? false : true})
		return setPosts({...posts, posts: arr.sort((a: any, b: any) => isReverse ? a[key][key2] < b[key][key2] ? -1 : 1 : a[key][key2] < b[key][key2] ? 1 : -1)})
	}

	function sort(arr: IPost[], key: string, key2: string = '') {
		return function() {
			setIsOk(true)
			setTimeout(() => setIsOk(false), 2000)
			if(key2) {
			  return prop[key2 as keyof typeof prop] ? sortDataByTwoKeys(key, key2, arr, true) : sortDataByTwoKeys(key, key2, arr)
			} else {
			  return prop[String(key) as keyof typeof prop] ? sortDataByOneKey(key, arr, true) : sortDataByOneKey(key, arr)
			}
		}
	}

	let sortByID = sort(posts.posts, 'id')
	let sortByViews = sort(posts.posts, 'views')
	let sortByLikes = sort(posts.posts, 'reactions', 'likes')
	let sortByDislikes = sort(posts.posts, 'reactions', 'dislikes')

	return (<div className='sort'>
				<h3>{t('sort')}</h3>
				<div className='sort__info'>
						<Collapse in={isOk}>
							<Alert severity="success"> {t('dataSorted')}</Alert>
						</Collapse>
				</div>
				<div className='sort__body'>
					<ButtonGroup disabled={isOk ? true : false} fullWidth color="success" variant={isOk ? "text" : "contained" }aria-label="Basic button group">
							<Tooltip title="Id"><Button onClick={sortByID}><ListOrdered /></Button></Tooltip>
							<Tooltip title={t('views')}><Button onClick={sortByViews}><Eye /></Button></Tooltip>
							<Tooltip title={t('likes')}><Button onClick={sortByLikes}><ThumbsUp/></Button></Tooltip>
							<Tooltip title={t('dislikes')}><Button onClick={sortByDislikes}><ThumbsDown /></Button></Tooltip>
					</ButtonGroup>
				</div>
				<Button onClick={() => setIsOpen(false)} className='close' size='small' type='submit' variant="text" color="success">{t('collapse')}</Button>
			</div>);
})
export default Sort;