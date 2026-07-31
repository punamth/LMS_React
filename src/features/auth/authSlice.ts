import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth.service";
import { TokenService } from "../../services/token.service";

interface AuthState {
  user_name: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user_name: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  message: null,
};

export const signInUser = createAsyncThunk<
  string,
  { user_name: string; password: string },
  { rejectValue: string }
>(
  "auth/signInUser",
  async ({ user_name, password }, { rejectWithValue }) => {
    try {
      await AuthService.signIn(user_name, password);
      return user_name;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk<
  string,
  { user_name: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ user_name, email, password }, { rejectWithValue }) => {
    try {
      await AuthService.register(user_name, email, password);
      return "Account created. You can now sign in.";
    } catch (error: any) {
      return rejectWithValue(
        typeof error === "string"
          ? error
          : "Registration failed. Username may already exist."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Clear Redux state
      state.user_name = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      state.message = null;

      // Clear stored tokens
      TokenService.clearTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(
        signInUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.user_name = action.payload;
          state.error = null;
          state.message = null;
        }
      )
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user_name = null;
        state.error = action.payload ?? "Login failed";
        state.message = null;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.isAuthenticated = false;
          state.user_name = null;
          state.error = null;
          state.message = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user_name = null;
        state.error = action.payload ?? "Registration failed";
        state.message = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;