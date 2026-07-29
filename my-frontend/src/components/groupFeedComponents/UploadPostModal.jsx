import { useState } from "react";
import { createPost } from "../../api/Post";

const UploadPostModal = ({ open, setOpen, group, onSuccess }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleUpload = async () => {
        if (!image) {
            alert("Select an image");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", image);
        formData.append("groupId", group._id);

        try {
            const data = await createPost(formData);

            if (data.success) {
                onSuccess();
                setImage(null);
                setOpen(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setImage(null);
        setOpen(false);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            <div className="bg-base-100 w-96 rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4">
                    Upload Food
                </h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="mt-4 w-full rounded-lg"
                    />
                )}

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="btn"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPostModal;