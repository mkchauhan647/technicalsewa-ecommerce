import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface InitialShowGrand {
  shown: boolean
}
const initialState: InitialShowGrand = {
  shown: false,
}
const showGrandSlice = createSlice({
  name: "@showGrandValue",
  initialState,
  reducers: {
    showGrand(state: InitialShowGrand) {
      state.shown = true
    },
    hideGrand(state: InitialShowGrand) {
      state.shown = false
    },
  },
})
export const { showGrand, hideGrand } = showGrandSlice.actions
export const isGrandShow = (state: RootState) => state.grandShow
export default showGrandSlice.reducer
