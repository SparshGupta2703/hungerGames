import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findJoinedGroups } from "../api/Group";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const result = await findJoinedGroups();

        console.log(result);

        if (result.success) {
          setGroups(result.user || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Groups</h1>

        <div className="flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create-group")}
          >
            Create Group
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/join-group")}
          >
            Join Group
          </button>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-lg">You haven't joined any groups yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group._id}
              className="card bg-base-200 shadow"
            >
              <div className="card-body">
                <h2 className="card-title">{group.name}</h2>

                <button
                  className="btn btn-primary btn-sm w-fit"
                  onClick={() =>
  navigate("/group-feed", {
    state: {
      groupId: group._id,
      groupName: group.name,
    },
  })
}
                >
                  Open Group
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;