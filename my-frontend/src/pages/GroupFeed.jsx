import { useEffect, useState } from "react";

import { acceptInvite, findJoinedGroups, pendingInvites, rejectInvite } from "../api/Group";
import { useAuthStore } from "../stores/AuthStore";
import GroupPanel from "../components/groupFeedComponents/GroupPanel";
import Sidebar from "../components/groupFeedComponents/Sidebar";
import Leaderboard from "../components/groupFeedComponents/LeaderBoard"
const GroupFeed = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [inviteGroups, setInviteGroups] = useState([]);
    const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);
    

    const { user } = useAuthStore();

    const handleAccept = async (groupId) => {
    const res = await acceptInvite({ groupId });

    if (res.success) {
        const joined = await findJoinedGroups();
        const invites = await pendingInvites();

        setJoinedGroups(joined.user || []);
        setInviteGroups(invites.user || []);
    }}

const handleReject = async (groupId) => {
    const res = await rejectInvite({ groupId });

    if (res.success) {
        setInviteGroups(prev =>
            prev.filter(group => group._id !== groupId)
        );
    }
};

    useEffect(() => {
        const fetchGroups = async () => {
            const joined = await findJoinedGroups();
            const invites = await pendingInvites();

            setJoinedGroups(joined.user || []);
            
            setInviteGroups(invites.user || []);
            
        };

        if (user) {
            fetchGroups();
        }
    }, [user]);
    useEffect(() => {
    console.log("Joined Groups:", joinedGroups);
}, [joinedGroups]);

useEffect(() => {
    console.log("Invite Groups:", inviteGroups);
}, [inviteGroups]);

    return (
      <div className="flex h-screen">

    <Sidebar
        joinedGroups={joinedGroups}
        inviteGroups={inviteGroups}
        setSelectedGroup={setSelectedGroup}
        onAccept={handleAccept}
        onReject={handleReject}
    />

    <GroupPanel
    group={selectedGroup}
    refreshLeaderboard={refreshLeaderboard}
    setRefreshLeaderboard={setRefreshLeaderboard}
/>

<Leaderboard
    group={selectedGroup}
    refreshLeaderboard={refreshLeaderboard}
/>

</div>
    );
};

export default GroupFeed;