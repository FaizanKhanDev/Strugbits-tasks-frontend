"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import RecipeCard from "@/components/cards/RecipsCards"
import MealTabs from "@/components/tabs/MealTabs"
import { useGetMealsListQuery } from "@/lib/features/meals/mealsApiSlice"
import { useEffect, useState } from "react";
import { removeMealItem, setMealList } from "@/lib/features/meals/mealsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectMealsList } from "@/lib/features/meals/mealsSlice"
import ComfirmationDialog from "@/components/dialog/ComfirmationDialog"
import { WeekSelectorDialog } from "@/components/dialog/WeekSelectorDialog"
export default function MealPlanner() {
  const { data: mealsResponse, isLoading, error } = useGetMealsListQuery({});


  /* (=======)  Hooks  (=======) */
  const dispatch = useAppDispatch();

  /* (=======)  Local State  (=======) */
  const mealsList: any = useAppSelector(selectMealsList)
  const [selectedTab, setSelectedTab] = useState("All Meals");
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [selectedCardsItem, setSelectedCardsItem] = useState<any>([]);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<any>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isWeekDialogOpen, setWeekIsDialogOpen] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<string>("")
  const handleCardClick = (index: number, item: any) => {

    setSelectedCards((prevSelected: any) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i: number) => i == index)
        : [...prevSelected, index]
    );

    setSelectedCardsItem((prevSelected: any) => {
      if (prevSelected.some((selectedItem: any) => selectedItem.id == item.id)) {
        return prevSelected.filter((i: any) => i.id != item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };



  /* (=======) set meals list  (=======) */
  useEffect(() => {
    if (mealsResponse) {
      let payload = {
        data: mealsResponse.recipes,
        tab: "All Meals"
      }
      dispatch(setMealList(payload));
    }
  }, [mealsResponse, dispatch]);



  /* (=======) Open Delete Dialog  (=======) */
  const handleOpenDeleteDialog = () => {
    setIsDialogOpen(true)
  }


  /* (=======) Close Delete Dialog  (=======) */
  const handleCloseDeleteDialog = () => {
    setIsDialogOpen(false)
  }



  /* (=======)  Handle Confirm Delete  (=======) */
  const handleConfirmDeleteDialog = () => {
    setIsDialogOpen(false)
    dispatch(removeMealItem({
      id: selectedDeleteItem && selectedDeleteItem.id,
      tab: selectedTab
    }))
  }





  /* (=======)  Handle Save Week  (=======) */
  const handleSaveWeek = (week: string) => {
    /**
     * Saves the selected meal cards to the selected week.
     * @param {string} week - The week to save the meal cards to.
     * @returns {void}
     */
    setSelectedWeek(week)
    let payload = {
      tab: week,
      data: selectedCardsItem
    }
    try {
      dispatch(setMealList(payload));
      setSelectedCardsItem([])
      setSelectedCards([])
    } catch (error) {
      console.error("Error dispatching updateMealList action:", error);
    }

  }

/**
 * Toggles the visibility of the week selection dialog.
 * @param {boolean} isOpen - A boolean indicating whether the dialog should be open or closed.
 */

  const handleWeekDialog = (isOpen: boolean) => {
    setWeekIsDialogOpen(isOpen)
  }

  /**
   * Opens the delete confirmation dialog with the given item to be deleted.
   * @param {any} item - The item to be deleted.
   */
  const handleDelete = (item: any) => {
    setSelectedDeleteItem(item)
    handleOpenDeleteDialog()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">

      <ComfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        onConfirm={handleConfirmDeleteDialog}
      />

      <WeekSelectorDialog
        isOpen={isWeekDialogOpen}
        onClose={() => handleWeekDialog(false)}
        onSave={handleSaveWeek}
        selectedMeals={[]}
      />


      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1200px-Pizza-3007395.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Optimized Your Meal</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" max-w-[1200px] mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Week Orders</h2>

        {/* Tabs Navigation */}
        <div className="flex z-50 flex-col sticky top-0 p-10 bg-white md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <MealTabs activeTab={selectedTab} setActiveTab={setSelectedTab}></MealTabs>
          <Button

            disabled={selectedCardsItem.length == 0}
            onClick={() => setWeekIsDialogOpen(true)}
            variant="secondary"
            className="px-6 py-3 text-white bg-[#00436C] hover:bg-[#003255] rounded-md"
          >
            Add to Week
          </Button>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {mealsList.find((meal: any) => meal.tab === selectedTab)?.data.length > 0 ? (
            mealsList
              .find((meal: any) => meal.tab === selectedTab)
              .data.map((item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index, item)}
                  className={`rounded-lg transition-all duration-300 cursor-pointer ${selectedCards.includes(index)
                    ? "border-2"
                    : ""
                    } ${selectedCards.includes(index) ? "border-[#00436C]" : ""}`}
                >
                  <RecipeCard tab={selectedTab} onDelete={handleDelete} data={item} />
                </div>
              ))
          ) : (
            <p>No meals available for this tab.</p>
          )}
        </div>
      </div>
    </div>
  )
}

const meals = [
  {
    title: "Margherita Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5,
  },
  {
    title: "Supreme Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5
  },
  {
    title: "Sliced Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5,
  },
  {
    title: "Margherita Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5,
  },
  {
    title: "Supreme Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5
  },
  {
    title: "Sliced Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5,
  },
  {
    title: "Margherita Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5,
  },
  {
    title: "Supreme Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5
  },
  {
    title: "Sliced Pizza",
    type: "Dinner",
    image:
      "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    description: "Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.",
    averageRating: 4.5,
  },
]

