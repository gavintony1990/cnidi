import client from "./client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  userId: number;
  username: string;
  nickname: string;
  userType: string;
  roles: string[];
  permissions: string[];
  token?: string;
  expiresIn: number;
}

export interface CurrentUser {
  userId: number;
  username: string;
  nickname: string;
  userType: string;
  roles: string[];
  permissions: string[];
}

export const authApi = {
  login: (data: LoginRequest) =>
    client.post<{ data: LoginResponse }>("/auth/login", data).then((r) => r.data.data),

  logout: (refreshToken: string) =>
    client.post<{ data: { success: boolean } }>("/auth/logout", { refreshToken }).then((r) => r.data.data),

  me: () =>
    client.get<{ data: CurrentUser }>("/auth/me").then((r) => r.data.data),
};
