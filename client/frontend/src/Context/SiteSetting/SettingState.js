import { useEffect, useState } from 'react'
import SettingContext from './SettingContext'
import { getSettingForClient } from '../apis'

const SettingState = ({ children }) => {
    const [setting, setSetting] = useState(null)

    useEffect(()=>{
       const handler = async () => {
           const res = await getSettingForClient()
           setSetting(res)
        } 
        handler()
    },[])
    
    return (
        <SettingContext.Provider value={{ setting, setSetting }}>
            {children}
        </SettingContext.Provider>
    )
}

export default SettingState