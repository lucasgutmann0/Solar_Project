// const get_user_data = () => {
//   try {
//     fetch(`http://0.0.0.0:8000/user/${localStorage.getItem('id')}/`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${window.localStorage.getItem("access")}`,
//       },
//     }).then(async function (response) {
//       console.log(response.status);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

import { Navigate, Outlet } from "react-router-dom";


const OtherProtectedRoutes =() => {
  let auth = {'access': true}

  if (localStorage.getItem('token')){
    auth = {'access': false}
  } else {
    auth = {'access': true}
  }

  return (
    auth.access ? <Outlet /> : <Navigate to="/dashboard" />
  )
}

export default OtherProtectedRoutes