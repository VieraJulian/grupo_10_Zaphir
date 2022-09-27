import {Routes,Route,Link}from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Detail from "./pages/Detail";
import Error from "./pages/error";
function App() {
  

  return (
    <div className="App">
     <Link to="/dashboard"> Dashboard</Link>
     <Routes>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/detail/:id" element={<Detail/>}></Route>
      <Route path="*" element={<Error/>}></Route> 
     </Routes>
    </div>
  )
}

export default App;
