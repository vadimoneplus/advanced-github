import React from 'react';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import {FavouritesPage} from "./pages/favouritesPage";
import {Navigation} from "./components/navigation";

function App() {
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/favourites' element={<FavouritesPage/>}/>
      </Routes>
    </>

  );
}

export default App;
