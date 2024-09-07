import React, { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore.jsx';

const AddCustomerSupport = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/add-customer-support', { username, password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Customer support user added successfully');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Failed to add customer support user');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Add Customer Support</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Customer Support
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default AddCustomerSupport;
