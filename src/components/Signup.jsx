import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({setButtonText, setButtonPath, setLogin, setToken}) => {
  const route = useNavigate();

  setButtonText('Sign In');
  setButtonPath('/signin');

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    appType: 'music'
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setLogin(true);
      setToken(storedToken);
      route('/');
    }
  }, [setLogin, setToken, route]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectID': 'hb37kd6oux6l',
          'accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const datas = await response.json();

      if (datas.status === "fail") {
        setError(datas.message);
      } else {
        // Store the token in localStorage
        localStorage.setItem('token', datas.token);
        setLogin(true);
        setToken(datas.token);
        route('/');
      }
    } catch (error) {
      setError('An error occurred while signing up. Please try again later.');
      console.error('Error:', error);
    }
  };

    return (
        <div className='flex justify-center text-center flex-col bg-[#262628] h-[100dvh]'>
            <i className="fa-brands fa-apple fa-2xl text-[#6e6e73] text-7xl"></i>
            <br />
            <h1 className='text-[#E2E2E4] text-[x-large]'>Sign Up</h1>
            <p className='text-[#6F6F74] m-2.5'>Enter your Name, email address and password to get started</p>
            {error && <div className='text-[#FA233B] mb-4'>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    className='w-80 h-14 rounded-2xl m-2.5 bg-[#262628] border-2 border-[#525256] border-solid pl-1'
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={data.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    className='w-80 h-14 rounded-2xl m-2.5 bg-[#262628] border-2 border-[#525256] border-solid pl-1'
                    type='email'
                    name='email'
                    placeholder='Email or Apple ID'
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    className='w-80 h-14 rounded-2xl m-2.5 bg-[#262628] border-2 border-[#525256] border-solid pl-1'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button
                    className='text-white px-3 py-2 bg-[#FA233B] rounded-[9.3px] m-2.5 border-1 border-[#821F2B]'
                    type="submit"
                >
                    Continue
                </button>
            </form>
            <p className='text-[#FA233B]'>Already Have an Account? <Link to='/signin' className='underline'>Sign In</Link></p>
        </div>
    )
}

export default Signup;