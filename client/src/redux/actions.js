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
