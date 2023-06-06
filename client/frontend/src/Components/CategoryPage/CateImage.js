import { Image } from "react-bootstrap"
import Placeholder from "../ExtraComponents/Placeholder"
import { Link } from "react-router-dom"

const CateImage = ({cate})=>{

    if (!cate)
        return <Placeholder height={150} borderRadius={15} opacity={1} />

    return(
        <Link to={'/category/' + cate.slug} className="brands-logo">
            <Image
                src={cate.imageUrl.fileUrl}
                alt={cate.imageUrl.altText}
            />
        </Link>
    )
}

export default CateImage