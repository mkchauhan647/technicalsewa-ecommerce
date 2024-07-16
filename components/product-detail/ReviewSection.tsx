"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaRegCommentDots } from "react-icons/fa"
import Comment from "./Comments"

interface CommentData {
  username: string
  avatarSrc: string
  avatarAlt: string
  timestamp: string
  text: string
  replies?: CommentData[]
}

interface ReviewSectionProps {
  productId: string
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [commentsData, setCommentsData] = useState<CommentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://www.technicalsewa.com/techsewa/publiccontrol/publicreview/getPreviewByCustomer?product_id=${productId}`,
        )
        setCommentsData(response.data)
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    }
    fetchComments()
  }, [productId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>
  }

  return (
    <div className="container mx-auto items-start w-full mb-5 md:mb-10">
      <div className="w-full">
        <div className="font-medium py-4 md:pl-4 border-b border-black/20 flex items-center gap-2">
          <div className="mt-4 sm:mt-0">Reviews</div>
          <FaRegCommentDots />
        </div>
        {/* Comments */}
        {commentsData?.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    </div>
  )
}

export default ReviewSection
