import axios from "axios";

const options = {
  method: "GET",
  url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  headers: {
    "x-rapidapi-key": "1a98f9df39msh95cbda497660476p1a7263jsn1928cdd74873",
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
