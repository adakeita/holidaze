import { useState } from "react";
import { updateUserProfile } from "../../services/profileService";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/dashboard.css";
import "./avatar.css";

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
      <div className="avatar-img-wrapper">
        <img
          className="avatar-image"
          src={authState.user.avatar?.url || "default-avatar-url.jpg"}
          alt={authState.user.name}
        />
      </div>
      <div className="input-section_avatar">
        <div className="input-wrapper_avatar">
          <label htmlFor="avatar" className="avatar-label">
            Avatar URL
          </label>
          <input
            id="avatar"
            type="url"
            className="avatar-input"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Enter avatar URL"
          />
        </div>
        <div className="avatar-btn-wrapper">
          <button className="avatar-btn" onClick={handleUpdateAvatar}>
            Update Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarManagement;
