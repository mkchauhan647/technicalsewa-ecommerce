import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import categoryDataSlice from "./CategoryData.slices"
import categorySlice from "./new/category.slice"
import grandChildSlice from "./new/grandChild.slice"
import showGrandSlice from "./new/showGr.slice"
import subCategorySecondSlice from "./new/subCate2.slice"
import subCategoryFirstSlice from "./new/subCategory1.slice"
import productReducer from "./productSlice"
import cartReducer from './slice/cart/getcartSlice'
import singleProduct from './slice/singleProduct.slice'
import userSlice from "./userSlice"
const store = configureStore({
  reducer: {
    products: productReducer,
    categoryData: categoryDataSlice,
    ncategory: categorySlice,
    secondCate: subCategoryFirstSlice,
    thirdCat: subCategorySecondSlice,
    grandChild: grandChildSlice,
    grandShow: showGrandSlice,
    single: singleProduct,
    cart:cartReducer,
    user:userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
