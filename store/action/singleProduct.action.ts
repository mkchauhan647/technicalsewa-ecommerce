import { createAsyncThunk } from "@reduxjs/toolkit"
import { SingleProduct } from "../slice/singleProduct.slice"

export const getSingleProduct = createAsyncThunk("/singleDetails", async (id: string) => {
    console.log("this id ", id);
    const response = await fetch(
        "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurjaNumber",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `part_number=${id}`,
            
        },
    )
    const data: SingleProduct[] = await response.json()
    return data[0]
})