import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Sub2 } from "./subCate2.slice"
import { RootState } from "../store"
export interface FirstChild {
  alt: null | string
  btitle: null | string
  cannonical: null | string
  content: string
  description: string
  file_name: null | string
  image_url: null | string
  json_ld: null | string
  meta_desc: null | string
  model: string
  og_desc: null | string
  og_site_name: null | string
  og_title: null | string
  og_type: null | string
  og_url: null | string
  text: string
  title: string
  value: string
  SubSecond: Sub2[] | null
  id: string
}
export interface FirstChildDataInt {
  firstData: FirstChild[] | null
}
export interface InitialSubCategory1Interface {
  data: FirstChild[] | null
  isLoading: boolean
  isError: boolean
}
// sub category 1
//api -> https://www.technicalsewa.com/techsewa/publicControl/GetProductcategiryByProduct
//brand_id: 78 ( universal)
// product_id: 154 ( category.value)

interface FirstChildProps {
  brand_id: string //-- universal
  product_id: string // parent
}

export const getFirstChild = createAsyncThunk(
  "/firstChildCategory",
  async (Props: FirstChildProps) => {
    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publicControl/GetProductcategiryByProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // brandid main and
        // sub also same barnd id and subcategory id
        body: `brand_id=${Props.brand_id}&&product_id=${Props.product_id}`,
      },
    )
    const data: FirstChild[] = await response.json()
    const datas = data.map((current) => {
      return {
        ...current,
        SubSecond: [],
        id: Props.product_id,
      }
    })
    return datas
  },
)
const initialState: InitialSubCategory1Interface = {
  data: null,
  isLoading: false,
  isError: false,
}
const subCategoryFirstSlice = createSlice({
  name: "@subCategory1",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFirstChild.pending, (state: InitialSubCategory1Interface) => {
        state.isLoading = true
      })
      .addCase(
        getFirstChild.fulfilled,
        (
          state: InitialSubCategory1Interface,
          actions: PayloadAction<FirstChild[]>,
        ) => {
          state.data = actions.payload
          state.isLoading = false
        },
      )
      .addCase(
        getFirstChild.rejected,
        (state: InitialSubCategory1Interface) => {
          state.isError = true
        },
      )
  },
})
export const {} = subCategoryFirstSlice.actions
export const secondCatData = (state: RootState) => state.secondCate
export default subCategoryFirstSlice.reducer
