import Placeholder from '../ExtraComponents/Placeholder';
import { Image } from 'react-bootstrap';

const HeroSliderImage = (props) => {
    const { banner } = props

    if (!banner)
        return <Placeholder height={400} borderRadius={15} position={'absolute'} />

    return(
        <>
            <Image
                src={banner.fileUrl}
                alt={banner.altText}
                className='slider-image'
            />
        </>
    )
}

export default HeroSliderImage