import { Button, Rating, TextField, Tooltip } from '@mui/material'
import { ReviewProps } from '../../../types/products'
import { MessageSquare, MessageSquareDiff, Settings, UserRound } from 'lucide-react'
import { CalendarDays } from 'lucide-react';
import useCustomContext from '../../../hooks/useCustomContext'
import { useState } from 'react'
import { t } from 'i18next'

const Review = ({rev, rating, setRating}: ReviewProps) => {

	const [isEdit, setIsEdit] = useState(false)
	const [value, setValue] = useState('')
	const {admin} = useCustomContext()

	function changeComment() {
		let reviews = rating.reviews.slice(1)
		setRating({...rating, reviews: [{...rev, comment: value}, ...reviews]})
		setIsEdit(false)
	}

	return (<div className='comment'>
				<h3>
					<span>
						<UserRound size={20} color='grey' /> 
						{admin.firstName + ' ' + admin.lastName === rev.reviewerName && <Tooltip title={t('edit')}><Settings style={{cursor: 'pointer'}} onClick={() => setIsEdit(!isEdit)} size={20} color='grey' /></Tooltip> } 
						{rev.reviewerName}
					</span>  
					<Rating size="small" name="half-rating-read" value={rev.rating || 0} precision={0.5}  readOnly />
				</h3>
				{rev.comment && !isEdit && <p><MessageSquare size={15} color='grey' /> {rev.comment}</p>}
				{isEdit && <form className='form'>
					<TextField fullWidth id="standard-basic" value={value} onChange={(event) => setValue(event.target.value)}  label={t('newComm')} variant="standard" />
					<Tooltip title={t('submit')}><Button onClick={changeComment} variant="text"><MessageSquareDiff color='grey' /></Button>
					</Tooltip>
				</form>}
				<p>
					<CalendarDays size={15} color='grey' /> {rev.date}
				</p>
			</div>);
}
export default Review;