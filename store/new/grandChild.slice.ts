import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface GrandChild {
  STATUS: string
  blog_desc: string
  blog_name: string
  contact_info: string
  features: string
  image_name: null | string
  market_rate: string
  meta_desc: string
  our_rate: string
  page_title: string
  page_url: string
  blog_id: string
  svc_rate: string
  tech_rate: string
  id: string
  topTitle: string
}

interface GrandChildDataInterface {
  data: GrandChild[] | null
  isLoading: boolean
  isError: boolean
  title: string
}

export const getGrandChild = createAsyncThunk(
  "grandChild",
  async ({ model, id, title }: { model: string; id: string; title: string }) => {
    try {
      const response = await fetch(
        "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `model=${model}`,
        },
      )
      const data: GrandChild[] = await response.json()
      return { data, id, topTitle: title }
    } catch (error) {
      throw new Error("Failed to fetch grandChild data")
    }
  },
)

const initialState: GrandChildDataInterface = {
  data: null,
  isLoading: false,
  isError: false,
  title: ""
}

const grandChildSlice = createSlice({
  name: "@grandChildSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGrandChild.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getGrandChild.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.title = action.payload.topTitle
        state.isLoading = false
        state.isError = false
      })
      .addCase(getGrandChild.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { } = grandChildSlice.actions
export const grandChildData = (state: RootState) => state.grandChild
export default grandChildSlice.reducer
