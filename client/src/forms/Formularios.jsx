import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { activityCreated, showAllCountries } from '../redux/actions'
import stylecss from './Formularios.module.css'
import { Link } from 'react-router-dom'

const validaciones = (input) => {
  const errores = {}

  ////////NOMBRE////////////
  if (!input.nombre.length) {
    errores.nombre = "Campo obligatorio"
  } else if (input.nombre.length < 4) {
    errores.nombre = "Actividad muy corta"
  } else if (!/^[a-zA-Z ]*$/.test(input.nombre)) {
    errores.nombre = "Sólo se permiten palabras"
  }
  //////////////////////////

  ////////DIFICULTAD////////
  if (!input.dificultad.length) {
    errores.dificultad = "Campo obligatorio"
  } else if (input.dificultad < 1 || input.dificultad > 5 || input.dificultad % 1 !== 0) {
    errores.dificultad = "La dificultad debe ser entre 1 y 5"
  }
  /////////////////////////

  ////////TEMPORADA////////
  if (!input.temporada.length) {
    errores.temporada = "Campo obligatorio"
  } else if (input.temporada !== 'Verano' && input.temporada !== 'Otoño' && input.temporada !== 'Invierno' && input.temporada !== 'Primavera') {
    errores.temporada = "Solamente puedes elegir las temporadas 'Verano, Otoño, Invierno y Primavera'"
  }
    // } else if (!/^[a-zA-Z ]*$/.test(input.temporada)) {
    //   errores.temporada = "Sólo se permiten palabras"
    // }
  /////////////////////////

  ////////DURACION////////
  if (!input.duracion.length) {
    errores.duracion = "Campo obligatorio"
  } else if (input.duracion.length < 3) {
    errores.duracion = "Este campo debe contener un mínimo de 3 caracteres"
  }
  ///////////////////////

  return errores
}


const Formularios = () => {

  const dispatch = useDispatch()
  const paises = useSelector((state) => state.countries)
  useEffect(() => dispatch(showAllCountries()), [dispatch])

  const [input, setInput] = useState({
    paises: [],
    nombre: '',
    dificultad: '',
    duracion: '',
    temporada: ''
  })

  const [errores, setErrores] = useState([]);

  const handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    setErrores(validaciones({
      ...input, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.dificultad.length || !input.temporada.length || !input.nombre.length || !input.duracion.length || !input.paises.length) {
      alert("Faltan completar datos.")
    } else if (errores.dificultad || errores.temporada || errores.nombre || errores.duracion) {
      alert("Revisar bien los campos completados.")
    } else {
      dispatch(activityCreated(input))
      alert("Actividad creada!")
      setInput({
        paises: [],
        nombre: '',
        dificultad: '',
        duracion: '',
        temporada: ''
      })
    }
  }

  const selectCountry = (e) => {
    e.preventDefault()

    let contenedor = [...input.paises]
    let found = contenedor.filter(p => p === e.target.value)

    if (!found.length) {
      setInput({
        ...input, paises: [...input.paises, e.target.value]
      })
    } else {
      alert("El país ya está seleccionado.")
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      paises: input.paises.filter(p => p !== e.target.value)
    })
  }


  return (
    <div>
      <Link to='/countries'>
        <h3 className={stylecss.back}>Volver</h3>
      </Link>
      <div className={stylecss.fondo}>
        <h1 className={stylecss.h1}>¡Crea tu actividad!</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className={stylecss.label}>Países</label>
            <select className={stylecss.input} onChange={(e) => selectCountry(e)}>
              <option hidden>Seleccionar países</option>
              {paises && paises.map(e => (
                <option value={e.name}>{e.name}</option>
              ))}
            </select> <br />
            <ul>
              {input.paises.map(e => {
                return (
                  <div className={stylecss.contenedorLi}>
                    {e}
                    <button className={stylecss.delete} value={e} onClick={(e) => handleDelete(e)}>X</button>
                  </div>
                )
              })
              }
            </ul>
          </div>
          < label className={stylecss.label}>Nombre de la actividad</label>
          <input className={stylecss.input} type='text' name='nombre' value={input.nombre} maxlength={15} placeholder='Ej: Boxeo...' onChange={handleChange} />
          {errores.nombre && (<p className={stylecss.danger}>{errores.nombre}</p>)}

          < label className={stylecss.label} > Dificultad</label>
          <input className={stylecss.input} type='number' name='dificultad' value={input.dificultad} placeholder='Ej: 5...' onChange={handleChange} />
          {errores.dificultad && (<p className={stylecss.danger}>{errores.dificultad}</p>)}

          <label className={stylecss.label}>Duración</label>
          <input key='duracion' className={stylecss.input} type='text' name='duracion' value={input.duracion} maxlength={15} placeholder='Ej: 3 meses...' onChange={handleChange} />
          {errores.duracion && (<p className={stylecss.danger}>{errores.duracion}</p>)}

          <label className={stylecss.label}>Temporada</label>
          <input key='temporada' className={stylecss.input} type='text' name='temporada' value={input.temporada} maxlength={9} placeholder='Ej: Verano...' onChange={handleChange} />
          {errores.temporada && (<p className={stylecss.danger}>{errores.temporada}</p>)}

          <br />

          <input key='submit' className={stylecss.inputsolo} type='submit' value='Crear actividad' />
        </form>
      </div>
    </div >
  )
}


export default Formularios;

