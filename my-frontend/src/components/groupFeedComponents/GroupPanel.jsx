import { useState } from "react";
import UploadPostModal from "./UploadPostModal";

// import { useAuthStore } from "../../stores/AuthStore";
import InviteModal from "./InviteModal";
import { useEffect } from "react";
import { getGroupPosts } from "../../api/Post";


const GroupPanel = ({
    group,
    setRefreshLeaderboard
}) => {

    // const { user } = useAuthStore
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [uploadOpen,setUploadOpen]=useState(false);
 

    const fetchPosts = async () => {
    try {

        const response = await getGroupPosts(group._id);

        if (response.success) {
            setPosts(response.posts);
        }

    } catch (error) {
        console.log(error);
    }
};
const handleUploadSuccess = () => {

    fetchPosts();

    setRefreshLeaderboard(prev => prev + 1);

};


useEffect(() => {
    if (!group) return;

    fetchPosts();
    
    
}, [group]);
    

    if (!group) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-3xl">
                    Select a Group
                </h1>
            </div>
        );
    }

   

    return (
        <div className="flex-1 p-6 overflow-y-auto">

            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold">
                        {group.name}
                    </h1>

                    <p>
                        Owner : {group.owner.name}
                    </p>
                </div>

                { (
                    <div className="flex gap-3">

    <button
        className="btn btn-success"
        onClick={()=>setUploadOpen(true)}
    >
        Upload Food
    </button>

    <button
        className="btn btn-primary"
        onClick={()=>setOpen(true)}
    >
        Invite Member
    </button>

</div>
                )}

            </div>

            <InviteModal
                open={open}
                setOpen={setOpen}
                group={group}
            />
            <div className="mt-8 space-y-4">
                <UploadPostModal
    open={uploadOpen}
    setOpen={setUploadOpen}
    group={group}
    onSuccess={handleUploadSuccess}
/>

    {posts.length === 0 ? (

        <p>No posts yet.</p>

    ) : (

        posts.map(post => (

            <div
                key={post._id}
                className="card bg-base-200 p-4"
            >

                <div className="flex items-center gap-3 ">

                    <img
                        src={post.user.userImg}
                        className="w-10 h-10 rounded-full"
                    />

                    <div>

                        <h2>{post.user.name}</h2>

                        <p>{post.foodName}</p>

                    </div>

                </div>

                <img
                    src={post.image}
                    className="mt-4 rounded-lg max-w-50"
                  
                />

                <div className="mt-4">

                    <p>Healthy Score: {post.healthyScore}</p>

                    <p>{post.comment}</p>

                </div>


            </div>

        ))

    )}
    <button
    className="btn btn-success"
    onClick={()=>setUploadOpen(true)}
>
    Upload Food
</button>

</div>

        </div>
    );
};

export default GroupPanel;