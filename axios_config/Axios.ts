import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: "https://www.technicalsewa.com/techsewa/publiccontrol",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
export default AxiosInstance

export const AxiosCorsInstance = axios.create({
  baseURL: "/api/https://www.technicalsewa.com/techsewa",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
