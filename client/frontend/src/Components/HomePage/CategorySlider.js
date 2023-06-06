import { Image } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { useEffect, useState } from 'react';
import Placeholder from '../ExtraComponents/Placeholder.js';
import { getAllCategory } from '../../Context/apis'
import { Link } from 'react-router-dom';

const CategorySlider = () => {
    const [categoryRecord, setCategoryRecord] = useState(null)
    const [isLoad, setIsLoad] = useState(true)

    const categoryApi = async ()=>{
        const cate = await getAllCategory()

        if (!cate.message) {
            setCategoryRecord(cate)
        } else {
            console.log(cate.message);
        }
    }
    useEffect(()=>{
        categoryApi()
    },[])
    
    return (
        <div className="brand-logos">
            <Link to="/category" className="btn btn-primary float-end">See More</Link>
            <h1 className="title">
                Category
            </h1>
            <hr />
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                    576: {
                        // width: 576,
                        slidesPerView: 3,
                    },
                    992: {
                        // width: 768,
                        slidesPerView: 6,
                    },
                }}
                slidesPerView={2}
                navigation={true}
                className="brands"
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
            {
                categoryRecord?.data?.slice(0, 8).map((b, i) => (
                    <SwiperSlide key={i}>
                        <Link to={'/category/' + b.slug}>
                            {isLoad && <Placeholder height={100} borderRadius={15} />} 
                            <Image
                                src={b.imageUrl.fileUrl}
                                alt={b.imageUrl.fileUrl}
                                className='brand-image'
                                onLoad={() => setIsLoad(false)}
                            />
                        </Link>
                    </SwiperSlide>
                ))
            }
               
            </Swiper>
        </div>
    )
}

export default CategorySlider;