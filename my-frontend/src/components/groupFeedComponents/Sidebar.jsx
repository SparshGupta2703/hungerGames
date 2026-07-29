import InviteGroupCard from "../InviteGroupCard";
import MyGroupCard from "../MyGroupCard";

const Sidebar = ({
  joinedGroups,
  inviteGroups,
  setSelectedGroup,
  onAccept,
  onReject,
}) => {
  return (
    <aside className="w-80 h-screen bg-base-200 border-r border-base-300 overflow-y-auto">

      <div className="p-5 border-b border-base-300">
        <h1 className="text-2xl font-bold">Groups</h1>
        <p className="text-sm opacity-70">
          Manage your groups and invites
        </p>
      </div>

      {/* Joined Groups */}

      <div className="p-4">

        <h2 className="text-lg font-semibold mb-3">
          My Groups
        </h2>

        <div className="space-y-3">

          {joinedGroups.length === 0 ? (
            <p className="text-sm opacity-60">
              You haven't joined any groups.
            </p>
          ) : (
            joinedGroups.map((group) => (
              <MyGroupCard
                key={group._id}
                group={group}
                onClick={() => setSelectedGroup(group)}
              />
            ))
          )}

        </div>

      </div>

      {/* Pending Invites */}

      <div className="p-4 border-t border-base-300">

        <h2 className="text-lg font-semibold mb-3">
          Pending Invites
        </h2>

        <div className="space-y-3">

          {inviteGroups.length === 0 ? (
            <p className="text-sm opacity-60">
              No pending invites.
            </p>
          ) : (
            inviteGroups.map((group) => (
              <InviteGroupCard
                key={group._id}
                group={group}
                onAccept={onAccept}
                onReject={onReject}
              />
            ))
          )}

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;