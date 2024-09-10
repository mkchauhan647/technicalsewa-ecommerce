import React, { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import PopupMessage from "./PopupMessage"


interface ShippingDetails {
  name: string
  mobile: string
  email: string
  address: string
}


const ShippingDetailsForm = ({ setFormData }: any) => {
  const [error, setError] = useState(true)
  const [add, setAdd] = useState("")
  const checkRef = useRef<HTMLInputElement>(null);
  const [userInputDetails, setUserInputDetails] = useState<ShippingDetails>({
    name: "",
    mobile: "",
    email: "",
    address:""
  })
  const [previousDetails, setPreviousDetails] = useState<ShippingDetails>({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });
  const detailsRef = useRef({
    address: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
  });
  // Function to update specific fields in the state
  const updateField = (field: string, value: any) => {
    // console.log("I am running")
    // setUserInputDetails((prevState) => ({
    //   ...prevState,
    //   [field]: value.value,
    // }))
    setFormData((prevState: object) => ({
      ...prevState,
      [field]: value.value,
    }))
    if (field === "phone") {
      setError(value.validity.valid)
    }
  }
  useEffect(() => {
    const storedAddress = localStorage.getItem("address")
    if (storedAddress) {
      setAdd(storedAddress)
      setFormData((prevState: object) => ({
        ...prevState,
        address: storedAddress,
      }))
    }
  }, [setFormData])


  useEffect(() => {
    const storedData = localStorage.getItem("data") ?? "{}"
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        // setFormData(parsedData)
        // console.log("parsedData", parsedData);
        const { name, mobile, email, address } = parsedData;
        setPreviousDetails({ name, mobile, email, address });


      } catch (error) {
        console.error("Failed to parse stored data", error)
      }
    }
  }, [])
  

  


  function usePreviousShippingDetails() {
    // throw new Error("Function not implemented.")
    // setFormData(previousDetails);

    if (checkRef.current?.checked) {
      // console.log("previousDetails", previousDetails);
      setFormData((prevState: any) => ({
        ...prevState,
        name: previousDetails.name,
        phone: previousDetails.mobile,
        email: previousDetails.email,
        address: previousDetails.address,
      }))
      detailsRef.current.name.current!.value = previousDetails.name;
      detailsRef.current.phone.current!.value = previousDetails.mobile;
      detailsRef.current.email.current!.value = previousDetails.email;
      detailsRef.current.address.current!.value = previousDetails.address;
    } else {
      // setFormData({});
      setFormData((prevState: any) => ({
        ...prevState,
        name: userInputDetails.name,
        phone: userInputDetails.mobile,
        email: userInputDetails.email,
        address: userInputDetails.address,
      }))
      detailsRef.current.name.current!.value = userInputDetails.name;
      detailsRef.current.phone.current!.value = userInputDetails.mobile;
      detailsRef.current.email.current!.value = userInputDetails.email;
      detailsRef.current.address.current!.value = userInputDetails.address;
    }

    // console.log("previousDetails", previousDetails);


  }

  useEffect(() => {

    usePreviousShippingDetails();
    
  }, [previousDetails]);

  return (
    <div className="w-full flex flex-col gap-4 whitespace-nowrap">
      <PopupMessage />
      <h1 className="font-semibold">Shipping Details</h1>
      <div className="flex gap-4">
      <span className=" font-normal ">Use Previous Shipping Details:</span>
      <input
          type="checkbox"
          defaultChecked
        className="transform scale-[1.4] bg-cyan-500 text-white rounded  cursor-pointer"
          // onClick={() => usePreviousShippingDetails()}
          onChange={(e: any) => usePreviousShippingDetails()}
          ref={checkRef}
          
        />
      </div>
      <span className="text-red-500">Required field *</span>
     
      <div className="flex md:flex-row flex-col w-full gap-5 ">
        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Full Name: <span className="text-red-500 text-xl">*</span>
          </label>
          <Input type="text" onChange={(e) => updateField("name", e.target)} ref={detailsRef.current.name} />
        </div>
        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Phone: <span className="text-red-500 text-xl">*</span>
          </label>
          <Input
            className={`${!error && "bg-red-400"}`}
            type="text"
            minLength={10}
            onChange={(e) => updateField("phone", e.target)}
            ref={detailsRef.current.phone}
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full gap-5 ">
        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Email: <span className="text-red-500 text-xl">*</span>{" "}
          </label>
          <Input
            type="email"
            onChange={(e) => updateField("email", e.target)}
            ref={detailsRef.current.email}
          />
        </div>

        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Delivery Area: <span className="text-red-500 text-xl">*</span>
          </label>
          <Input
            type="text"
            // value={add}
            ref={detailsRef.current.address}
            onChange={(e) => {
              const value = e.target.value
              // setAdd(value)
              updateField("address", value)
            }}
          />
        </div>
      </div>

      <hr />

      <div className="text-lg text-gray-600 border-b-2 w-fit">
        Payment Method:{" "}
      </div>

      <button className="h-20 w-fit flex items-center bg-cyan-500 rounded px-2 text-white">
        <FaMoneyBillTransfer size={40} />
        Cash on Delivery
      </button>
    </div>
  )
}

export default ShippingDetailsForm
