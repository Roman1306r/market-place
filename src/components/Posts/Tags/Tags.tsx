import { memo, useEffect, useState } from 'react'
import useCustomContext from '../../../hooks/useCustomContext'
import { restApi } from '../../../api/api'
import { initialValues } from '../../../data/data'
import { ITag, TagsProps} from '../../../types/posts'
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { m } from 'framer-motion'
import { cardVariants3 } from '../../../variants/variants'

const Tags = memo(({getPostsByTag} : TagsProps) => {

	const {setPreloader} = useCustomContext()
	const [tags, setTags] = useState<ITag[]>(initialValues.initialTag)
	const [isShowTags, setIsShowTags] = useState<boolean>(false)
	const { t } = useTranslation()

	useEffect(() => {
		getTagsAll()
	}, [])

	async function getTagsAll() {
		try {
			setPreloader(true)
			const response = await restApi.getTagsAll()
			setTags(response)
		} finally {
			setPreloader(false)
		}
	}

	return (<article className='posts__tags'>
				<m.h2 
					variants={cardVariants3}
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.8 }}
					>
					{t('searchPostsByTag')}
					<Button sx={{display: 'flex', gap: '10px'}} onClick={() => setIsShowTags(!isShowTags)} size="small" color="success">{isShowTags ? t('collapse') : t('expand')} {isShowTags ? <SlArrowUp/> : <SlArrowDown/>}</Button>
				</m.h2>
				<div>
					{tags?.slice(0, isShowTags ? tags.length : 30).map(tag => <Button onClick={() => getPostsByTag(tag.name)} key={tag.slug} color="success" size="small" >#{tag.name}</Button>)}
				</div>
			</article>);
})
export default Tags;
