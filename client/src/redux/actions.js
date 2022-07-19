import axios from 'axios';

export const showAllCountries = () => {
  return (dispatch) => {
    return axios(`/countries`)
      .then(res => dispatch({ type: "SHOW_COUNTRIES", payload: res.data }))
      .catch(e => console.log(e))
  }
}

export const detailsCountry = (id) => {
  return (dispatch) => {
    return axios(`/countries/${id}`)
      .then(res => dispatch({ type: "SHOW_DETAILCOUNTRY", payload: res.data }))
      .catch(e => console.log(e))
  }
}

export const detailSearch = (name) => {
  return (dispatch) => {
    return axios(`/countries?name=${name}`)
      .then(res => dispatch({ type: "DETAIL_SEARCH", payload: res.data }))
      .catch(e => console.log(e))
  }
}

export const activityCreated = (payload) => { // payload: datos del formulario controlado
  return () => {
    return axios.post(`/activity`, payload)
      .then(res => res.data)
      .catch(error => console.log(error))
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
    return axios(`/activity`)
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
export const activityDelete = (payload) => {
  return async (dispatch) => {
    const contenedor = await axios.delete(`/activity`, { data: { idA: payload.idA, idC: payload.idC } })
    dispatch({ type: "DELETE_ACTIVITY", payload: contenedor.data })
  }
}
