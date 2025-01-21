import Image from "next/image"
import { Star, StarHalf } from "lucide-react"


interface RecipeCardProps {
    data: {
        title: string;
        description: string;
        image: string;
        averageRating: number;
    };
}
export default function RecipeCard({ data }: RecipeCardProps) {
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
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black text-white text-sm font-medium rounded-full">Dinner</span>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>

                <p className="text-gray-600">
                    {data.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Cuisine:</span>
                        <span className="font-medium">Italian</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">{data.averageRating}</span>
                        <div className="flex -space-x-1">
                            {[...Array(Math.floor(data.averageRating))].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                            {data.averageRating % 1 !== 0 && (
                                <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

