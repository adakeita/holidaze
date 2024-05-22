import { useState } from "react";
import { updateUserProfile } from "../../services/profileService";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/dashboard.css";

const AvatarManagement = () => {
  const { authState, updateUserInfo } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUpdateAvatar = async () => {
    try {
      const profileData = { avatar: { url: avatarUrl } };
      const updatedProfile = await updateUserProfile(
        authState.user.name,
        profileData,
        authState.accessToken,
        authState.apiKey
      );
      updateUserInfo({ avatar: updatedProfile.data.avatar });
      alert("Avatar updated successfully!");
    } catch (error) {
      alert("Failed to update avatar.");
      console.error("Avatar update error:", error);
    }
  };

  return (
    <div className="avatar-container">
      <img
        src={authState.user.avatar?.url || "default-avatar-url.jpg"}
        alt={authState.user.name}
      />
      <div>
        <h3>Update Your Avatar</h3>
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Enter avatar URL"
        />
        <button onClick={handleUpdateAvatar}>Update Avatar</button>
      </div>
    </div>
  );
};

export default AvatarManagement;
