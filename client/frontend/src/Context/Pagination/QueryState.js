import { useState } from 'react'
import QueryContext from './QueryContext'

const QueryState = ({children}) => {
    const [query, setQuery] = useState({limit:12, page: 1})
    
    return(
        <QueryContext.Provider value={{query, setQuery}}>
            {children}
        </QueryContext.Provider>
    )
}

export default QueryState