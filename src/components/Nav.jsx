import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ buttonText, buttonPath, isLoggedIn, setLogin, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogin(false);
    setToken(null);
    navigate('/signin');
  };
  const checkLog = localStorage.getItem('isLoggedIn')
  const token = localStorage.getItem('token')

  if (checkLog === 'true' && token) {
      setLogin(true)
      setToken(token)
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-[#2c2c2c] flex flex-row justify-between text-white items-center">
        <div className='p-3'>
          <Link to='/' className='flex items-center gap-1'>
            <i className="fa-brands fa-apple fa-2xl text-white" />
            <span className='text-xl text-white'>Music</span>
          </Link>
        </div>
        <div className='p-3 '>
          {isLoggedIn ? (
            <button
              className='bg-[#d60017] rounded-md py-1 px-2 text-white'
              onClick={handleLogout}
            >
              <i className="fa-solid fa-user" /> Logout
            </button>
          ) : (
            <Link to={buttonPath}>
              <p className='bg-[#d60017] rounded-md py-1 px-2 text-white'>
                <i className="fa-solid fa-user" /> {buttonText}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;