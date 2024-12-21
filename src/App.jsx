import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Rates from './pages/Rates';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFetchCurrency } from './redux/currency/operations';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;

      dispatch(getFetchCurrency(crd));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
