const MyGroupCard = ({ group, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-4 border-b cursor-pointer hover:bg-base-300"
        >
            <h2 className="font-bold">
                {group.name}
            </h2>

            <p className="text-sm">
                {group.owner.name}
            </p>
        </div>
    );
};

export default MyGroupCard;