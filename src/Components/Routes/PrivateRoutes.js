// const get_user_data = () => {
//   try {
//     fetch(`http://0.0.0.0:8000/user/${localStorage.getItem('id')}/`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${window.localStorage.getItem("token")}`,
//       },
//     }).then(async function (response) {
//       console.log(response.status);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

import { Navigate, Outlet } from "react-router-dom";


const PrivateRoutes =() => {
  let auth = {'token': false}

  if (localStorage.getItem('token')){
    auth = {'token': true}
  } else {
    auth = {'token': false}
  }

  return (
    auth.token ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes