import { useEffect, useState } from "react";
import InviteModal from "./InviteModal";
import UploadPostModal from "./UploadPostModal";
import { getGroupPosts } from "../../api/Post";

const GroupPanel = ({ group, setRefreshLeaderboard }) => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (!group) return;

    try {
      setLoading(true);

      const response = await getGroupPosts(group._id);

      if (response.success) {
        setPosts(response.posts || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    fetchPosts();
    setRefreshLeaderboard((prev) => prev + 1);
  };

  useEffect(() => {
    if (group) {
      fetchPosts();
    }
  }, [group]);

  if (!group) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-semibold opacity-70">
          Select a Group
        </h1>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 w-2/4">

      {/* Header */}

      <div className="bg-base-200 rounded-xl shadow p-6 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            {group.name}
          </h1>

          <p className="opacity-70 mt-1">
            Owner: {group.owner?.name || "Unknown"}
          </p>
        </div>

        <div className="flex gap-3">

          <button
            className="btn btn-success"
            onClick={() => setUploadOpen(true)}
          >
            Upload Food
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setOpen(true)}
          >
            Invite Member
          </button>

        </div>

      </div>

      <InviteModal
        open={open}
        setOpen={setOpen}
        group={group}
      />

      <UploadPostModal
        open={uploadOpen}
        setOpen={setUploadOpen}
        group={group}
        onSuccess={handleUploadSuccess}
      />

      {/* Feed */}

      <div className="max-w-3xl mx-auto mt-8 space-y-6">

        {loading ? (

          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>

        ) : posts.length === 0 ? (

          <div className="card bg-base-200 shadow">

            <div className="card-body text-center">

              <h2 className="text-2xl font-bold">
                No Posts Yet
              </h2>

              <p className="opacity-70">
                Upload the first healthy meal for your group.
              </p>

              <button
                className="btn btn-success mt-4"
                onClick={() => setUploadOpen(true)}
              >
                Upload Food
              </button>

            </div>

          </div>

        ) : (

          posts.map((post) => (

            <div
              key={post._id}
              className="card bg-base-200 shadow-md hover:shadow-lg transition-all"
            >

              <div className="card-body">

                {/* User */}

                <div className="flex items-center gap-3">

                  <img
                    src={post.user.userImg}
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="font-semibold">
                      {post.user.name}
                    </h2>

                    <p className="text-sm opacity-70">
                      {post.foodName}
                    </p>
                  </div>

                </div>

                {/* Image */}

                <img
                  src={post.image}
                  alt={post.foodName}
                  className="rounded-xl mt-5 w-full max-h-96 object-cover"
                />

                {/* Score */}

                <div className="mt-5">

                  <div className="badge badge-success badge-lg">
                    Healthy Score: {post.healthyScore}/10
                  </div>

                  <p className="mt-3 opacity-80">
                    {post.comment}
                  </p>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default GroupPanel;