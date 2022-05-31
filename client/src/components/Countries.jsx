import { useState, useEffect } from 'react';
import { filtrarPaisesPorContinente, filtrarPaisesPorOrden, filtrarPaisesPorCantidad, showAllCountries } from "../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Countries.module.css';
import SearchBar from '../forms/SearchBar';
import Paginado from './Paginado';
import Formularios from '../forms/Formularios';

function Countries() {

  const dispatch = useDispatch()
  const countries = useSelector(state => state.countries)

  ////////////////////////////////// PAGINADO:////////////////////////////////////////////////
  const [paginaActual, setPaginaActual] = useState(1) // página actual arranca en 1
  const [paisesPorPagina, setPaisesPorPagina] = useState(10) // países por página
  const indiceUltimoPais = paginaActual * paisesPorPagina // pagina 1= 10  // pagina 2 = 20 // pagina 3 = 30
  const indicePrimerPais = indiceUltimoPais - paisesPorPagina // pagina 1:  10 - 10 = 0 // pagina 2: 20 - 10 = // pagina 3: 30 - 10 = 20

  const paisActual = countries.slice(indicePrimerPais, indiceUltimoPais) // recorta del indice 1 al ultimo indice y lo muestra
  const paginado = (pageNumber) => {
    setPaginaActual(pageNumber)
  } // con esta función cambiamos el estado de paginaActual, que en un principio arranca en 1, y, a medida que vayamos cambiando la página, cambiará el estado
  //////////////////////////////////////////////////////////////////////////////////////////////



  ////////////////////////////////////////// FILTRADO://////////////////////////////////////////
  const [orden, setOrden] = useState('')

  const manejarFiltradoPorContinente = (e) => {
    dispatch(filtrarPaisesPorContinente(e.target.value))
    setPaginaActual(1)
  }

  const manejarFiltradoPorOrden = (e) => {
    e.preventDefault()
    dispatch(filtrarPaisesPorOrden(e.target.value))
    setPaginaActual(1)
    setOrden(e.target.value)
  }

  const manejarFiltradoPorCantidad = (e) => {
    e.preventDefault()
    dispatch(filtrarPaisesPorCantidad(e.target.value))
    setPaginaActual(1)
    setOrden(e.target.value)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => dispatch(showAllCountries()), [dispatch])
  
  return (
    <div>
      <Link to='/activity'>
        <h3 className={style.activity}>Crear actividad</h3>
      </Link>

      <SearchBar setPaginaActual={setPaginaActual} />

      {/*////////////////////////////////Filtrado:////////////////////////////////////////////////*/}
      <div className={style.filtrado}>
        <select onChange={e => manejarFiltradoPorContinente(e)}>
          <option hidden>Continentes</option>
          <option value='All'>Todos</option>
          <option value='Africa'>África</option>
          <option value='Americas'>América</option>
          <option value='Antarctic'>Antártida</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europa</option>
          <option value='Oceania'>Oceanía</option>
        </select>

        <select onChange={e => manejarFiltradoPorOrden(e)}>
          <option hidden>Ordenar de forma</option>
          <option value='az'>A-Z</option>
          <option value='za'>Z-A</option>
        </select>

        <select onChange={e => manejarFiltradoPorCantidad(e)}>
          <option hidden>Ordenar por población</option>
          <option value='mayor'>Mayor población</option>
          <option value='menor'>Menor población</option>
        </select>
      </div>
      {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
      <Paginado
        paisesPorPagina={paisesPorPagina}
        countries={countries.length}
        paginado={paginado}
      />
      <div className={style.contenedorCountry}>
        {
          paisActual && paisActual.map(e => {
            return (
              <div className={style.country}>
                <Link to={`/countries/${e.id}`} >
                  <img src={e.flags} alt='Img not found' />
                  <div className={style.text}>
                    <h2>{e.name}</h2>
                    <p>Continente: {e.continent}</p>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
      <Paginado
        paisesPorPagina={paisesPorPagina}
        countries={countries.length}
        paginado={paginado}
      />
    </div >
  );
}

export default Countries;














