import { UserModel } from '@/src/models/user.model';
import request, { Methods } from '@/src/utils/request';

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  expiresAt: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    return request<LoginResponse>({
      resource: '/api/auth/login',
      method: Methods.POST,
      body: { email, password },
    });
  }

  async register(name: string, email: string, password: string): Promise<void> {
    return request<void>({
      resource: '/api/auth/register',
      method: Methods.POST,
      body: { name, email, password },
    });
  }

  async logout(): Promise<void> {
    return request<Promise<void>>({ resource: '/api/auth/logout', method: Methods.POST });
  }

  async me(): Promise<UserModel> {
    return request<UserModel>({
      resource: '/api/auth/me',
      method: Methods.GET,
    });
  }
}

export const authService = new AuthService();
