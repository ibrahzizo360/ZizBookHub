import "./App.css";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Profile from "./pages/Profile";
import Books from "./pages/Books";

function App() {
  

  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/books' element={<Books/>}/>         
        </Route>
        <Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
  );
}

export default App;
