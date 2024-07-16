/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2aU172Zo4dX
 */
"use client"
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Filter() {
  return (
    <div className="  bg-white p-4 ">
      <div className="flex justify-between items-center mb-4 ">
        <Select>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price_low_to_high">
              Price: Low to High
            </SelectItem>
            <SelectItem value="price_high_to_low">
              Price: High to Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label>Price Range</Label>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Input placeholder="Min" />
          </div>
          <span>To</span>
          <div className="flex items-center">
            <Input placeholder="Max" />
          </div>
        </div>
      </div>

      <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Filter</Button>
    </div>
  )
}
