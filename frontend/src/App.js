import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Expense from "./components/expense/Expense";
import Login from "./components/login/Login";
import NoPage from "./components/noPage/NoPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Expense />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
