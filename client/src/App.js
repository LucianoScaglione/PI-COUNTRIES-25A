import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/Home';
import Countries from './components/Countries';
import DetailCountry from './components/DetailCountry'
import Formularios from './components/Formularios';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home} />
      <Route exact path='/countries' component={Countries} />
      <Route path='/countries/:id' component={DetailCountry} />
      <Route path='/activity' component={Formularios} />
    </div>
  );
}

export default App;

