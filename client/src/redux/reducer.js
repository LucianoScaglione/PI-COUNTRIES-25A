const initialState = {
    countries: [], // todas las ciudades
    detailCountry: [], // detalle ciudades
    countriesCopy: [], // copia del estados countries (para que no se pisen)
    activity: []
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
        //////////////////////////////////FILTRADO/////////////////////////////////////////////////////
        case "FILTRAR_POR_CONTINENTE": {
            const TodosLosPaises = state.countriesCopy
            const PaisesFiltrados = payload === 'All' ? TodosLosPaises : TodosLosPaises.filter(e => e.continent === payload)
            return {
                ...state,
                countries: PaisesFiltrados
            }
        }
        case "FILTRAR_POR_ORDEN": {
            const PaisOrdenado = payload === 'az' ? state.countries.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }) : state.countries.sort((a, b) => {
                if (a.name > b.name) {
                    return -1
                }
                if (b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: PaisOrdenado
            }
        }
        case "FILTRAR_POR_CANTIDAD": {
            const cantidadPoblacion = payload === 'menor' ? state.countries.sort((a, b) => {
                if (a.population > b.population) {
                    return 1
                }
                if (b.population > a.population) {
                    return -1
                }
                return 0
            }) : state.countries.sort((a, b) => {
                if (b.population > a.population) {
                    return 1
                }
                if (a.population > b.population) {
                    return -1
                }
                return 0
            })
            return {
                ...state,
                countries: cantidadPoblacion
            }
        }
        case "TRAER_ACTIVIDADES": {
            return {
                ...state,
                activity: payload
            }
        }
        case "FILTRAR_POR_ACTIVIDAD": {
            return {
                ...state,
                countries: state.countriesCopy.filter(e => e.TouristActivities.map(m => m.nombre).includes(payload))
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////
        default: return state;
    }
}

export default reducer;