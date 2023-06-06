import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import HeroSliderImage from './HeroSliderImage';
import Placeholder from '../ExtraComponents/Placeholder';


const HeroSlider = (props) => {
    const banner = props.banner?.response[0].mainBanner

    if (!banner) 
        return <Placeholder height={400} borderRadius={15} marginTop={30} />
    return(
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            className="hero-slider"
            navigation={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            loop={true}
        >
        {
            banner.map((b,i)=>(
                <SwiperSlide key={i}>
                    <HeroSliderImage banner={b}/>
                </SwiperSlide>
            ))
        }
        </Swiper>
    )
}

export default HeroSlider;