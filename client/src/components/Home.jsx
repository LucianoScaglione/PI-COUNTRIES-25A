import { Link } from 'react-router-dom';
import style from './Home.module.css';

function Home() {
    return (
        <div className={style.home}>
            <h1>Countries App</h1>
            <button className={style.button}>
                <Link to='/countries'>
                    <h3 className={style.h3}>Ingresar</h3>
                </Link>
            </button>
        </div>
    );
}

export default Home;
