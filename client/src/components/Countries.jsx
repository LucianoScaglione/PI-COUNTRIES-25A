import { useState, useEffect } from 'react';
import { showAllCountries } from "../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Country.module.css';
import SearchBar from '../forms/SearchBar';
import Paginado from './Paginado';

function Countries() {

  const dispatch = useDispatch()
  const countries = useSelector(state => state.countries)
  ////////////////////////////////////////// PAGINADO:///////////////////////////////////////////////////////////////
  const [paginaActual, setPaginaActual] = useState(1) // página actual arranca en 1
  const [paisesPorPagina, setPaisesPorPagina] = useState(10) // países por página
  const indiceUltimoPais = paginaActual * paisesPorPagina // pagina 1= 10  // pagina 2 = 20 // pagina 3 = 30
  const indicePrimerPais = indiceUltimoPais - paisesPorPagina // pagina 1:  10 - 10 = 0 // pagina 2: 20 - 10 = // pagina 3: 30 - 10 = 20

  const paisActual = countries.slice(indicePrimerPais, indiceUltimoPais) // recorta del indice 1 al ultimo indice y lo muestra
  const paginado = (pageNumber) => {
    setPaginaActual(pageNumber)

  } // con esta función cambiamos el estado de paginaActual, que en un principio arranca en 1, y, a medida que vayamos cambiando la página, cambiará el estado
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  useEffect(() => dispatch(showAllCountries()), [dispatch])

  return (
    <div>
      <h1 className={style.h1}>Countries App</h1>
      <SearchBar />
      <Paginado
        paisesPorPagina={paisesPorPagina}
        countries={countries.length}
        paginado={paginado}
      />
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
      <Paginado
        paisesPorPagina={paisesPorPagina}
        countries={countries.length}
        paginado={paginado}
      />
    </div >
  );
}

export default Countries;
