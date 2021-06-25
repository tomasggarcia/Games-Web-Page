import React from "react"
import { Route} from "react-router-dom";

import NavBar from './components/SearchBar'
import Landing from './components/Landing'
import Origin from './components/Origin'
import Form from './components/Form'
import SearchBar from './components/SearchBar'

import './styles/styles.scss';
import GameDetails from "./components/GameDetails";

import { useLocation } from 'react-router-dom'
import SelectBar from "./components/SelectBar";



function App() {
  let location = useLocation();
  return (
    <React.Fragment>
      {location.pathname!== '/'? 
      <SearchBar />
      :null}
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={SelectBar} />
      <Route path='/home' component={Origin} />
      <Route path='/game/:game' component={GameDetails} />
      <Route path='/create' component={Form} />
      {/* <Route path='/' component={SearchBar}/>  */}
    </React.Fragment>
  )
}

export default App;
