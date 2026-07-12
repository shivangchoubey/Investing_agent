import { getCompanyFinancials } from "./services/financeServices.js"

const data = await getCompanyFinancials("Apple");

console.log(data);