import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Error from "./pages/error";

function App() {
  return (
    <>
      <Link to="/"> Dashboard</Link>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  )
}

export default App;