function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <p className="text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;
