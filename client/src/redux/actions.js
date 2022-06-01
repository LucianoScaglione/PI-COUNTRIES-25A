import axios from 'axios';


export const showAllCountries = () => {
  return (dispatch) => {
    return axios("http://localhost:3001/countries")
      .then(res => dispatch({ type: "SHOW_COUNTRIES", payload: res.data }))
      .catch(e => console.log(e))
  }
}

export const detailsCountry = (id) => {
  return (dispatch) => {
    return axios(`http://localhost:3001/countries/${id}`)
      .then(res => dispatch({ type: "SHOW_DETAILCOUNTRY", payload: res.data }))
      .catch(e => console.log(e))
  }
}

export const detailSearch = (name) => {
  return (dispatch) => {
    return axios(`http://localhost:3001/countries?name=${name}`)
      .then(res => dispatch({ type: "DETAIL_SEARCH", payload: res.data }))
      .catch(e => console.log(e))
  }
}

export const activityCreated = (payload) => { // payload: datos del formulario controlado
  return async () => {
    const json = await axios.post("http://localhost:3001/activity", payload)
    console.log(json)
    return json;
  }
}




///////////////////////////FILTRADO://////////////////////////////////////////////////////////
export const filtrarPaisesPorContinente = (payload) => {
  return {
    type: "FILTRAR_POR_CONTINENTE",
    payload
  }
}

export const filtrarPaisesPorOrden = (payload) => {
  return {
    type: "FILTRAR_POR_ORDEN",
    payload
  }
}

export const filtrarPaisesPorCantidad = (payload) => {
  return {
    type: "FILTRAR_POR_CANTIDAD",
    payload
  }
}

export const traerActividades = () => {
  return (dispatch) => {
    return axios('http://localhost:3001/activity')
      .then(res => dispatch({ type: "TRAER_ACTIVIDADES", payload: res.data }))
      .catch(e => console.log(e))
  }
}

export const filtrarPorActividad = (payload) => {
  return {
    type: "FILTRAR_POR_ACTIVIDAD",
    payload
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////