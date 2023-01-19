import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Container maxW={"full"} p="4" fontSize={"18px"}>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
