import { useContext } from "react"
import { Pagination } from "react-bootstrap"
import QueryContext from "../../Context/Pagination/QueryContext"

const MenuPagination = ({paginate}) => {

    // useContext
    const { query, setQuery } = useContext(QueryContext)

    return (
        <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev 
                onClick={()=>{
                    setQuery({ ...query, page: paginate.previous?.page })
                }}
                disabled={paginate.previous ? false : true}
            />
            <Pagination.Item 
                style={paginate.previous ? {} : {display: "none"}}
                onClick={() => {
                    setQuery({ ...query, page: paginate.previous?.page })
                }}
            >
                {paginate.previous?.page }
            </Pagination.Item>
            <Pagination.Item active>{query.page}</Pagination.Item>
            <Pagination.Item 
                style={paginate.next ? {} : {display: "none"}}
                onClick={() => {
                    setQuery({ ...query, page: paginate.next?.page })
                }}
            >
                {paginate.next?.page}
            </Pagination.Item>
            <Pagination.Next 
                onClick={() => {
                    setQuery({ ...query, page: paginate.next?.page })
                }}
                disabled={paginate.next ? false : true}
            />
        </Pagination>
    )
}

export default MenuPagination