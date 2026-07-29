import InviteGroupCard from "../InviteGroupCard";
import MyGroupCard from "../MyGroupCard";


const Sidebar = ({
    joinedGroups,
    inviteGroups,
    setSelectedGroup,
    onAccept,
    onReject
}) => {
    return (
        <div className="w-80 border-r bg-base-200 overflow-y-auto">

            <h2 className="text-xl font-bold p-4">
                My Groups
            </h2>

            {joinedGroups.map(group => (
                <MyGroupCard
    key={group._id}
    group={group}
    onClick={() => {
        console.log("Clicked:", group._id, group.name);
        setSelectedGroup(group);
    }}
/>
            ))}

            <h2 className="text-xl font-bold p-4">
                Pending Invites
            </h2>

            {inviteGroups.map(group => (
                <InviteGroupCard
                    key={group._id}
                    group={group}
                    onAccept={onAccept}
                    onReject={onReject}
                />
            ))}

        </div>
    );
};

export default Sidebar;