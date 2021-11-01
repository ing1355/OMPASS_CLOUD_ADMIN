import './App.css';
import Contents from './Layout/Contents/Contents';
import Header from './Layout/Header/Header'
import Sidebar from './Layout/Sidebar/Sidebar';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './Layout/Footer/Footer';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Sidebar />
        <Contents />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
