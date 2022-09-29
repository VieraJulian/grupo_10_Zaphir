import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import UserDetail from './pages/UserDetail'
import Error from "./pages/error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/user/detail/:id" element={<UserDetail />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  )
}

export default App;