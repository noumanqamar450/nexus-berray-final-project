import { Form, Row, Col } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { searchProduct } from "../../Context/apis";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Searchbar = ({ click, active }) => {
    const [items, setItems] = useState(null)
    const [text, setText] = useState('')

    // product search handler
    const search = async (text) => {
        if (text) {
            const res = await searchProduct(text)
            if (!res.status) {
                setItems(res.data);
            } else {
                setItems(null);
            }
        }
    }

    useEffect(()=>{
        search(text)
    }, [text])

    // All search Reset
    const inputReset = () => {
        setItems(null)
        setText('')
    }

    return (
        <>
            <div className={active ? "search-bar active" : "search-bar"}>
                <div className="search-bar-x" onClick={()=> click()}><XLg/></div>
                <Row className="g-2 search-bar-setting">
                    <Col>
                        <Form>
                            <Form.Control type="text" placeholder="Food Search" value={text} onChange={(e) => setText(e.target.value)}/>
                            {text && <div className="remove" onClick={inputReset}><XLg/></div> }
                            <div className="lists">
                                {
                                    items && items.map(item => (
                                        <Link 
                                            className="list" 
                                            key={item._id} 
                                            onClick={inputReset} 
                                            to={`/product/${item.slug}`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))
                                }
                                {text && !items && <div className="list">Not Found</div>}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Searchbar;