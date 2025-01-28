// import axios from 'axios';

// // Get token from local storage
// const token = localStorage.getItem('jwtToken');

// // Create an axios instance with Authorization header
// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// // Example of accessing a protected resource
// async function getProtectedData() {
//   try {
//     const response = await api.get('/protected');
//     console.log('Protected data:', response.data);
//   } catch (error) {
//     console.log('Error accessing protected route:', error.response.data);
//   }
// }



// function logout() {
//     localStorage.removeItem('jwtToken');
//     console.log('Logged out');
//   }
  
  

// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// function ProtectedRoute({ component: Component, ...rest }) {
//   const isAuthenticated = localStorage.getItem('jwtToken') ? true : false;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// }
