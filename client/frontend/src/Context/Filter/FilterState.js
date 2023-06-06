import { useState } from "react";
import FilterContext from "./FilterContext";

const FilterState = ({children}) => {
    const [filter, setFilter] = useState({
        minPrice: 0,
        maxPrice: 0,
        category: ''
    })

    return (
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterState