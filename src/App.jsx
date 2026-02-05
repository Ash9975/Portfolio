import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
