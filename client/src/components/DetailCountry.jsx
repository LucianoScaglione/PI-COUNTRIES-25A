import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsCountry } from '../redux/actions';
import style from './DetailCountry.module.css';
import { Link } from 'react-router-dom'

const DetailCountry = (props) => {
  const dispatch = useDispatch()
  const details = useSelector(state => state.detailCountry)
  const idParams = props.match.params.id
  useEffect(() => dispatch(detailsCountry(idParams)), [dispatch])

  return (
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
        return (
          <div key={e.id} className={style.activity}>
            <p>Actividad: {e.nombre}</p>
            <p>Dificultad: {e.dificultad}</p>
            <p>Duración: {e.duracion}</p>
            <p>Temporada: {e.temporada}</p>
          </div>
        )
      })}
      <div>
        <Link to='/countries'>
          <h3 className={style.back}>Volver</h3>
        </Link>
      </div>
    </div>
  )
}

export default DetailCountry;



