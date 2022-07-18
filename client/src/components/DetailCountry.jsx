import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activityDelete, detailsCountry } from '../redux/actions';
import style from './DetailCountry.module.css';
import { Link } from 'react-router-dom'
import NotFound from './NotFound'
import Loading from './Loading';

const DetailCountry = (props) => {
  const dispatch = useDispatch()
  const details = useSelector(state => state.detailCountry)
  const idParams = props.match.params.id
  const [loader, setLoader] = useState(true)

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(activityDelete({ idA: e.target.value, idC: idParams }))
  }

  useEffect(() => dispatch(detailsCountry(idParams)).then(() => setLoader(false)), [dispatch])

  // if (details.length === 0) {
  //   return (
  //     <NotFound />
  //   )
  // } 

  if (loader) {
    return <Loading />
  } else if (details.length === 0) {
    return (
      <NotFound />
    )
  } else {
    return (
      <div className={style.a}>
        <Link to='/countries'>
          <h3 className={style.back}>Volver</h3>
        </Link>
        <div className={style.detail}>
          <img src={details.flags} alt='Img not found' />
          <h2>{details.name}</h2>
          <p>Código: {details.id}</p>
          <p>Continente: {details.continent}</p>
          <p>Capital: {details.capital}</p>
          <p>Subregión: {details.subregion}</p>
          <p>Área: {details.area} km2</p>
          <p>Población: {details.population} habitantes</p>
          {details.TouristActivities && details.TouristActivities.map(e => {
            const contentName = e.nombre.charAt(0).toUpperCase() + e.nombre.slice(1)
            return (
              <div key={e.id} className={style.activity}>
                <button className={style.botonX} value={e.id} onClick={e => handleDelete(e)}>❌</button>
                <p>Actividad: {contentName}</p>
                <p>Dificultad: {e.dificultad}</p>
                <p>Duración: {e.duracion}</p>
                <p>Temporada: {e.temporada}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default DetailCountry;



