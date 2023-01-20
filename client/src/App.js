import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LandingPage from '../src/components/LandingPage';
import Detail from '../src/components/Detail';
import Home from './components/Home';
import Card from './components/Card';
import React from 'react';
import DogCreate from './components/DogCreate';
import CreateDog from './actions/index'




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Route exact path='/'component={LandingPage}/>
      <Route  path='/home' component={Home} />
      {/* <Route exact path='/home/' component={Card}/> */}
      <Route path='/CrearDogs' component={DogCreate}/> 
      <Route exact path='/dogs/:id' render={({ match }) => <Detail id={match.params.id} />} />

      
      
    </div>
    </BrowserRouter>
  );
}

export default App;
