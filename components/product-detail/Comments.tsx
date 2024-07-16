import React from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineLike } from "react-icons/ai"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Comment = ({
  username,
  avatarSrc,
  avatarAlt,
  timestamp,
  text,
  replies,
}: any) => {
  // Error handling: Check if any required props are missing
  if (!username || !avatarSrc || !timestamp || !text) {
    return <div>Error: Missing required props for Comment component.</div>
  }

  // Optional: Provide default values for missing props
  avatarAlt = avatarAlt || "User Avatar"
  replies = replies || []

  return (
    <div className="py-4 border-b border-gray-300 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          className="aspect-square object-cover "
          width={20}
          height={20}
        ></Image>
        {/* <Avatar>
          {avatarSrc && avatarSrc ? (
            <AvatarImage src={`${avatarSrc}`} alt={avatarAlt} />
          ) : (
            <AvatarFallback>{avatarAlt}</AvatarFallback>
          )}
        </Avatar> */}
        <h3 className="text-sm sm:text-base font-semibold">{username}</h3>
        <span className="text-[8px] sm:text-sm text-gray-500 ml-4">
          {timestamp}
        </span>
      </div>
      <div className="pl-12">
        <p className="mt-1 text-sm">{text}</p>
        <div className="flex gap-3 items-center">
          <AiOutlineLike className="text-gray-500 text-lg" />
          <Button className="text-sm" variant="ghost">
            Reply <span className="ml-1"></span>
          </Button>
        </div>
        {/* Error handling: Check if replies is an array */}
        {Array.isArray(replies) && replies.length > 0 && (
          <React.Fragment>
            {replies.map((reply: any, index: number) =>
              // Error handling: Check if reply is an object
              typeof reply === "object" ? (
                <Comment key={index} {...reply} />
              ) : (
                // Optional: Provide a fallback if reply is not an object
                <div key={index}>Invalid reply data</div>
              ),
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default Comment
