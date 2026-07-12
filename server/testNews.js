import dotenv from "dotenv";
dotenv.config();

import { getCompanyNews } from "./services/newServices.js";

const news = await getCompanyNews("Apple");

console.log(news);