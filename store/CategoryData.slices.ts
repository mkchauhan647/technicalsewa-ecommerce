import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
interface SubCategoryData {
  alt: null | string
  btitle: null | string
  cannonical: null
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
}

interface SubCategoryDataInterface {
  data: SubCategoryData[]
  isLoading: boolean
  isError: boolean
  id: string
  title: string
}

interface ThunkArgs {
  brandId: string
  value: string
  id: string
  category: string
}

// child category ko ma
//api getPartsPartPurja --> model = sub category.value
export const getDataBySubCategory = createAsyncThunk(
  "/productsBySubCategory",
  async (Args: ThunkArgs) => {
    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publicControl/GetProductcategiryByProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // brandid main and
        // sub also same barnd id and subcategory id
        body: `brand_id=${Args.brandId}&product_id=${Args.value}`,
      },
    )
    const data = await response.json()
    return { data, id: Args.id, category: Args.category }
  },
)

interface Re {
  data: SubCategoryData[]
  id: string
  category: string
}
const initialState: SubCategoryDataInterface = {
  data: [],
  title: "",
  isLoading: false,
  isError: false,
  id: "",
}
const categoryDataSlice = createSlice({
  name: "@subCategoryData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getDataBySubCategory.pending,
        (state: SubCategoryDataInterface) => {
          state.isLoading = true
        },
      )
      .addCase(
        getDataBySubCategory.fulfilled,
        (state: SubCategoryDataInterface, action: PayloadAction<Re>) => {
          state.data = [...action.payload.data]
          state.id = action.payload.id
          state.title = action.payload.category
          state.isLoading = false
        },
      )
      .addCase(
        getDataBySubCategory.rejected,
        (state: SubCategoryDataInterface) => {
          state.isError = true
        },
      )
  },
})
export const {} = categoryDataSlice.actions
export const subData = (state: RootState) => state.categoryData
export default categoryDataSlice.reducer
