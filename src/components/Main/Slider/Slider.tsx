import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { IoArrowForwardCircle } from "react-icons/io5";
import { main } from '../../../data/data';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import { NavLink } from 'react-router-dom'
import { m } from 'framer-motion'
import { cardVariants3 } from '../../../variants/variants'

const Slider = () => {

    const { t } = useTranslation();

    return (<div className='main__page-swiper'>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                            clickable: true
                        }} 
                        navigation={true}
                        loop={true}
                        modules={[Pagination, Autoplay, Navigation]}
                        className="mySwiper"
                        autoplay={{
                            delay: 5500,
                            disableOnInteraction: false,
                        }}
                    >
                    {main.sliderInfo.map(obj => <SwiperSlide key={obj.id}>
                                                    <m.div
                                                        variants={cardVariants3}
                                                        initial="offscreen"
                                                        whileInView="onscreen"
                                                        viewport={{ once: false, amount: 0.8 }}
                                                        className='swiper-slide-container'>
                                                        <h1> {t(obj.title) }</h1>
                                                        <h3><Chip label={t('discounts') + obj.sale + '%'} color="success" /></h3>
                                                        <h5>{t(obj.langId)}</h5>
                                                        <NavLink to={'/catalog/' + obj.title}><span className='link'>{t('more details')} <IoArrowForwardCircle /></span></NavLink>
                                                    </m.div>
                                                    <img alt={obj.title}  src={obj.image} />
                                            </SwiperSlide>)}
                    </Swiper>
            </div>);
}
export default Slider;