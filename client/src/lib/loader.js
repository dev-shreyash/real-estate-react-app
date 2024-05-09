import { defer } from "react-router-dom";
import apiRequest from "./apiRequest.js";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
   // const res = await apiRequest("/posts/" + params.id);
    //return res.data;

    const query =request.url.split("?")[1]

    const postPromise= await apiRequest("/posts?"+query)
    //console.log(res.data)


    return defer({
        postResponse:postPromise.data
    })
  };

  export const profilePageLoader = async ( ) => {

 
     const postPromise= await apiRequest("/users/profilePosts")
     const chatPromise= await apiRequest("/chats")

 
     return defer({
         postResponse:postPromise,
          chatResponse:chatPromise

     })
   };
 
