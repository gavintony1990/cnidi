import client from "./client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  nickname?: string;
  mobile?: string;
  email?: string;
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
}

export interface RegisterResponse {
  userId: number;
  username: string;
  status: string;
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
    client
      .post<{ data: LoginResponse }>("/auth/login", data)
      .then((r) => r.data.data),

  register: (data: RegisterRequest) =>
    client
      .post<{ data: RegisterResponse }>("/auth/register", data)
      .then((r) => r.data.data),

  logout: (refreshToken: string) =>
    client
      .post<{ data: { success: boolean } }>("/auth/logout", { refreshToken })
      .then((r) => r.data.data),

  me: () =>
    client.get<{ data: CurrentUser }>("/auth/me").then((r) => r.data.data),
};
