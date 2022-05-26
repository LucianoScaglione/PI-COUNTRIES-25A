const initialState = {
    countries: [], // todas las ciudades
    detailCountry: [], // detalle ciudades
    countriesCopy: [] // copia del estados countries (para que no se pisen)
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SHOW_COUNTRIES": {
            return {
                ...state,
                countries: payload, 
                countriesCopy: payload
            }
        }
        case "SHOW_DETAILCOUNTRY": {
            return {
                ...state,
                detailCountry: payload
            }
        }
        case "DETAIL_SEARCH": {
            return {
                ...state,
                countries: payload
            }
        }
        default: return state;
    }
}

export default reducer;