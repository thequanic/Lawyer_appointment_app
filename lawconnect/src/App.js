import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css';



// import Home from './Components/Home';
// import About from './Components/About';
import Main from './Components/Main';
import Home from "./Components/Home";
import Connection from "./Components/Connection";
import MyProfile from "./Components/MyProfile";
import Appointments from "./Components/Appointments";
import About from "./Components/About";
import AppState from './Context/AppState';

// import ViewPage from "./Components/ViewPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import View from "./Components/View";




function App() {
  
  return (
    <>

    <AppState>
    
 
    <BrowserRouter>
      
      <Routes>
        
          <Route path="/" element={<Main/>}>
           <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element ={<Signup/>}/>
          
            <Route path="/about" element={<About/>} />
            <Route path="/appointments" element={<Appointments/>} />
            <Route path="/connection" element={<Connection/>} />
            <Route path="/myprofile" element={<MyProfile/>} />
            <Route path="/view" element={<View/>} />
          </Route>
        </Routes>
     
    </BrowserRouter>
   
    </AppState>



    </>
  );
}

export default App;

