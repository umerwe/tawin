import Link from 'next/link'
import Image from '../MyImage'
import { useLocale } from 'next-intl';

const CategoryCard = ({ data }: { data: Category }) => {
    const locale = useLocale() as "en" | "ar";

    return (
        <Link
            href={`/shop?category=${data._id}`}
            className="group flex flex-col items-center text-center"
        >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-[#F3F5F7] border-2 border-transparent group-hover:border-aqua transition-all duration-300 shadow-sm">
                <Image
                    src={data.image}
                    alt={data.name[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* data Label */}
            <span className="mt-4 text-[13px] md:text-sm font-semibold text-gray-600 group-hover:text-aqua transition-colors line-clamp-2 px-2">
                {data.name[locale]}
            </span>
        </Link>
    )
}

export default CategoryCard