import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../api/Group";
import toast from "react-hot-toast";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Enter group name");
    }

    try {
      setLoading(true);

      const res = await createGroup({ name });

      if (res.success) {
        toast.success(res.message);
        navigate("/home");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex justify-center items-center">

      <div className="card bg-base-200 w-full max-w-md shadow-xl">

        <div className="card-body">

          <h2 className="card-title text-3xl mb-4">
            Create Group
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Group Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Group"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateGroup;