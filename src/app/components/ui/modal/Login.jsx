'use client';
import React, { useState } from 'react';
import { Input } from '../input/input';
import Loader from '../status/Loader';
import Logo from '../logo/Logo';
// import httpClient from '../../../config/httpClient';

const LoginModal = ({ isOpen, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setError('');
  //   setSuccessMessage('');

  //   try {
  //     const res = await httpClient.post('/api/v1/user/auth/login-mobile', { mobile });

  //     if (res.status !== 200) {
  //       setError(res?.data?.message || 'Login failed');
  //     } else {
  //       setSuccessMessage(res?.data?.message || 'Login successful');
  //       localStorage.setItem('token', res?.data?.token);

  //       setTimeout(() => {
  //         onClose();
  //       }, 1000);
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err?.response?.data?.message);
  //     setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
  //   }

  //   setIsSubmitting(false);
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-background p-6 rounded-2xl shadow-2xl w-full max-w-sm max-h-[100vh] overflow-y-auto border border-accent/60 border-4">
        <div className="flex flex-col items-center space-y-4">
          <Logo />

          <h2 className="text-xl font-bold text-center text-primary-text">
            Aapki Last Minute App
          </h2>
          <p className="text-sm text-secondary-text text-center">
            Log in or Sign up
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4 mt-1">
            <Input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our <span className="text-accent underline cursor-pointer">Terms of Service</span> & <span className="text-accent underline cursor-pointer">Privacy Policy</span>.
            </p>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            {successMessage && (
              <p className="text-sm text-green-600 text-center">{successMessage}</p>
            )}

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-muted text-primary-text hover:bg-opacity-80 transition border border-muted-foreground"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-accent text-white font-semibold hover:scale-105 transition-transform"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
