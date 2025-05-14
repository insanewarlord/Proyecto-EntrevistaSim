import { useAuth } from "../context/authContext";
import Logo from "../assets/Logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";
import { updateProfileRequest } from "../api/auth";
import { toast } from "react-toastify";

export default function EditProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useTheme();

  const [profileImage, setProfileImage] = useState(Logo);
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [passwordSection, setPasswordSection] = useState({ password: "", confirm: "", loading: false });

  useEffect(() => {
    const loadImage = async () => {
      try {
        const firstLetter = user?.userName?.charAt(0).toUpperCase();
        const image = await import(`../assets/Letras/${firstLetter}.png`);
        setProfileImage(image.default);
      } catch (error) {
        setProfileImage(Logo);
      }
    };
    if (user?.userName) loadImage();
  }, [user]);

  useEffect(() => {
    setNewName(user.userName);
    setEmail(user.email);
    setRole(user.role);
    setPreviewPhoto(profileImage);
  }, [user, profileImage]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    } else {
      toast.error(t('photo_invalid', language));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!newName) {
      toast.error(t('name_required', language));
      return;
    }
    setLoadingEdit(true);
    const formData = new FormData();
    formData.append("userName", newName);
    if (newPhoto) formData.append("photo", newPhoto);
    try {
      await updateProfileRequest(formData);
      toast.success(t('profile_update_success', language));
      navigate(-1);
    } catch (err) {
      toast.error(t('profile_update_error', language));
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordSection.password) {
      toast.error(t('password_required', language));
      return;
    }
    if (passwordSection.password !== passwordSection.confirm) {
      toast.error(t('passwords_no_match', language));
      return;
    }
    setPasswordSection((prev) => ({ ...prev, loading: true }));
    const formData = new FormData();
    formData.append("password", passwordSection.password);
    try {
      await updateProfileRequest(formData);
      toast.success(t('profile_update_success', language));
      setPasswordSection({ password: "", confirm: "", loading: false });
    } catch (err) {
      toast.error(t('profile_update_error', language));
      setPasswordSection((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#283e56] via-[#4fc3f7] to-[#ffd700] p-4 dark:bg-gray-900">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-50 rounded-full p-4 bg-gradient-to-r from-[#4fc3f7] via-[#ffd700] to-[#283e56] shadow-md hover:scale-110 transform duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg flex flex-col items-center border-2 border-[#ffd700] dark:bg-gray-900" style={{boxShadow: '0 8px 32px 0 rgba(40,62,86,0.15)'}}>
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="w-20 h-20 mb-2 border-2 border-[#ffd700] bg-white rounded-full shadow-md" />
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-white" style={{textShadow: '0 2px 8px #ffd70055'}}>{t('edit_profile', language)}</h2>
        </div>
        <form onSubmit={handleSaveChanges} className="w-full flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center w-full">
            <img
              src={previewPhoto}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2"
            />
            <label htmlFor="photo-upload" className="inline-flex items-center px-4 py-2 bg-gradient-to-t from-[#4fc3f7] to-[#ffd700] text-[#283e56] font-semibold rounded-lg shadow-md cursor-pointer hover:scale-105 transition border-2 border-[#ffd700]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4v1.25A2.25 2.25 0 0 1 17.75 19.5H6.25A2.25 2.25 0 0 1 4 17.25V6.75A2.25 2.25 0 0 1 6.25 4.5h7.5A2.25 2.25 0 0 1 16 6.75V8" />
              </svg>
              {t('change_photo', language)}
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-1 text-sm font-medium text-[#283e56]">{t('change_name', language)}</label>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] border-[#ffd700]"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-1 text-sm font-medium text-[#283e56]">{t('email', language)}</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed border-[#ffd700]"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-1 text-sm font-medium text-[#283e56]">{t('role', language)}</label>
            <input
              type="text"
              value={t(role, language)}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed border-[#ffd700]"
            />
          </div>
          <div className="flex justify-end w-full space-x-2 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-300 text-[#283e56] rounded-lg hover:bg-gray-400 border-2 border-[#ffd700]"
              disabled={loadingEdit}
            >
              {t('cancel', language)}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#283e56] text-[#ffd700] rounded-lg font-semibold hover:bg-[#ffd700] hover:text-[#283e56] transition border-2 border-[#ffd700]"
              disabled={loadingEdit}
            >
              {loadingEdit ? t('saving', language) : t('save_changes', language)}
            </button>
          </div>
        </form>
        <form onSubmit={handleChangePassword} className="w-full flex flex-col items-center mt-8 border-t pt-6">
          <h3 className="text-lg font-bold mb-4 text-[#283e56] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A4.5 4.5 0 0 0 12 2.25a4.5 4.5 0 0 0-4.5 4.5v3.75m13.5 0v7.5a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 18V10.5m16.5 0a2.25 2.25 0 0 0-2.25-2.25h-13.5A2.25 2.25 0 0 0 3 10.5" />
            </svg>
            {t('change_password', language)}
          </h3>
          <div className="mb-4 w-full">
            <label className="block mb-1 text-sm font-medium text-[#283e56]">{t('password', language)}</label>
            <input
              type="password"
              value={passwordSection.password}
              onChange={e => setPasswordSection(s => ({ ...s, password: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] border-[#ffd700]"
              placeholder={t('password', language)}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-1 text-sm font-medium text-[#283e56]">{t('confirm_password', language)}</label>
            <input
              type="password"
              value={passwordSection.confirm}
              onChange={e => setPasswordSection(s => ({ ...s, confirm: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] border-[#ffd700]"
              placeholder={t('confirm_password', language)}
            />
          </div>
          <div className="flex justify-end w-full space-x-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
              disabled={passwordSection.loading}
            >
              {passwordSection.loading ? t('saving', language) : t('change_password', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 