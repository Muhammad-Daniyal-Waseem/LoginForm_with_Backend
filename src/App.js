import React from "react";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route
            path="/form/notes"
            element={
              <>
                <Form />
                <Notes />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
