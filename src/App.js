import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

import AppRouter from './components/AppRouter';
import { Context } from '.';


const App = observer( () =>{

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
})

export default App;
