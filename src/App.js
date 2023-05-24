import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import {
  AllProperty,
  ShareLayout,
  Addproperty,
  Profile,
  Stats
} from './pages/dashboard'


function App() {
  return (
    <BrowserRouter>



      <Routes>

        <Route path='/dashboard' element={
          <ProtectedRoute>

            <ShareLayout />

          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path='all-property' element={<AllProperty />} />
          <Route path='add-property' element={<Addproperty />} />
          <Route path='profile' element={<Profile />} />

        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />

        <Route path='*' element={<Error />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
