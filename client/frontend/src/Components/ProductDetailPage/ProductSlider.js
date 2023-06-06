import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Placeholder from "../ExtraComponents/Placeholder";

const ProductSlider = ({product}) => {

    if (!product)
        return <Placeholder height={'55vh'} borderRadius={15} />
    return(
        <>
            <div className="single-product-image">
                <Swiper 
                    navigation={true} 
                    modules={[Navigation]} 
                    spaceBetween={50} 
                    className="mySwiper" 
                    style={{margin:'0'}}
                >
                {
                    product.imageUrl.map(im => (
                        <SwiperSlide key={im._id}>
                            <img src={im.fileUrl} alt={im.altText} />
                        </SwiperSlide>
                    ))
                }
                </Swiper>
                <span className="discount-label" style={product.salePrice ? { display: 'block' } : { display: 'none' }}>
                    {product.salePrice ? Math.round(100 - ((product.salePrice / product.price) * 100)) + '% Off' : ''}
                </span>
            </div>
        </>
    )
}

export default ProductSlider