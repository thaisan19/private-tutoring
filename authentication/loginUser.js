import axios from 'axios'

// export const singup = async item => {
//  let data = {
//   username: item.username,
//   email: item.email,
//   password: item.password,
//   roles: ["tutor"]
//  };
//  let request = {
//   url: "",
//   method: "post",
//   headers: {
//    "Content-type": "application/json"
//   },
//   data: JSON.stringify(data)
//  };

//  const res = await axios(request)
//  return res;
// };

export const login = async item => {
 let data = {
  email: item.email,
  password: item.password
 };
 let request = {
  url: "http://localhost:5000/api/tutor/tutorLogin",
  method: "post",
  headers: {
   "Content-type": "application/json"
  },
  data: JSON.stringify(data)
 };

 const res = await axios(request);
 return res;
}