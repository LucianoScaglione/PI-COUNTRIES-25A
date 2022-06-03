import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailSearch } from "../redux/actions";
import style from './SearchBar.module.css'


const SearchBar = ({ setPaginaActual }) => {

  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const conteiner = useSelector(state => state.countriesCopy)


  const handleSubmit = e => {
    e.preventDefault()
    const found = conteiner.filter(e => e.name.toLowerCase().includes(input.toLowerCase()))
    if (!found.length) {
      return alert('No existe el país buscado.')
    } else {
      dispatch(detailSearch(input))
      setInput('')
      setPaginaActual(1)
    }
  }


  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <div className={style.contenedor}>
      <form onSubmit={handleSubmit}>
        <input className={style.write} type="search" value={input} placeholder="Buscar país..." onChange={handleChange} />
        <input className={style.search} type="submit" value='🔍'/>
      </form>
    </div>
  )
}

export default SearchBar;

