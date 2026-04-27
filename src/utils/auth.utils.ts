import { UserRole } from '@/src/models/user.model';
import { authService } from '@/src/services/auth.service';
import { clearUser, setUser } from '@/src/store/slices/authSlice';
import { AppDispatch } from '@/src/store/store';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  const data = await authService.login(email, password);
  dispatch(
    setUser({
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role as UserRole,
    })
  );
};

export const logout = () => async (dispatch: AppDispatch) => {
  await authService.logout();
  dispatch(clearUser());
};
