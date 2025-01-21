"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/lib/hooks"
import { selectMealsList } from "@/lib/features/meals/mealsSlice"

interface WeekSelectorDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (week: string) => void
    selectedMeals: any[]
}

export function WeekSelectorDialog({ isOpen, onClose, onSave, selectedMeals }: WeekSelectorDialogProps) {
    const [selectedWeek, setSelectedWeek] = useState<string>("")
    const mealTabs = useAppSelector(selectMealsList)

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-xl font-semibold">Select Week</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please select a week to assign the meals to:
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="py-4">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {mealTabs.map((week, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedWeek(`week${index + 1}`)}
                                className={cn(
                                    "py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                                    selectedWeek === `week${index + 1}` ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200",
                                )}
                            >
                                {week.tab}
                            </button>
                        ))}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                onSave(selectedWeek)
                                onClose()
                            }}
                            disabled={!selectedWeek}
                        >
                            Save
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
