import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../state/index';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userTypeDataMap = {
    Student: 'student',
    Alumni: 'alumni',
    Admin: 'admin',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userType) {
      setError('Please select a user type.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`http://localhost:3004/auth/login${userType}`, {
        email,
        password,
      });

      const { token, ...userData } = response.data;
      const userKey = userTypeDataMap[userType];
      const user = userData[userKey];

      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);

      dispatch(loginUser({ user, token, type: `${userType.toLowerCase()}/login` }));

      if (userType === 'Admin') {
        navigate('/admin/alumni');
      } else if (userType === 'Alumni') {
        navigate(`/alumni/${user._id}/queries`);
      } else {
        navigate(`/student/${user._id}/dashboard`);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || 'Invalid email or password');
      } else if (err.request) {
        setError('Server did not respond. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-white">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="text-sm text-blue-200 mb-4">
          <a className="hover:text-blue-800" href="https://central.sjceplacements.org/">
            Click here to redirect to the college placement website
          </a>
        </div>

        <div className="flex justify-center md:pt-4">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Student_%28example%29.svg/888px-Student_%28example%29.svg.png"
              className="w-20 h-20"
              alt="Logo"
            />
          </a>
        </div>
        <div className="flex flex-col justify-center md:justify-start w-full max-w-md my-2 pt-8 md:pt-1 px-8">
          <p className="text-center text-gray-800 text-3xl pb-4">Login</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center py-2">
            {['Alumni', 'Student', 'Admin'].map((type) => (
              <button
                key={type}
                className={`py-2 px-6 text-white font-semibold border border-gray-500 rounded ${
                  userType === type ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                onClick={() => setUserType(type)}
                style={{ marginRight: type !== 'Admin' ? '5px' : 0 }}
              >
                {type}
              </button>
            ))}
          </div>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleLogin}>
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg text-gray-400">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your Email here!"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg text-gray-400">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password here!"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <input
              type="submit"
              value={loading ? 'Logging in...' : 'Log In'}
              disabled={loading}
              className="bg-blue-900 text-white font-bold text-lg hover:bg-blue-200 hover:text-gray-900 py-2 px-4 rounded-xl mt-8"
            />
          </form>
          <div className="text-center pt-12 pb-12">
            <p>Don't have an account? <a href="/signup" className="underline font-semibold hover:bg-blue-200">Register here</a></p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img className="object-cover w-screen h-full hidden md:block"
          src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background" />
      </div>
    </div>
  );
};

export default Login;
