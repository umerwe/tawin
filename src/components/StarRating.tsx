import { Star } from "lucide-react"

export default function StarRating() {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => {
                return (
                    <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-foreground text-foreground"
                    />
                )
            })}
        </div>
    )
}