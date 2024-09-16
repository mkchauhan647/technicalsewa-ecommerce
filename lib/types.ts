
export interface Product {
    model: string
    blog_name: string
    name: string
    image_name: string
    customer_rate: number
    customer_discount_rate: number
    tech_rate: number
    tech_discount_rate: number
    // market_rate: number
    blog_id: string
    date?: string
    latest?: boolean
    featured: boolean
    page_title: string
  is_hot?: string
  is_deal?: string
  end_dt?: string
  end_tm?: string
  start_dt?: string
  start_tm?: string
  page_url: string
  specification?: string
  }
  
  export interface CartItem {
    items: Product[]
    quantity: number
    image_url: string
    total: number
  }
  
  export interface ParsedCartItem {
    item: CartItem
    itemsData: Product[]
  }
  
  export interface CustomerData {
    name: string
    type: string
    // Add other properties as needed
}
  
export interface GrandChild {
  model: string
  blog_name: string
  name: string
  image_name: string
  // our_rate: number
  customer_rate: number 
  customer_discount_rate: number 
  tech_rate: number 
  tech_discount_rate: number 
  // market_rate: number
  blog_id: string
  featured: boolean
  page_title: string
  // tech_rate: number 
  page_url: string
}
