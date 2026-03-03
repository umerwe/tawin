import { Button } from '@/components/ui/button'
import { Info, X } from 'lucide-react'

const AlertBanner = () => {
  return (
     <div className="bg-[#fff5f5] border border-[#ffe3e3] p-3 mb-6 flex items-center justify-between rounded-md">
        <div className="flex items-center gap-3">
          <div className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </div>
          <p className="text-sm text-gray-700">
            Your product <span className="text-red font-semibold underline decoration-red/30">Wooden Door 12</span> is almost out of stock. Only 5 pieces left.
            <Button variant="link" className="text-red font-semibold p-0 h-auto ml-1 hover:no-underline">
              Add to stock
            </Button>
          </p>
        </div>
        <Info className="text-red h-5 w-5" />
      </div>
  )
}

export default AlertBanner