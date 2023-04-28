import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const List = React.lazy(() => import('./pages/List'));
const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path='/list'
            name='List Page'
            element={<List />}
          />
          <Route
            path='*'
            name='Home'
            element={<Home />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
