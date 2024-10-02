import { IoArrowForwardCircle } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { scrollToTopCallBack } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import { useCallback, useEffect, useState } from 'react'
import { restApi } from '../../../api/api'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { m } from 'framer-motion'
import { cardVariants, cardVariants2, scale, variantDuration } from '../../../variants/variants'

const MainCategory = () => {

	const { t } = useTranslation();
	const navigate = useNavigate()
	const [allCategory, setAllCategory] = useState<string[]>([''])

	const getCategoryList = useCallback(async() => {
		const responce = await restApi.getCategoryList()
		setAllCategory(responce)
	}, [])

	useEffect(() => {
		getCategoryList()
	}, [])

	return (<article className='main__page-category'>
					<div className='main__page-category-top'>
						<m.h2
							variants={cardVariants}
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ once: true, amount: 0.8 }}
						>{t('mainCategoryTitle')}</m.h2>
						<m.span
							variants={variantDuration}
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ once: true, amount: 0.8 }}
						onClick={() => scrollToTopCallBack(navigate('/catalog'))} className='link'>{t('mainCategoryLink')} <IoArrowForwardCircle /></m.span>
					</div>
					<Swiper
						slidesPerView={8.5}
						spaceBetween={30}
						loop={true}
						className="mySwiper"
						breakpoints={{
							320: {
							slidesPerView: 4.2,
							spaceBetween: 10,
							},
							768: {
							slidesPerView: 6.5,
							spaceBetween: 30,
							},
							1024: {
							slidesPerView: 8.5,
							spaceBetween: 30,
							},
						}}
					>
						{allCategory?.map((category: string) => <SwiperSlide onClick={() => scrollToTopCallBack(navigate('/catalog/' + category))} key={category}>
							<m.p
							variants={cardVariants2}
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ once: true, amount: 0.8 }}
							>{t(category)}</m.p>
							<m.div
								variants={scale}
								initial="offscreen"
								whileInView="onscreen"
								viewport={{ once: true, amount: 0.8 }}
								className='icon__container'><ExpandMoreIcon className='icon' /></m.div>
						</SwiperSlide>)}
					</Swiper>
			</article>);
}
export default MainCategory