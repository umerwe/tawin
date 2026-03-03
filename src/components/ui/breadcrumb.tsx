"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import React from "react"

type BreadcrumbItem = {
  title: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <nav className="text-sm" aria-label="breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className={isLast ? "text-solid" : ""}>
              {isLast ? (
                <span className="truncate capitalize">{item.title}</span>
              ) : (
                <div className="flex items-center">
                  <Link href={item.href || "#"} className="text-gray-900 truncate hover:underline capitalize">
                    {item?.title}
                  </Link>
                  <ChevronRight className="mx-2 text-foreground w-3 h-3 rtl:rotate-180" />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb