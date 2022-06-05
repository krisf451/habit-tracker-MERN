import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Dashboard } from "./pages";
import { Header } from "./components";

function App() {
  return (
    <div className="min-h-screen w-full max-w-[960px] mx-auto px-5 text-center">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
