import { config } from "./config";

export const environment = {
  production: true,
  apiKey: config.apiKey,
  baseUrl: config.baseUrl
};
