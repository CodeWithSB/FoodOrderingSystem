import Footer from './Shared/Footer/Footer';
import Home from './Pages/Home/Home';
import ItemStore from './Shared/itemstore'; 
import NavBar from './Shared/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Menu from './Pages/Menu/Menu';
import Cart from './Pages/Cart/Cart';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion'
import Offers from './Pages/Offers/Offers';
import Authentication from './Pages/AuthPages/Authentication'; 
import PageNotFound from './Pages/PageNotFound';
import Dashboard from './Pages/Dashboard/Dashboard';
import Orders from './Pages/Orders/Orders';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E7301C'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ItemStore>
        <Router>
          <div className="h-full">
            <NavBar />
            <div className="bg-lightgray md:min-h-content flex w-full">
              <AnimatePresence exitBeforeEnter>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/menu" exact component={Menu} />
                  <Route path="/cart" exact component={Cart} />
                  <Route path="/offers" exact component={Offers} />
                  <Route path="/dashboard" exact component={Dashboard} />
                  <Route path="/orders" exact component={Orders} />
                  <Route path="/auth/signup" exact component={() => <Authentication page={`signup`} />} />
                  <Route path="/auth/login" exact component={() => <Authentication page={`login`} />} />
                  <Route path='*' exact={true} component={PageNotFound} /> 
                </Switch>
              </AnimatePresence>
            </div>
            <Footer />
          </div>
        </Router>
      </ItemStore>
    </MuiThemeProvider>
  );
}

export default App;
