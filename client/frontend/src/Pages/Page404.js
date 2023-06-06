import { useContext, useEffect } from "react";
import FooterTop from '../Components/ExtraComponents/FooterTop'
import SettingContext from '../Context/SiteSetting/SettingContext'

function Page404() {

    // setting context 
    const { setting } = useContext(SettingContext)

    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },[])

    useEffect(()=>{
        document.title = `Page Not Found - ${setting?.siteName ?? 'Loading...'}`;
    }, [setting])

    return(
        <>
            <div className="page p404">
                <img src="/images/404.svg" alt="ddd" />
            </div>
            <FooterTop/>
        </>
    )
}

export default Page404