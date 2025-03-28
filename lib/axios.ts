// lib/getTenantAxios.ts
import axios, { AxiosInstance } from "axios";

export function getTenantAxios(warehouse: string): AxiosInstance {
  const instance = axios.create({
    baseURL: "/api/v1",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-tenant-id": warehouse,
    },
    withCredentials: true,
  });

  return instance;
}
