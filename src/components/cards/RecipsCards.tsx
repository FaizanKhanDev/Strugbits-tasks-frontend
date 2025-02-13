import Image from "next/image"
import { useState } from "react";
import { Star, StarHalf, Trash } from "lucide-react";  // Import Trash icon


interface RecipeCardProps {
    data: {
        title: string;
        instructions: string[];
        image: string;
        rating: number;
        mealType: string[];
    };
    tab: string,
    onDelete: (item: any) => void;
}
export default function RecipeCard({ data, onDelete, tab }: RecipeCardProps) {
    const [isReadMore, setIsReadMore] = useState(false); // Track whether to show full instructions

    const handleReadMoreToggle = () => {
        setIsReadMore(!isReadMore); // Toggle the read more/less state
    };
    return (
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="relative">
                <Image
                    src={data.image}
                    alt="Classic Margherita Pizza"
                    width={400}
                    height={300}
                    className="w-full object-cover"
                />

                {
                    tab !== "All Meals" && (
                        <div className="absolute top-4 left-4">
                            <button onClick={() => onDelete(data)} className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700">
                                <Trash className="w-5 h-5" />
                            </button>

                        </div>
                    )
                }

                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black text-white text-sm font-medium rounded-full">
                        {
                            data.mealType && data.mealType.map((type, index) => (
                                <span key={index}>{type}</span>
                            ))
                        }
                    </span>

                </div>
            </div>

            <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>

                <p className="text-gray-600">
                    {
                        data.instructions && data.instructions.length > 0 ? (
                            <>
                                <span>
                                    {isReadMore
                                        ? data.instructions.join(" ")
                                        : `${data.instructions.slice(0, 6).join(" ")}...`}
                                </span>
                                <button
                                    className="text-gray-700 ml-2"
                                    onClick={handleReadMoreToggle}
                                >
                                    {isReadMore ? "Read less" : "Read more"}
                                </button>
                            </>
                        ) : (
                            <span>No instructions available.</span>
                        )
                    }
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Cuisine:</span>
                        <span className="font-medium">Italian</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">{data.rating}</span>
                        <div className="flex -space-x-1">
                            {[...Array(Math.floor(data.rating))].map((_, i) => (
                                <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}

                            {data.rating % 1 !== 0 && (
                                <StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            )}

                            {[...Array(5 - Math.ceil(data.rating))].map((_, i) => (
                                <Star key={`empty-${i}`} className="w-5 h-5 fill-gray-300 text-gray-300" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

