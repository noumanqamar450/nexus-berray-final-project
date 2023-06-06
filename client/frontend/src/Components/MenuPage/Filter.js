import { Badge, ListGroup } from "react-bootstrap";
import Placeholder from "../ExtraComponents/Placeholder";
import { useEffect, useState } from "react";
import { getAllCategory, getAllProduct } from "../../Context/apis";

const Filter = () => {
    const [cate, setCate] = useState(null)
    const [pro, setPro] = useState(null)

    const handler = async () => {
        const resCate = await getAllCategory()
        const resPro = await getAllProduct({limit:''})

        if (resCate.data) {
            setCate(resCate.data)
        }
        if (resPro.data) {
            setPro(resPro.data)
        }
    }

    useEffect(()=>{
        handler()
    },[])

    const activeButton = (i) => {
        let list = document.querySelectorAll('.list-group .list-group-item')
        for (let j = 0; j < list.length; j++) {
            list[j].classList.remove('active')
        }
        list[i].classList.add('active')
    }
    

    if (!cate)
        return (
            <div className="filter sticky-top mb-3" style={{ top: '100px' }}>
                <h1 className="title">Filter</h1>
                <hr />
                <Placeholder borderRadius={10} height={40} marginTop={10} />
                <Placeholder borderRadius={10} height={40} marginTop={10} />
                <Placeholder borderRadius={10} height={40} marginTop={10} />
                <Placeholder borderRadius={10} height={40} marginTop={10} />
            </div>
        )


    return (
        <>
            <div className="filter sticky-top mb-3" style={{ top: '100px' }}>
                <h1 className="title">Filter</h1>
                <hr />
                <ListGroup variant="flush">
                    <ListGroup.Item action active 
                        onClick={() => {
                            activeButton(0)
                        }}
                    >
                        All 
                        <Badge className="float-end">{pro?.length}</Badge>
                    </ListGroup.Item>

                    {
                        cate.map((c,i) => (
                                    <ListGroup.Item action key={i} 
                                    onClick={()=>{
                                        const bId = i+1;
                                        activeButton(bId)
                                    }}
                                    >
                                        {c.name} 
                                        <Badge className="float-end">{pro?.filter(p => p.category.name === c.name).length}</Badge>
                                    </ListGroup.Item>
                                ))
                    }
                </ListGroup>
            </div>
        </>
    )
}

export default Filter