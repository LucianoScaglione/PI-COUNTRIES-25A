import style from './Paginado.module.css'

export default function Paginado({ paisesPorPagina, countries, paginado }) { // 10 // todas las ciudades(255) // pagina actual que está parado el cliente
    const pageNumbers = [] // 25 / porque hay 255 paises en total y se muestran 10 por pagina

    for (let i = 1; i <= Math.ceil(countries / paisesPorPagina /*resultado= 25*/); i++) {
        pageNumbers.push(i)
    } // esta función sirve para mostrar el total de las páginas que existen, que le mostrará al usuario para que pueda recorrer.

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