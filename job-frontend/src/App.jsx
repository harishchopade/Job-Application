import { Routes, Route, useLocation } from 'react-router-dom';
import Company from './pages/Company';
import Job from './pages/Job';
import CompanyJobList from './pages/CompanyJobList';
import './App.css'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const location = useLocation();

  const hideHeaderFooter = location.pathname==='/login';
  return (
    <div className="min-h-screen bg-[#10182B] font-sans antialiased flex flex-col">

    {/* If want to show header only on home page i.e. on '/' route */}
      {/* <Routes>
        <Route path='/' element={<Header />} />
      </Routes> */}

      { !hideHeaderFooter && <Header /> }

      <main className="flex-grow max-w-7xl mx-auto p-6 lg:p-8 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<Company />} />
          <Route path="/jobs" element={<Job />} />
          <Route path="/companies/:companyId/jobs" element={<CompanyJobList />} /> 
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </main>

      {/* If want to show footer only on home page i.e. on '/' route */}
      {/* <Routes>
        <Route path='/' element={<Footer />} />
      </Routes> */}

      {/* Show footer except login page */}
      { !hideHeaderFooter && <Footer /> }
    </div>
  );
}

export default App;
