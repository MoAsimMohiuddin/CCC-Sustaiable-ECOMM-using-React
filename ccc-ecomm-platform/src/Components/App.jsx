import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Missing from './Missing';

const App=()=>{
  return (
    <BrowserRouter>
    <main>
      <Routes>
        <Route exact path='/' element={<Navigate to='/register'/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/*' element={<Missing/>}/>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
