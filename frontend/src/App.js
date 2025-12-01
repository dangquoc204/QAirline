import { BrowserRouter, useLocation } from 'react-router-dom';
import Banner from './layouts/Banner';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import AppRoutes from './AppRoutes';

function LayoutSelector() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin') || pathname === '/booking') {
    return <AppRoutes />
  }
  return (
    <>
      <>
        <Banner />
        <Navbar />
      </>
      <AppRoutes />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <LayoutSelector />
      </BrowserRouter>
    </>
  );
}

export default App;
