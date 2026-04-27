import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserModel } from '@/src/models/user.model';

interface AuthState {
  user: UserModel | null;
}
// TODO: Mock user eltávolítása amikor Login oldal kész
// Endpoint: POST /api/projects
// const mockUser: UserModel = {
//   id: '1',
//   password: 'querty',
//   email: 'querty@gmail.com',
//   name: 'Kovács',
//   role: 'PM',
// };

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
