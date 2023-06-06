import { useEffect, useState } from "react"
import MenuContext from "./MenuContext"
import { getPageSlug } from "../apis"

const MenuState = ({ children }) => {
    const [headerMenu, setHeaderMenu] = useState(null)
    const [footerMenu, setFooterMenu] = useState(null)

    // menu api
    const handler = async () => {
        const resHeader = await getPageSlug('header')
        const resFooter = await getPageSlug('footer')
        if (!resHeader.status) {
            setHeaderMenu(resHeader)
        }
        if (!resFooter.status) {
            setFooterMenu(resFooter)
        }
    }

    useEffect(()=>{
        handler()
    },[])

    return(
        <MenuContext.Provider value={{ headerMenu, setHeaderMenu, footerMenu, setFooterMenu }}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuState