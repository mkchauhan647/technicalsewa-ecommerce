// store/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the Product interface
interface Product {
  image_name: string
  blog_name: string
  market_rate: string
  our_rate: string
}

// Define the ProductState interface
interface ProductState {
  products: Product[]
  title: string
}

const initialState: ProductState = {
  products: [],
  title: "",
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [...action.payload]
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
  },
})

export const { setProducts, setTitle } = productSlice.actions
export default productSlice.reducer
