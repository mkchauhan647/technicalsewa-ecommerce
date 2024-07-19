import AxiosInstance from "@/axios_config/Axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  address: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  photo:string;
      shipping_address1?: string
  shipping_address2?: string
  shipping_address3?: string

}

// Define the UserState interface
interface UserState {
  profile: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using the UserState interface
const initialState: UserState = {
  profile: null,
  status: 'idle',
  error: null,
};

// Helper function to get the customer ID from localStorage
const getCustomerId = () => localStorage.getItem('id') ?? '';

// Define the async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk<User>(
  "user/fetchProfile",
  async () => {
    try {
      const response = await AxiosInstance.post(
        "/getCustomerProfile",
        {
          id: getCustomerId(),
        },
      
      );
      return response.data; // Ensure the response data has the user details
    } catch (error) {
      throw Error("Failed to fetch user profile");
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state: UserState) => {
        state.status = 'loading';
        state.error = null; // Reset error state
      })
      .addCase(fetchUserProfile.fulfilled, (state: UserState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
       state.profile = action.payload;
        state.error = null; // Reset error state
      })
      .addCase(fetchUserProfile.rejected, (state: UserState, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch user profile';
      });
  },
});

// Export the action creators and the reducer
export default userSlice.reducer;
