import { UserResponse, UserRole } from '@/src/models/user.model';
import request, { Methods } from '@/src/utils/request';

class UserService {
  async getUsers(): Promise<UserResponse> {
    return request<UserResponse>({
      resource: '/api/users',
      method: Methods.GET,
    });
  }

  async updateUserRole(userId: number, role: UserRole): Promise<UserResponse> {
    return request<UserResponse>({
      resource: `/api/users/${userId}/role`,
      method: Methods.PATCH,
      body: { role },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    return request<void>({
      resource: `/api/users/${userId}`,
      method: Methods.DELETE,
    });
  }
}
export const userService = new UserService();
