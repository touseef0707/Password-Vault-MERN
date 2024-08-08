// import React, { useState } from 'react';
// import useSignup from '../../hooks/useSignup';  // Import the useSignup hook

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const { signup, loading } = useSignup();  // Destructure signup function and loading state from useSignup hook

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(formData);  // Call the signup function with formData
//   };

//   return (
//     <div className='h-full w-full p-6 flex-col justify-center items-center'>
//       <h2 className='text-2xl text-cyan-aqua-500 font-bold mb-4'>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <input 
//             type='email' 
//             id='email' 
//             name='email' 
//             placeholder='example@gmail.com' 
//             className='w-full px-4 py-2 border rounded-lg' 
//             value={formData.email} 
//             onChange={handleChange}  // Handle input change
//             required 
//           />
//         </div>
//         <div className='mb-4'>
//           <input 
//             type='password' 
//             id='password' 
//             name='password' 
//             placeholder='password' 
//             className='w-full px-4 py-2 border rounded-lg' 
//             value={formData.password} 
//             onChange={handleChange}  // Handle input change
//             required 
//           />
//         </div>
//         <div className='mb-4'>
//           <input 
//             type='password' 
//             id='cpassword' 
//             name='confirmPassword' 
//             placeholder='confirm password' 
//             className='w-full px-4 py-2 border rounded-lg' 
//             value={formData.confirmPassword} 
//             onChange={handleChange}  // Handle input change
//             required 
//           />
//         </div>
//         <button 
//           type='submit' 
//           className={`w-full bg-cyan-aqua-700 text-white py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={loading}  // Disable the button if loading
//         >
//           {loading ? 'Signing up...' : 'Signup'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;