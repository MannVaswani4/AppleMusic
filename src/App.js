import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useState } from "react";
import Songs from "./components/Songs";

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonPath, setButtonPath] = useState('');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Wrapper buttonText={buttonText} buttonPath={buttonPath} isLoggedIn={login} setLogin={setLogin} setToken={setToken} />,
      children: [
        {
          path: '/',
          element: <Home setButtonText={setButtonText} setButtonPath={setButtonPath} />
        },
        {
          path: '/song/:id',
          element: login ? <Songs token={token} /> : <Navigate replace to="/signin" />
        },
        {
          path: '/signin',
          element: <Signin setButtonText={setButtonText} setButtonPath={setButtonPath} setLogin={setLogin} setToken={setToken} />
        },
        {
          path: '/signup',
          element: <Signup setButtonText={setButtonText} setButtonPath={setButtonPath} setLogin={setLogin} setToken={setToken} />
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

function Wrapper({ buttonText, buttonPath, isLoggedIn, setLogin, setToken }) {
  return (
    <>
      <header className="fixed w-full">
        <Nav buttonText={buttonText} buttonPath={buttonPath} isLoggedIn={isLoggedIn} setLogin={setLogin} setToken={setToken} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}