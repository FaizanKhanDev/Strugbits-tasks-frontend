"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

import { selectMealsList } from "@/lib/features/meals/mealsSlice"
import { useAppSelector } from "@/lib/hooks"


interface MealTabsProps {
    setActiveTab: (tab: string) => void,
    activeTab: string
}

export default function MealTabs({ activeTab, setActiveTab }: MealTabsProps) {
    const mealTabs = useAppSelector(selectMealsList)


    return (
        <div className="w-full border-b border-gray-200">
            <nav className="flex space-x-8" role="tablist" aria-label="Meal planning periods">
                {mealTabs.map((item: any, index: number) => (
                    <button
                        key={index}
                        role="tab"
                        aria-selected={activeTab === item.tab}
                        aria-controls={`${item.tab}-panel`}
                        id={`${item.id}-tab`}
                        className={cn(
                            "relative py-4 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ",
                            activeTab === item.tab
                                ? "text-[#00436C] before:absolute before:bottom-0 before:left-1/4 before:right-1/4 before:h-1 before:bg-[#00436C]"
                                : "text-gray-500 hover:text-gray-700",
                        )}
                        onClick={() => setActiveTab(item.tab)}
                    >
                        {item.tab}
                    </button>
                ))}
            </nav>
        </div>
    )
}
