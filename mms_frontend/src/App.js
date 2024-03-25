import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './Router';
import './App.css';

import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
