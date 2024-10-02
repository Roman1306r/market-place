import { IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { scrollToTop } from '../../utils/utils'
import { useEffect, useState } from 'react'
import { m } from 'framer-motion'

const Up = () => {

	const [showUp, setShowUp] = useState(false)
	
	useEffect(() => {
		window.onscroll = () => document.documentElement.scrollTop > 1000 ?  setShowUp(true) : setShowUp(false)
	}, [])

	return (<m.div 
				animate={{top: showUp ? '50px' : '-50px', scale: showUp ? 1 : 0, rotateX: showUp ? '0deg' : '360deg'}}
				transition={{type: 'spring', stiffness: 250, damping: 15}}
				className='up'>
				<IconButton onClick={scrollToTop} color='success' className='buttonUp' aria-label="delete">
					<ArrowUpwardIcon />
				</IconButton>
			</m.div>);
}
export default Up;
