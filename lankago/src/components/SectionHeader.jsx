export default function SectionHeader({ title, buttonText }) {
  return (
    <div className="flex justify-between items-center px-5 mt-6 mb-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <button className="text-green-600 font-medium">{buttonText}</button>
    </div>
  );
}
