const categories = ["All", "Nature", "Historical", "Hotels"];

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="px-3 sm:px-5 mt-4">
      
      <div className=" flex gap-1 sm:gap-3  overflow-x-auto  pb-2 scrollbar-hide scroll-smooth
      ">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex-shrink-0 whitespace-nowrap px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base rounded-full transition-all duration-200

              ${
                selectedCategory === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}