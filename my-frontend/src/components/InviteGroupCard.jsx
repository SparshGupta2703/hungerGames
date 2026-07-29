



const InviteGroupCard = ({
    group,
    onClick,
    onAccept,
    onReject
}) => {

    

    return (
        <div
            onClick={onClick}
            className="cursor-pointer p-4 hover:bg-base-300 border-b"
        >
            <h2>{group.name}</h2>

            <div className="flex gap-2 mt-2">

  <button
    className="btn btn-success btn-sm"
    onClick={(e) => {
        e.stopPropagation();
        onAccept(group._id);
    }}
>
    Accept
</button>

<button
    className="btn btn-error btn-sm"
    onClick={(e) => {
        e.stopPropagation();
        onReject(group._id);
    }}
>
    Reject
</button>
</div>
        </div>
    );
};
export default InviteGroupCard
