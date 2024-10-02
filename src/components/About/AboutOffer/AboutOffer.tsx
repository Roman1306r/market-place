import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { main } from '../../../data/data'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '../../../utils/utils'
import { m } from 'framer-motion'
import { cardVariants, variantDuration } from '../../../variants/variants'

const AboutOffer = () => {

    const {t} = useTranslation();

    return (<article className='about__offer'>
                <div className='about__offer-desc'>
                    <m.h2
                        variants={cardVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                    >{t('aboutTitle')}</m.h2>
                    <m.p
                        variants={variantDuration}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                    >{t('aboutDescription')}</m.p>
                </div>
                <div className='about__offer-points'>
                    <Swiper
                        direction={'vertical'}
                        loop
                        speed={2000}
                        slidesPerView={3}
                        autoplay={{
                            delay: 100,
                            disableOnInteraction: false
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                    {main.sliderInfo.map(slide => <SwiperSlide key={slide.id}><NavLink onClick={scrollToTop} to={'/catalog/' + slide.title}>{t(slide.title)}</NavLink></SwiperSlide>)}
                    </Swiper>
                </div>
            </article>);
}
export default AboutOffer;