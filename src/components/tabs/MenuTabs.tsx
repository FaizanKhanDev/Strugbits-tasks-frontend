"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
    id: string
    label: string
    required?: boolean
}

const tabs: Tab[] = [
    { id: "all", label: "All Meals" },
    { id: "week1", label: "Week 1", required: true },
    { id: "week2", label: "Week 2" },
    { id: "week3", label: "Week 3" },
    { id: "week4", label: "Week 4" },
]

export default function MealTabs() {
    const [activeTab, setActiveTab] = useState("all")

    return (
        <div className="w-full border-b border-gray-200">
            <nav className="flex space-x-8" role="tablist" aria-label="Meal planning periods">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`${tab.id}-panel`}
                        id={`${tab.id}-tab`}
                        className={cn(
                            "relative py-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                            activeTab === tab.id
                                ? "text-blue-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-blue-600"
                                : "text-gray-500 hover:text-gray-700",
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {tab.required && (
                            <span className="ml-0.5 text-red-500" aria-label="required">
                                *
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    )
}

