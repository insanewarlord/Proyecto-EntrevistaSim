import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Spinner from "./components/spinner";
import { AuthProvider } from "./context/authContext";
import AreaStudent from "./pages/AreaStudent";
import AreaTeacher from "./pages/AreaTeacher";
import { ProtectedRoute } from "./routes";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  ) : (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/student" element={<AreaStudent />} />
            <Route path="/teacher" element={<AreaTeacher />} />
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          closeOnClick={false}
          pauseOnHover={true}
          draggablePercent={100}
          bodyClassName={"text-sm p-2 m-2 "}
          theme={"light"}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
