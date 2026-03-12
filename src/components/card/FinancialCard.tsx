"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";

export const FinancialCard = () => {
  return (
    <Card className="border shadow-none h-full">
      <CardContent>
        {/* Header: Title Left, Menu Right */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400 font-medium">Payment Method</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </Button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: Card + Add Button */}
          <div className="flex flex-col gap-4">
            <div className="relative h-40 w-full rounded-2xl overflow-hidden shadow-sm bg-aqua p-5 text-white flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold opacity-90 uppercase tracking-widest">Financial</span>
                <div className="flex -space-x-3 opacity-90">
                  <div className="w-7 h-7 rounded-full bg-white/30 backdrop-blur-sm" />
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm" />
                </div>
              </div>
              
              <div className="text-xl tracking-[0.25em] font-semibold">
                **** **** **** 2345
              </div>
              
              <div className="flex justify-between items-end">
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase opacity-70 leading-none">Card Holder</p>
                  <p className="text-xs font-bold">Noman Manzoor</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-[9px] uppercase opacity-70 leading-none">Expires</p>
                  <p className="text-xs font-bold">02/30</p>
                </div>
              </div>
            </div>

            {/* Aligned Add Button */}
            <Button variant="outline" size="sm" className="w-full gap-2 border-gray-100 bg-white hover:bg-gray-50 text-gray-600 font-semibold h-11 rounded-xl">
               Add New Card <Plus size={18} className="text-aqua" />
            </Button>
          </div>

          {/* RIGHT COLUMN: Info + Deactivate Button */}
          <div className="flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-aqua text-xs font-bold uppercase tracking-wide">Status Active</p>
              <h4 className="text-2xl font-bold text-gray-900 leading-tight">Revenue: 1,250</h4>
              <p className="text-sm font-medium text-gray-400">50,000 Returns</p>
              <button className="text-purple-500 text-sm font-bold hover:underline mt-3 block">
                View Details
              </button>
            </div>
            
            {/* The Deactivate button is now pushed to the bottom to match the Add button level */}
            <div className="mt-4 md:mt-0">
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full md:w-fit px-8 rounded-xl bg-red-50 text-red-500 border-none hover:bg-red-100 h-11 transition-colors"
              >
                Deactivate
              </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};