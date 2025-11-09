export default function PageHeader({ title, subtitle, imageUrl }) {
  return (
    <div className="relative h-80 bg-gray-900">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-700 via-blue-600 to-transparent opacity-80"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white">
        <h1 className="text-4xl sm:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-4 text-xl text-blue-100 max-w-3xl">{subtitle}</p>}
      </div>
    </div>
  );
}