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

    const handleSaveAndClose = () => {
        onSave(selectedWeek)
        onClose()
    }

    const handleSelectWeek = (params: string) => {
        console.log("params", JSON.stringify(params));
        setSelectedWeek(params)

    }

    return (
        <AlertDialog open={isOpen}>
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
                            week.tab !== "All Meals" && (
                                <button
                                    key={index}
                                    onClick={() => handleSelectWeek(`Week ${index}`)}
                                    className={cn(
                                        "py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                                        selectedWeek === `Week ${index}` ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200",
                                    )}
                                >
                                    {week.tab}
                                </button>
                            )
                        ))}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleSaveAndClose}
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
