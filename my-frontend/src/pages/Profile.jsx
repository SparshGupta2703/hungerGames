import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/AuthStore";
import { getProfile, updateProfile } from "../api/Profile";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    userImg: "",
    userDesc: "",
    image: null,
  });

  const { user, updateUser } = useAuthStore();

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      if (response.success) {
        updateUser(response.user);      // Update Zustand
        setUserData(response.user);     // Update local state
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchProfile();
}, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setUserData((prev) => ({
      ...prev,
      image: file,
      userImg: URL.createObjectURL(file),
    }));
  };

  const handleSave = async () => {
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("userDesc", userData.userDesc);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const response = await updateProfile(formData);

    if (response.success) {
      updateUser(response.updatedUser);
      setUserData(response.updatedUser);
      setSelectedImage(null);
      setIsEditing(false);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-6">
      <div className="card bg-base-100 shadow-2xl w-full max-w-4xl">
        <div className="card-body">

          {/* Profile Image */}

          <div className="flex justify-center">
            <div className="relative">

              <img
                src={userData.userImg}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-lg"
              />

              {isEditing && (
                <>
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-2 right-2 btn btn-circle btn-primary btn-sm cursor-pointer"
                  >
                    📷
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </>
              )}

            </div>
          </div>

          {/* Title */}

          <div className="text-center mt-4">
            <h1 className="text-4xl font-bold">
              {isEditing ? "Edit Profile" : "Profile"}
            </h1>

            <p className="opacity-70 mt-2">
              {user?.userEmail}
            </p>
          </div>

          <div className="divider"></div>

          {isEditing ? (
            <div className="space-y-5">

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    About Me
                  </span>
                </label>

                <textarea
                  rows={4}
                  name="userDesc"
                  className="textarea textarea-bordered w-full"
                  value={userData.userDesc}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setUserData(user);
                    setSelectedImage(null);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>

                 <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                 </button>

              </div>

            </div>
          ) : (
            <div className="space-y-6">

              <div className="card bg-base-200">
                <div className="card-body">

                  <h2 className="card-title">
                    👤 Name
                  </h2>

                  <p className="text-lg">
                    {userData.name}
                  </p>

                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">

                  <h2 className="card-title">
                    📝 About Me
                  </h2>

                  <p className="opacity-80 whitespace-pre-wrap">
                    {userData.userDesc || "No description added yet."}
                  </p>

                </div>
              </div>

              <div className="flex justify-end">

                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;