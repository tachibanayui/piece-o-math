import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {TransitionGroup, Transition, CSSTransition} from 'react-transition-group';
import MainMenu from './pages/MainMenu';
import SinglePlayerOptions from './pages/SinglePlayerOptions';
import NumberField from './components/NumberField';
import OverlayAnim from './components/OverlayAnim';
import Test from './pages/Test';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path={['/game','/game/sp/options']} exact>
            <div className='nf'><NumberField/> </div> 
        </Route>
        <Switch>
          <Route exact path='/' ><h1>Home</h1></Route>
          <Route path='/about'><h1>Home2</h1></Route>
          <Route path='/author'><h1>Home3</h1></Route>
          <Route path='/test'><Test/></Route>
          <Route path='/test-overlay'><OverlayAnim/></Route>
          <Route path='/game' exact><MainMenu/></Route>
          <Route path='/game/sp/options'><SinglePlayerOptions/></Route>
        </Switch>
      </div>
    </BrowserRouter>


  );
}

export default App;