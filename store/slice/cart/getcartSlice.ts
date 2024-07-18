import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosCorsInstance } from "@/axios_config/Axios";
interface Product {
  model: string
  blog_name: string
  name: string
  image_name: string
  our_rate: number
  tech_rate: number
  market_rate: number
  blog_id: string
  featured: boolean
  page_title: string
}
// Define the CartItem interface
export interface CartItem {
  items: Product[];
  total: number;
  quantity: number;
  image_url: string;
  
}

// Define the CartState interface
interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using the CartState interface
const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

// Helper function to get the customer ID from localStorage
const getCustomerId = () => localStorage.getItem('id') ?? '';

// Define the async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk<CartItem[]>(
  "cart/fetchItems",
  async () => {
    const response = await axios.get(
      "https://www.technicalsewa.com/techsewa/commerce/PublicCart/getCartList",
      {
        params: {
          customer_id: getCustomerId(),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.list; // Ensure the response data has a list property
  }
);

export const addCartItems = createAsyncThunk<void, CartItem>(
  "cart/addItems",
  async (product) => {
    const { items, quantity, image_url, total } = product;

    const payload = {
      customer_id: getCustomerId(),
      items: JSON.stringify(items), // Convert items array to JSON string
      quantity,
      image_url,
      total,
    };

    await AxiosCorsInstance.post(
      "/commerce/PublicCart/createCart",
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
      }
    );
  }
);


export const editCartItems = createAsyncThunk<void, { id: string; product: CartItem }>(
  "cart/editItems",
  async ({ id, product }) => {
    await AxiosCorsInstance.post(
      "/commerce/PublicCart/createCart",
      {
        cart_id: id,
        customer_id: getCustomerId(),
        ...product,
        // Ensure the quantity is updated
        quantity: product.quantity,
      },
    );
  }
);

// Define the async thunk for deleting the entire cart
export const deleteCartItems = createAsyncThunk<void, { id: string }>(
  "cart/deleteItems",
  async ({ id }) => {
    await AxiosCorsInstance.post(
      "/commerce/PublicCart/deleteCarts",
      {
        cart_id: id,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }
);

export const deleteAllCartItems = createAsyncThunk<void, { id: string }>(
  "cart/deleteAllItems",
  async ({ id }) => {
    await AxiosCorsInstance.post(
      "/commerce/PublicCart/deleteCarts",
      {
        cust_id: id,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item =>
        item.items.some(product => product.blog_name === action.payload.items[0].blog_name)
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item =>
        !item.items.some(product => product.blog_name === action.payload)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state: CartState) => {
        state.status = 'loading';
        state.error = null; // Reset error state
      })
      .addCase(fetchCartItems.fulfilled, (state: CartState, action: PayloadAction<CartItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null; // Reset error state
      })
      .addCase(fetchCartItems.rejected, (state: CartState, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch cart items';
      })
      .addCase(deleteCartItems.pending, (state: CartState) => {
        state.status = 'loading';
        state.error = null; // Reset error state
      })
      .addCase(deleteCartItems.fulfilled, (state: CartState) => {
        state.status = 'succeeded';
        state.items = []; // Clear the items array
        state.error = null; // Reset error state
      })
      .addCase(deleteCartItems.rejected, (state: CartState, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to delete cart items';
      });
  },
});

// Export the action creators and the reducer
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
