import style from './Paginado.module.css'

export default function Paginado({ paisesPorPagina, countries, paginado }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(countries / paisesPorPagina); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul>
        {
          pageNumbers?.map(number => (
            <button className={style.button} onClick={() => paginado(number)}>{number}</button>
          ))
        }
      </ul>
    </nav>
  )
}