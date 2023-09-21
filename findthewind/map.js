import { options, success, error, map } from "./currentlocation.js";
import { address, currentCenter } from "./searchlocation.js";

navigator.geolocation.getCurrentPosition(success, error, options);
