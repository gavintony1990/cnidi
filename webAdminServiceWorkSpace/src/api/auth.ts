import client from "./client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
}

export interface CurrentUser {
  id: number;
  username: string;
  roles: string[];
}

export const authApi = {
  login: (data: LoginRequest) =>
    client.post<{ data: LoginResponse }>("/auth/login", data).then((r) => r.data.data),

  logout: () =>
    client.post("/auth/logout"),

  me: () =>
    client.get<{ data: CurrentUser }>("/auth/me").then((r) => r.data.data),
};
