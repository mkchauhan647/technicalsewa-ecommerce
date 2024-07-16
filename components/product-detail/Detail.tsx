"use client"
import { Button } from "@/components/ui/button"
import { CardDescription, CardContent, Card } from "@/components/ui/card"
import { MdLocationOn } from "react-icons/md"
import React, { useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SingleProduct } from "@/store/slice/singleProduct.slice"
import { RootState, AppDispatch } from "@/store/store"
import {
  addCartItems,
  editCartItems,
  fetchCartItems,
} from "@/store/slice/cart/getcartSlice"
import { useDispatch, useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast"
import { AxiosCorsInstance } from "@/axios_config/Axios"
import { useRouter } from "next/navigation"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import { fetchUserProfile } from "@/store/userSlice"
interface ProductDetails {
  text: string
  value: string
  content: string
}

interface DetailsProps {
  product: SingleProduct
  id: string
}
interface Product {
  model: string
  blog_name: string
  name: string
  image_name: string
  our_rate: number
  market_rate: number
  blog_id: string
  date: string
  latest: boolean
  featured: boolean
  page_title: string
}

interface CartItem {
  items: Product[]
  // subtotal: number
  // tax: number
  quantity: number
  image_url: string
  // discount: number
  total: number
}

interface ParsedCartItem {
  item: CartItem
  itemsData: Product[]
}

const Detail: React.FC<DetailsProps> = ({ product, id }) => {
  const apiResponse = {
    product_id: "86",
    customer_id: "3333",
    products: "product",
    status: "1",
    shipping_address: "1123",
    payment_method: "1111",
    value: [
      {
        value: "389",
        text: "Air conditioner",
        content:
          '<p class="MsoNormal"><strong><span style="font-size: 20pt; line-height: 107%; font-family: \'Segoe UI\',sans-serif;">Trustworthy IFB Air conditioner Repair and Maintenance</span></strong></p>\n<p class="MsoNormal">With 23 years of unwavering dedication, Technical Sewa is your go-to destination for top-notch repair and maintenance services. Our highly experienced technical team, spread across the entire nation, ensures timely home services and support for your IFB air conditioner, at your doorstep. <strong><span style="font-size: 16pt; line-height: 107%; font-family: \'Segoe UI\',sans-serif;">Why Choose Technical Sewa for Your IFB Air conditioner Repair Service Shop in Nepal?</span></strong><span style="font-size: 13.5pt; line-height: 107%; font-family: \'Segoe UI\',sans-serif;"> Rich Experience:</span></p>\n<p class="MsoNormal"><span style="font-size: 13.5pt; line-height: 107%; font-family: \'Segoe UI\',sans-serif;">Benefit from our extensive legacy, accuracy, and widespread presence across Nepal.</span></p>\n',
      },
    ],
  }

  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const userProfile = useSelector((state: RootState) => state.user.profile)
  const parsedCartItems: ParsedCartItem[] = cartItems.map((item: any) => {
    const itemsData = JSON.parse(item.items)
    return { item, itemsData }
  })

  useEffect(() => {
    dispatch(fetchCartItems())
    dispatch(fetchUserProfile())
  }, [dispatch])

  let router = useRouter()
  const addToCart = (product: Product) => {
    const ifloggedIn = localStorage.getItem("id")

    if (ifloggedIn === null) {
      router.push("/login")
      return
    }
    const itemExists = cartItems.some((item: any) => {
      const parsedItems = JSON.parse(item.items)
      return parsedItems.some(
        (parsedItem: Product) => parsedItem.blog_name === product.blog_name,
      )
    })

    if (itemExists) {
      const prevCartItem: any = parsedCartItems.filter((parsedItem) =>
        parsedItem.itemsData.some(
          (cartProduct) => cartProduct.blog_name === product.blog_name,
        ),
      )

      const updatedQuantity = Number(prevCartItem[0].item.quantity) // Ensure it's parsed as a number
      const updatedItem = {
        ...prevCartItem[0].item,
        quantity: updatedQuantity + quantity,
        itemsData: JSON.stringify(prevCartItem[0].itemsData), // Ensure itemsData is stringified
      }
      dispatch(
        editCartItems({ id: prevCartItem[0].item.id, product: updatedItem }),
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Added to Cart")
          dispatch(fetchCartItems())
        } else {
          toast.error("Error adding to Cart")
        }
      })

      return
    }

    const newItem: CartItem = {
      items: [product],
      // subtotal: product.subtotal,
      // tax: product.tax,
      // discount: product.discount,
      // total: product.total,
      // subtotal: 0,
      // tax: 0,
      // discount: 0,
      total: product.our_rate,
      quantity: quantity,
      image_url: product.image_name,
    }

    dispatch(addCartItems(newItem)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Item Added To Cart")
        dispatch(fetchCartItems())
      } else {
        toast.error("Error Added To Cart")
      }
    })
  }
  useEffect(() => {
    const { value } = apiResponse
    if (value && value.length > 0) {
      const { text, value: price, content: description } = value[0]
      setProductDetails({ text, value: price, content: description })
    }
  }, [])

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (mainImageRef.current) {
      const { left, top, width, height } =
        mainImageRef.current.getBoundingClientRect()
      const x = ((e.pageX - left) / width) * 100
      const y = ((e.pageY - top) / height) * 100
      setZoomStyles({
        backgroundImage: `url(${mainImage})`,
        backgroundPosition: `${x}% ${y}%`,
        backgroundSize: `${width * 3}px ${height * 3}px`,
        display: "block",
      })
    }
  }
  const img = product?.image_name

  const [zoomVisible, setZoomVisible] = useState(false)
  const [mainImage, setMainImage] = useState<string | undefined>()
  // product?.image_name,
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [zoomStyles, setZoomStyles] = useState({})
  const mainImageRef = useRef<HTMLImageElement>(null)
  const [quantity, setQuantity] = useState(1)
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    text: "",
    value: "",
    content: "",
  })

  // For handeling callback form
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    query: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    query: "",
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })

    // Inline validation for mobile
    if (id === "mobile") {
      if (!/^\d{10}$/.test(value)) {
        setErrors({ ...errors, mobile: "Mobile number must be 10 digits." })
      } else {
        setErrors({ ...errors, mobile: "" })
      }
    }
  }

  const buyNow = () => {
    const ifloggedIn = localStorage.getItem("id")

    if (ifloggedIn === null) {
      router.push("/login")
      return
    }
    router.push(`/checkout/id=${id}${quantity > 1 ? "/qty=" + quantity : ""}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      cust_name: formData.name,
      cust_mobile: formData.mobile,
      cust_email: formData.email,
      cust_query: formData.query,
    })
    try {
      const response = await AxiosCorsInstance.post(
        "publiccontrol/publicreview/getcallbackrequest",
        {
          cust_name: formData.name,
          cust_mobile: formData.mobile,
          cust_email: formData.email,
          cust_query: formData.query,
        },
      )
      console.log(response)

      if (response.status === 200) {
        toast.success("Our sales team will contact you soon!")
        window.location.reload()
      }
    } catch (error) {
      toast.error("Failed to submit callback request")
    }
  }

  useEffect(() => {
    if (product?.image_name) {
      const fetchThumbnail = async () => {
        try {
          const response = await AxiosCorsInstance.post(
            `/publicControl/publicCommerce/getimageByitem`,
            { item_name: product.blog_name },
          )
          const images: any = response.data?.list
          if (images?.length > 1) {
            const imageUrls = images.map((item: any) => item.image_url)
            setThumbnails([product.image_name, ...imageUrls])
          } else {
            setThumbnails([product.image_name])
          }
        } catch (error) {
          console.error("Error fetching Thumbnail:", error)
        }
      }
      fetchThumbnail()
      setMainImage(product.image_name)
    }
  }, [product])

  const thumbnailRef: any = useRef(null)

  const swipeThumbnail = (side: string) => {
    if (side === "left") {
      thumbnailRef.current.scrollBy({ left: -200, behavior: "smooth" })
    } else {
      thumbnailRef?.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="container mt-5 md:mt-10 items-start ">
      <div className=" lg:flex gap-6">
        <div className="basis-[70%] ">
          <div className=" sm:flex gap-8 sm:gap-4">
            <div className="flex flex-col relative basis-[40%] w-full ">
              <div className="relative h-[350px]">
                <img
                  alt="Main Image"
                  className="rounded-lg cursor-zoom-in h-full w-full cover"
                  src={mainImage}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setZoomVisible(true)}
                  onMouseLeave={() => setZoomVisible(false)}
                  ref={mainImageRef}
                />
                <div className="hidden md:block">
                  {zoomVisible && (
                    <div
                      className={`zoomed-image rounded-lg shadow-xl`}
                      style={{
                        ...zoomStyles,
                        position: "absolute",
                        top: "0",
                        left: "100%",
                        width: "500px",
                        height: "400px",
                        backgroundRepeat: "no-repeat",
                        border: "1px solid #ccc",
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="flex w-full px-6 overflow-hidden justify-center my-4 relative">
                <BiLeftArrow
                  onClick={(e) => swipeThumbnail("left")}
                  size={25}
                  className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
                />
                <div
                  className="flex justify-center w-full overflow-x-scroll gap-2 thumbnail"
                  ref={thumbnailRef}
                >
                  {thumbnails.map((thumbnail, index) => (
                    <img
                      key={index}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-[70px] h-[60px] rounded-lg ${
                        mainImage === thumbnail ? "border border-cyan-400" : ""
                      }`}
                      src={thumbnail}
                      style={{
                        aspectRatio: "70/50",
                        objectFit: "cover",
                      }}
                      onClick={() => setMainImage(thumbnail)}
                    />
                  ))}
                </div>
                <BiRightArrow
                  onClick={(e) => swipeThumbnail("right")}
                  size={25}
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              </div>
              <div className="flex justify-between items-center mt-4 gap-2 w-full">
                <Button
                  className="bg-cyan-400 text-white hover:bg-cyan-500  w-1/2 transition-all duration-300"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                  <span className="ml-2 text-lg"></span>
                </Button>
                <div onClick={buyNow} className="w-1/2">
                  <Button className="bg-transparent text-black/60  hover:bg-gray-100 border border-black/40 w-full transition-all duration-300 ">
                    Buy Now
                    <span className="ml-2 text-lg"></span>
                  </Button>
                </div>
              </div>
            </div>
            {/* Product title and description */}
            <div className="mt-8 basis-[60%]">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {product?.blog_name}
                <span className="text-xs font-normal whitespace-nowrap">
                  (4 in stock)
                </span>
              </h1>
              <div className="flex items-center mb-3">
                <div className="flex gap-4 items-center">
                  <div className="text-2xl font-bold  ">
                    {product?.meta_desc}
                  </div>
                </div>
              </div>
              <div className="py-5 border-t ">
                <h2 className="font-semibold mb-2">Description</h2>
                {product?.meta_desc && product.blog_desc && (
                  <>
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.blog_desc }}
                    />
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.features }}
                    />
                  </>
                )}
              </div>
              <div className="py-5 border-t ">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col gap-2 md:flex-row items-center lg:gap-12">
                    <span className="text-sm">Quantity</span>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" onClick={decreaseQuantity}>
                        -
                      </Button>
                      <span>{quantity}</span>
                      <Button variant="outline" onClick={increaseQuantity}>
                        +
                      </Button>
                    </div>
                    <div className="flex items-center gap-7 justify-between">
                      <span className="text-[16px]  text-[gray] font-semibold  line-through  block">
                        Rs. {product?.market_rate * quantity}
                      </span>
                      <span className="text-[20px]  text-[black] font-semibold block">
                        Rs. {product?.our_rate * quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product details and specifications */}
        </div>

        <div className="basis-[30%] grid sm:flex lg:flex-col gap-4 items-start">
          {/* Delivery and location */}
          <Card className="w-full bg-white p-4 basis-1/2">
            <div className="flex items-center gap-2">
              <TruckIcon className="h-5 w-5 text-gray-600" />{" "}
              <span className="font-semibold text-sm">Delivery</span>
            </div>

            <div className="flex items-center gap-2 mt-4 mb-2 justify-between">
              <div className="flex items-center gap-2">
                <MdLocationOn className="h-5 w-5 text-gray-600" />{" "}
                <span className="font-semibold text-sm">Location</span>
              </div>
              <div className="text-sm  ml-2">Change</div>
            </div>
            <CardDescription className="text-sm">
              {userProfile?.shipping_address1}{" "}
            </CardDescription>
            <CardContent>
              <div className="mt-4">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">
                      Free Delivery 10 Jan - 11 Jan
                    </span>
                    <span className="text-sm text-gray-500">1 - 2 day(s)</span>
                  </div>
                  <span className="font-semibold text-green-600  text-sm ml-2">
                    Free
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm ">
                      Fastest Delivery
                    </span>
                    <span className="text-sm text-gray-500">Tomorrow</span>
                  </div>
                  <span className="text-sm  ml-2 whitespace-nowrap">Rs. 0</span>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-sm">Cash on Delivery Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Callback form */}
          <div className="p-4 border rounded-lg basis-1/2">
            <div className="space-y-2">
              <h2 className="font-bold">Request a Callback</h2>
              <p className="text-gray-500 text-xs dark:text-gray-400">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    type="text"
                    id="mobile"
                    required
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={handleChange} // Validation on blur
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm">{errors.mobile}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="query">Query Details</Label>
                  <Textarea
                    className="min-h-[100px]"
                    required
                    id="query"
                    placeholder="Enter your query details"
                    value={formData.query}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}

export default Detail
