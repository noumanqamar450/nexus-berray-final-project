import { useContext, useEffect, useState } from "react"
import NewPage from "../../Components/Pages/NewPage"
import { toast } from "react-toastify"
import { createPage, getPageById, updatePageById } from "../../libs/Apis"
import UserContext from "../../Context/Auth/UserContext"
import { useParams } from "react-router-dom"

const pageInitialize = {
    title: '',
    slug: '',
    status: null,
    image: null,
    content: '',
    setMenu: []
}

const AddPage = () => {
    const [field, setField] = useState(pageInitialize)
    const [isLoad, setLoad] = useState(false)

    // auth context
    const { auth } = useContext(UserContext)

    // useParams
    const { pid } = useParams()

    const handler = async (pid, auth) => {
        const res = await getPageById(pid, auth?.token)

        if (res._id) {
            setField(res)
        } else {
            toast(res.message)
        }
    }
    
    useEffect(()=>{
        if (pid) {
            handler(pid, auth)
        } else {
            setField(pageInitialize)
        }
    },[pid, auth])

    // save new page 
    const saveNewPage = async () => {
        
        if (!field.title) {
            toast('Add title')
        } else if (!field.slug) {
            toast('Add slug')
        } else if (!field.content) {
            toast('Add content')
        } else if (!field.status) {
            toast('Select status')
        } else if (!field.setMenu.length > 0) {
            toast('Select set on menu')
        } else {
            setLoad(true)
            
            if (field._id) {

                const res = await updatePageById(pid, field, auth?.token)

                if (res.status) {
                    toast(res.message)
                } else {
                    toast(res.message)
                }

            } else {
                
                const res = await createPage(field, auth?.token)
                
                if (res.status) {
                    toast(res.message)
                    setField(pageInitialize)
                } else {
                    toast(res.message)
                }
                
            }
            setLoad(false)
        }
    }

    return (
        <div className="page">
            <h2 className="py-3">Add Page</h2>
            <NewPage 
                field={field} 
                setField={setField} 
                onSubmit={saveNewPage}
                load={isLoad}
                />
        </div>
    )
}

export default AddPage