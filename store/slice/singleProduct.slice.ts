import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getSingleProduct } from '../action/singleProduct.action'
export interface SingleProduct {
    STATUS: string
    blog_desc: string
    blog_name: string
    contact_info: string
    features: string
    blog_id: string
    image_name: string
    market_rate: number
    meta_desc: string
    our_rate: number
    page_title: string
    page_url: string
    svc_rate: string
    tech_rate: number
    model:string
    name:string
    date:string
    latest:boolean
      featured: boolean
      available_stock:number

}

export interface SingleProductInterface {
    data: SingleProduct | null
    isLoading: boolean
    isError: boolean
}

const initialState: SingleProductInterface = {
    data: null,
    isLoading: false,
    isError: false
}
const singleProduct = createSlice({
    name: "@singleProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSingleProduct.pending, (state: SingleProductInterface) => {
            state.isLoading = true
        }).addCase(getSingleProduct.fulfilled, (state: SingleProductInterface, action: PayloadAction<SingleProduct>) => {
            state.data = action.payload
        }).addCase(getSingleProduct.rejected, (state: SingleProductInterface) => {
            state.isError = true
        })
    }
});
export const singleItemData = (state: RootState) => state.single
export default singleProduct.reducer