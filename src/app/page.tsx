import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import RecipeCard from "@/components/cards/RecipsCards"
import MealTabs from "@/components/tabs/MenuTabs"

export default function MealPlanner() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-rose-50 to-blue-50">
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
          {/* <Tabs defaultValue="all" className="w-full md:w-auto  z-10 shadow-md">
            <TabsList>
              <TabsTrigger value="all">All Meals</TabsTrigger>
              <TabsTrigger value="week1">Week 1</TabsTrigger>
              <TabsTrigger value="week2">Week 2</TabsTrigger>
              <TabsTrigger value="week3">Week 3</TabsTrigger>
              <TabsTrigger value="week4">Week 4</TabsTrigger>
            </TabsList>
          </Tabs> */}
          <MealTabs></MealTabs>
          <Button variant="secondary" className="w-full md:w-auto">
            Add to Week
          </Button>
        </div>

        {/* Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal, index) => (
            <RecipeCard key={index} data={meal}></RecipeCard>

          ))}
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

