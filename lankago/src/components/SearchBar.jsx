export default function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="px-5 mt-4">

      <input
        type="text"
        placeholder="Search places..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full h-14 px-5 p-3 rounded-full bg-gray-100 border border-gray-200"
      />

    </div>
  );
}