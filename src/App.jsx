import { useState } from "react";
import "./App.css";
import Post from "./components/Post";
import Read from "./components/Read";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/post" element={<Post />} />
        <Route path="/" element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
