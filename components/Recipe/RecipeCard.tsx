import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/domain/recipe";
import {
  difficultyDisplayMap,
  dishGroupDisplayMap,
} from "@/lib/maps/displayMaps";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/recepti/${recipe.slug}-${recipe.id}`}
        className="block group"
        aria-label={`Pogledaj recept: ${recipe.title}`}
        prefetch={true}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}${recipe.heroImagePath}`}
            alt={recipe.heroImageAlt || recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{recipe.title}</h3>

          {recipe.lead && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {recipe.lead}
            </p>
          )}

          <ul
            className="flex items-center text-xs text-gray-500 mt-3 gap-6"
            aria-label="Podaci o receptu"
          >
            <li className="flex items-center gap-1">
              ⏱ {recipe.prepTimeMinutes} min
            </li>
            <li className="flex items-center gap-1">
              👨‍🍳 {difficultyDisplayMap[recipe.difficulty]}
            </li>
            <li className="flex items-center gap-1">
              🍳 {dishGroupDisplayMap[recipe.dishGroup]}
            </li>
          </ul>
        </div>
      </Link>
    </article>
  );
}
