// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResultPage from './pages/ResultPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/results' element={<ResultPage />} />
            <Route path='/booking' element={<BookingPage />} />
            <Route path='/confirmation' element={<ConfirmationPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/admin'element={<AdminPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}
export default App;