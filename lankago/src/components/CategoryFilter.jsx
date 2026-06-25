const categories = ["All", "Nature", "Historical", "Hotels"];

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="px-5 mt-4">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full whitespace-nowrap flex-shrink-0
              ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
