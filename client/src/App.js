import './App.css';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import CreateDog from './components/CreateDog/CreateDog';
import DetailedCard from './components/DetailedCard/DetailedCard';
// import About from './components/About/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= "/" component= {LandingPage}/>
          <Route exact path="/home" component= {Home}/>
          <Route path="/create" component= {CreateDog} />
          <Route path="/home/:id" component= {DetailedCard}/>
          <Route path="/" component= {NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
