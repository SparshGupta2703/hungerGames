import { useEffect, useState } from "react";

import { acceptInvite, findJoinedGroups, pendingInvites, rejectInvite } from "../api/Group";
import { useAuthStore } from "../stores/AuthStore";
import GroupPanel from "../components/groupFeedComponents/GroupPanel";
import Sidebar from "../components/groupFeedComponents/Sidebar";
import Leaderboard from "../components/groupFeedComponents/LeaderBoard"
import { useLocation } from "react-router-dom";
const GroupFeed = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [inviteGroups, setInviteGroups] = useState([]);
    const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);
    const [loading, setLoading] = useState(true);

    const { user } = useAuthStore();
    const { state } = useLocation();

  const groupId = state?.groupId;


  
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

        const joinedList = joined.user || [];
        const inviteList = invites.user || [];

        setJoinedGroups(joinedList);
        setInviteGroups(inviteList);

        if (groupId) {
            const current = joinedList.find(g => g._id === groupId);
            if (current) {
                setSelectedGroup(current);
            }
        } else if (joinedList.length > 0) {
            setSelectedGroup(joinedList[0]);
        }
    };

    if (user) {
        fetchGroups();
        setLoading(false);
    }
}, [user, groupId]);

    if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
}
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