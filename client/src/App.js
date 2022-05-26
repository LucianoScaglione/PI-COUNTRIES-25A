import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/Home';
import Countries from './components/Countries';
import DetailCountry from './components/DetailCountry'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home} />
      <Route exact path='/countries' component={Countries} />
      <Route path='/countries/:id' component={DetailCountry} />
    </div>
  );
}

export default App;
