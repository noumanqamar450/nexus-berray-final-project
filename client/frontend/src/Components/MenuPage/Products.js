import { Col, Row } from "react-bootstrap";
import ProCard from "../HomePage/ProCard";
import MenuPagination from './MenuPagination'
import { useContext, useEffect, useState } from "react";
import { getAllProduct } from '../../Context/apis'
import MenuPlaceholder from "./MenuPlaceholder";
import QueryContext from "../../Context/Pagination/QueryContext";

function Products() {
    const [allProduct, setAllProduct] = useState(null)

    // useContext
    const { query } = useContext(QueryContext)

    // api handler
    const setProductApi = async (query) => {
        const pro = await getAllProduct(query)

        if (!pro.message) {
            setAllProduct(pro)
        } else {
            console.log(pro.message);
        }
    }

    // Scroll Up & Apis
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setAllProduct(null)
        setProductApi(query)
    }, [query])

    if (!allProduct)
        return <MenuPlaceholder/>

    return(
        <Row>
            {
                allProduct.data.map((p,i)=>(
                    <Col md={4} key={i}>
                        <ProCard products={p}/>
                    </Col>
                ))
            }
            <MenuPagination paginate={allProduct} />
        </Row>
    )
}

export default Products