import style from './NotFound.module.css'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={style.error}>
            <h1>Error 404:</h1>
            <p>No se encuentra ningún país con ese ID, pruebe nuevamente con algún otro.</p>
            <Link to='/countries'>
                <h3 className={style.back}>Volver</h3>
            </Link>
        </div>
    )
}

export default NotFound;