import { useEffect, useState } from "react"
import { deletePageById, getPage } from "../../libs/Apis"
import { useContext } from "react"
import UserContext from '../../Context/Auth/UserContext'
import { toast } from "react-toastify"
import { Pencil, Trash } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

const PageList = () => {
    const [list, setList] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    const handler = async (auth) => {
        const res = await getPage(auth?.token)
        
        if (res.length > 0) {
            setList(res)
        } else {
            toast(res.message)
        }
    }

    useEffect(()=>{
        handler(auth)
    },[auth])

    // page delete function

    const deletePage = async (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (result) => {

            if (result.isConfirmed) {
                const res = await deletePageById(id, auth?.token)
                toast.success(res.message)
                handler(auth)
            } else {
                toast.error('Not deleted!')
            }

        })


    }

    if (!list)
        return (
            <tr>
                <td colSpan={5} className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>
        )

    return list.map((l, i)=> (
        <tr key={i}>
            <td>{l.title}</td>
            <td>{l.status.label}</td>
            <td>{l.createdAt.slice(0, 10)} - {l.createdAt.slice(11, 19)}</td>
            <td>{l.updatedAt.slice(0, 10)} - {l.updatedAt.slice(11, 19)}</td>
            <td className="page-btns">
                <Link to={`/page/${l._id}`} className="page-btn">
                    <Pencil/>
                </Link>
                <div className="page-btn" onClick={() => deletePage(l._id)}>
                    <Trash />
                </div>
            </td>
        </tr>
    ))
}

export default PageList