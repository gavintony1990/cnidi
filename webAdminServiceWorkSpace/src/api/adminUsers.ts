import client from "./client";

export interface AdminUserListItem {
  id: number;
  username: string;
  nickname: string;
  mobile?: string;
  email?: string;
  userType: "ADMIN" | "NORMAL";
  status: "ENABLED" | "DISABLED" | "LOCKED";
  roleCodes: string[];
  createTime: string;
}

export interface AdminUserQueryParams {
  pageNum: number;
  pageSize: number;
  username?: string;
  nickname?: string;
  mobile?: string;
  status?: string;
  userType?: string;
}

export interface AdminUserPageResponse {
  pageNum: number;
  pageSize: number;
  total: number;
  records: AdminUserListItem[];
}

export const adminUsersApi = {
  list: (params: AdminUserQueryParams) =>
    client
      .get<{ data: AdminUserPageResponse }>("/admin/users", { params })
      .then((r) => r.data.data),
};
