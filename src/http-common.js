import axios from "axios"; 

console.log("Hi I am in http-common");

export default axios.create({

    baseURL:"https://public-privacy-app.azurewebsites.net/",

    headers:{
      "Content-type":"application/json"
    },
    withCredentials:true
    
})


