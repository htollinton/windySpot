const url =
  "https://isitwater-com.p.rapidapi.com/?latitude=41.9029192&longitude=-70.2652276";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "33e85a234fmshfca25416192234cp1d6b6cjsnfb11f57b5b89",
    "X-RapidAPI-Host": "isitwater-com.p.rapidapi.com",
  },
};
let result;
try {
  const response = await fetch(url, options);
  let result = await response.text();

  console.log(result);
} catch (error) {
  console.error(error);
}
export default url;
