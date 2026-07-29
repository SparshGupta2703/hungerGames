const MyGroupCard = ({ group, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card bg-base-100 shadow-sm hover:shadow-md hover:bg-base-300 transition-all duration-200 cursor-pointer"
    >
      <div className="card-body p-4">

        <h2 className="card-title text-lg">
          {group.name}
        </h2>

        <p className="text-sm opacity-70">
          Owner: {group.owner?.name || "Unknown"}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="badge badge-primary">
            {group.members?.length || 0} Members
          </span>

          <button className="btn btn-xs btn-ghost">
            Open →
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyGroupCard;