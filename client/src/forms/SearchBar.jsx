import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailSearch } from "../redux/actions";


const SearchBar = () => {

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
    }
  }


  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" value={input} placeholder="Ciudad..." onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default SearchBar;

