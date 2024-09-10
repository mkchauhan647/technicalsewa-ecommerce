import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance, { AxiosCorsInstance } from "@/axios_config/Axios";
interface Product {
  model: string
  blog_name: string
  name: string
  image_name: string
  customer_rate: number
  customer_discount_rate: number
  tech_rate: number
  tech_discount_rate: number
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

export interface CartItemLocal{
  items: any;
  total: number;
  quantity: number;
  image_url: string;
  
}

// Define the CartState interface
interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  locallyStored: CartItemLocal[];
}

// Define the initial state using the CartState interface
const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
  locallyStored: [],
};

// Helper function to get the customer ID from localStorage
const getCustomerId = () => localStorage.getItem('id') ?? '';

// Define the async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk<CartItem[]>(
  "cart/fetchItems",
  async (_,{getState}) => {
    if (getCustomerId() === '') {
      const state = getState() as { cart: CartState };
      return state.cart.locallyStored;
    } 
    else {

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
  }
);

export const addCartItems = createAsyncThunk<void, CartItem>(
  "cart/addItems",
  async (product,{getState,dispatch}) => {

    const state = getState() as { cart: CartState };

    if (getCustomerId() === '') {
      // Dispatch an action to update locallyStored in the reducer
      dispatch(cartSlice.actions.addLocalItem(product));
    } else {

      const { items, quantity, image_url, total } = product;
    
      // console.log("addproduct", product);

      const payload = {
        customer_id: getCustomerId(),
        items: JSON.stringify(items), // Convert items array to JSON string
        quantity,
        image_url,
        total,
      };

      // await AxiosCorsInstance.post(
      await axios.post(

        "https://www.technicalsewa.com/techsewa/commerce/PublicCart/createCart",
        // "/commerce/PublicCart/createCart",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }
  }
);


export const editCartItems = createAsyncThunk<void, { id: string; product: CartItem }>(
  "cart/editItems",
  async ({ id, product }, { getState, dispatch }) => {
    const state = getState() as { cart: CartState };

    if (getCustomerId() === '') {
      // Dispatch an action to update locallyStored in the reducer
      dispatch(cartSlice.actions.addLocalItem(product));

    }
    else {
      // await AxiosCorsInstance.post(
      // "/commerce/PublicCart/createCart",
      await axios.post(
        "https://www.technicalsewa.com/techsewa/commerce/PublicCart/createCart",
        {
          cart_id: id,
          customer_id: getCustomerId(),
          ...product,
          // Ensure the quantity is updated
          quantity: product.quantity,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }
  }
);

// Define the async thunk for deleting the entire cart
export const deleteCartItems = createAsyncThunk<void, { id: string ,name:string}>(
  "cart/deleteItems",
  async ({ id ,name}, { getState, dispatch }) => {
    if (getCustomerId() === '') {

      dispatch(cartSlice.actions.removeLocalItem(name));
    }
    else {
      // await AxiosCorsInstance.post(
      // "/commerce/PublicCart/deleteCarts",
      await axios.post(
        "https://www.technicalsewa.com/techsewa/commerce/PublicCart/deleteCarts",
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
  }
);

export const deleteAllCartItems = createAsyncThunk<void, { id: string }>(
  "cart/deleteAllItems",
  async ({ id }, { dispatch }) => {
    if (getCustomerId() === '') {
      dispatch(cartSlice.actions.clearCart());
    }
    else {
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
    addLocalItem: (state, action: PayloadAction<CartItemLocal>) => {
      // state.locallyStored.push(action.payload);
      const existingItem = state.locallyStored.find(item => {
        const itemParse = JSON.parse(item.items);
        return itemParse.some((product: any) => product.blog_name === action.payload.items[0].blog_name)
      }
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        action.payload.items = JSON.stringify(action.payload.items);
        state.locallyStored.push(action.payload);
      }
    },
    removeLocalItem: (state, action: PayloadAction<string>) => {
      state.locallyStored = state.locallyStored.filter(
        
        item => {
          const itemParse = JSON.parse(item.items);
         return !itemParse.some((product: any) => product.blog_name === action.payload)
        }
      );
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
