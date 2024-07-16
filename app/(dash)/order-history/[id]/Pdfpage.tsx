import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

const style = StyleSheet.create({
    page:{
        
    },
    title:{
        fontSize:"30px",
        text:"center",
        color:"blue"
    },
    discount:{
        color:"red"
    },
    flexbetween:{
        display:"flex",
        justifyContent:"space-between"
    },
    container:{
        display:"flex",
        flexDirection:"column",
        width:"100%",
        gap:"10px",
        border:"1px solid gray",
        borderRadius:"4px",
        padding:"2px",
    }

})
const Pdfpage = ({data}:any) => {
  return (
    <Document>
        <Page size="A4" style={style.page}>
            <View style={style.container} >
              <Text style={style.title} >Order Summary</Text>
              <View style={style.flexbetween}>
                <Text>Items</Text>
                <Text>{data?.part_number}</Text>
              </View>
              <View style={style.flexbetween}>
                <Text>Subtotal</Text>
                <Text>Rs.{data?.price}</Text>
              </View>
              <View style={style.flexbetween}>
                <Text style={style.discount}>Discount</Text>
                <Text>Rs.0</Text>
              </View>
              <View style={style.flexbetween}>
                <Text>Shipping Charge</Text>
                <Text>Rs.50</Text>
              </View>
              <hr className="bg-black h-1" />
              <View style={style.flexbetween}>
                <Text>Total Amount</Text>
                <Text>Rs.{Math.round(data?.price)+50}</Text>
              </View>
              
            </View>
        </Page>
    </Document>
  )
}

export default Pdfpage