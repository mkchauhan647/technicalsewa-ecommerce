import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit"
import { GrandChild } from "./grandChild.slice"
import { RootState } from "../store"

export interface Sub2 {
  cost: string
  text: string
  value: string
  Gradn: GrandChild[] | null
  id: string
}
// sub category 2
// api -> https://www.technicalsewa.com/techsewa/publicControl/getServicesByProductCategory
// brand_id: 78
// brand_id: sub cat 1.value
interface FirstChildProps {
  brand_id: string //-- universal
  brand_id2: string // parent
}

interface InitialSub2Data {
  data: Sub2[] | null
  isLoading: boolean
  isError: boolean
}
export const subCategoty2 = createAsyncThunk(
  "secondSecond",
  async (Props: FirstChildProps) => {
    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publicControl/getServicesByProductCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `brand_id=${Props.brand_id}&&brand_id=${Props.brand_id2}`,
      },
    )
    const data: Sub2[] = await response.json()
    const newD = data.map((current) => {
      return {
        ...current,
        id: Props.brand_id2,
        Gradn: [],
      }
    })
    return newD
  },
)

const initialState: InitialSub2Data = {
  data: null,
  isLoading: false,
  isError: false,
}

const subCategorySecondSlice = createSlice({
  name: "@subCategorySecondSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subCategoty2.pending, (state: InitialSub2Data) => {
        state.isLoading = true
      })
      .addCase(
        subCategoty2.fulfilled,
        (state: InitialSub2Data, actions: PayloadAction<Sub2[]>) => {
          state.data = [...actions.payload]
          state.isLoading = false
        },
      )
      .addCase(subCategoty2.rejected, (state: InitialSub2Data) => {
        state.isError = true
      })
  },
})

export const {} = subCategorySecondSlice.actions
export const thirdCat = (state: RootState) => state.thirdCat
export default subCategorySecondSlice.reducer
