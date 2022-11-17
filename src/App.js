import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import axios from 'axios';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClientPage from './components/ClientPage';
import RequestsPage from './components/RequestsPage';

axios.defaults.baseURL = 'http://localhost:8000/api'

function App() {
  const [user, setUser] = useState(undefined);
  if (!user) {
    return (
      <div className='main container'>
        <div className='row mt-3'>
          <div className='col-4'>
            <Login
              onSubmit={async val => {
                try {
                  const res = await axios.post('/login', val);
                  setUser(res.data.user);
                  axios.defaults.headers.common.authorization = 'Bearer ' + res.data.token;
                } catch (error) {
                  alert("Error");
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/client' element={(<ClientPage />)} />
          <Route path='/' element={(<RequestsPage />)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
