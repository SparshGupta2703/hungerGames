// api/Post.js
import { useAuthStore } from "../stores/AuthStore";

export const getGroupPosts = async (groupId) => {
    const { token } = useAuthStore.getState();
    console.log("Fetching group:", groupId);
    const response = await fetch(
        `http://localhost:5000/api/posts/${groupId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();
    
};
export const createPost = async (formData) => {
    const { token } = useAuthStore.getState();

    const response = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    return await response.json();
}

export const getLeaderboard = async(groupId)=>{

    const {token}=useAuthStore.getState();

    const response=await fetch(
        `http://localhost:5000/api/posts/leaderboard/${groupId}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return await response.json();
}