import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function QuantitySelector() {
  const [qty, setQty] = useState(1)
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-2 h-14">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setQty((q) => Math.max(1, q - 1))}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-6 text-center text-sm font-medium tabular-nums">
        {qty}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setQty((q) => q + 1)}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}