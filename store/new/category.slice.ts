import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FirstChild } from "./subCategory1.slice"
import { RootState } from "../store"


export interface Top {
  text: string
  value: string
  sub1: FirstChild[] | null
  id: string
}
interface InitialCategoryInterface {
  category: Top[] | null
  isLoading: boolean
  isError: boolean
}
//  main category
// api -> https://www.technicalsewa.com/techsewa/publiccontrol/getProductByServiceCategory
// brand_id: 78

export const getCategory = createAsyncThunk(
  "category/getProductByServiceCategory",
  async ({ brandId }: { brandId: string }) => {
    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publiccontrol/getProductByServiceCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // brandid main and
        // sub also same barnd id and subcategory id
        body: `brand_id=${brandId}`,
      },
    )
    const data: Top[] = await response.json()
    const datas = data.map((current) => {
      return {
        text: current.text,
        value: current.value,
        sub1: [],
        id: brandId,
      }
    })
    return datas
  },
)
const initialState: InitialCategoryInterface = {
  category: null,
  isLoading: false,
  isError: false,
}
const categorySlice = createSlice({
  name: "@category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state: InitialCategoryInterface) => {
        state.isLoading = true
      })
      .addCase(
        getCategory.fulfilled,
        (state: InitialCategoryInterface, actions: PayloadAction<Top[]>) => {
          state.category = actions.payload
          state.isLoading = false
        },
      )
      .addCase(getCategory.rejected, (state: InitialCategoryInterface) => {
        state.isError = true
      })
  },
})
export const {} = categorySlice.actions
export const nCategoryData = (state: RootState) => state.ncategory
export default categorySlice.reducer
