export default function FavoriteCard({
  name,
  image,
  category,
  rating,
  onRemove,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 mb-4">
      <img
        src={image}
        alt={name}
        className="w-24 h-20 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h2 className="font-bold text-xl">{name}</h2>

        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
          {category}
        </span>

        <p className="text-yellow-500 mt-2">⭐ {rating}</p>
      </div>

      <button onClick={onRemove} className="text-red-500 text-2xl">
        ❤️
      </button>
    </div>
  );
}
