import { useAuthStore } from "../stores/AuthStore";

export const getProfile = async () => {
  const { token } = useAuthStore.getState();
  

  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await result.json();
};

export const updateProfile = async (formData) => {
  const { token } = useAuthStore.getState();

  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await result.json();
};

export const changePassword = async (data) => {
  const { token } = useAuthStore.getState();

  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/api/profile/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return await result.json();
};