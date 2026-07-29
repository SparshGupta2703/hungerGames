import { useEffect, useState } from "react";
import { getLeaderboard } from "../../api/Post";
import { Trophy } from "lucide-react";
const Leaderboard = ({
    group,
    refreshLeaderboard
}) => {

    const [leaders, setLeaders] = useState([]);

   useEffect(() => {

    if (!group) return;

    fetchLeaderboard();

}, [group, refreshLeaderboard]);

    const fetchLeaderboard = async () => {

    const data = await getLeaderboard(group._id);

    console.log("API Response:", data);

    if (data.success) {
        console.log(data);
        setLeaders(data.leaderboard);
    }
};

    if (!group) return null;

    return (
        <div className="w-72 bg-base-200 p-4">

            <h1 className="text-2xl font-bold mb-4">
                <Trophy />Leaderboard
            </h1>

            {leaders.map((leader, index) => (

                <div
                    key={leader?._id?._id}
                    className="flex justify-between items-center mb-4"
                >

                    <div className="flex items-center gap-3">

                        <span>
                            #{index + 1}
                        </span>

                        <img
                            src={leader._id.userImg}
                            className="w-10 h-10 rounded-full"
                        />

                        <div>

                            <p>{leader._id.name}</p>

                            <p className="text-xs">
                                {leader.totalPosts} Posts
                            </p>

                        </div>

                    </div>

                    <p>
                        {leader.totalPoints} pts
                    </p>

                </div>

            ))}

        </div>
    );
};

export default Leaderboard;