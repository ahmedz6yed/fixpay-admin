import { Camera, Edit2, LogOut, MapPin, Save, User, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogout } from "../hooks/account/useLogout";

// Mock Data based on provided user object
const INITIAL_USER_DATA = {
  name: { first: "Ahmed", last: "Hassan" },
  address: {
    government: "Cairo",
    city: "Nasr City",
    street: "Abbas El Akkad Street",
  },
  identityVerification: {
    status: "failed",
    confidence: "HIGH",
    failReason: "Face mismatch (similarity: 0.1407)",
    liveness: true,
    similarity: 0.1407,
    verifiedAt: "2026-04-28T20:17:49.987Z",
  },
  _id: "69ebb4263050346e3ccc76c9",
  userName: "mohamedtammaa32",
  dateOfBirth: "1995-05-15", // Formatted for easier input handling
  gender: true,
  email: "mohamedtammaa1965@gmail.com",
  role: "admin",
  avatar: "https://i.pravatar.cc/150?img=12",
  rating: 5,
  ssn: "30428170103122",
  deleted: false,
  phoneNumber: "201111131213",
  createdAt: "2026-04-24T18:19:18.065Z",
};

// --- Reusable Field Component ---
const InfoField = ({
  label,
  value,
  isEditing,
  register,
  name,
  type = "text",
  disabled = false,
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <span className="text-[13px] font-semibold text-subtle/80 uppercase tracking-wider">
      {label}
    </span>
    {isEditing && !disabled ? (
      <input
        type={type}
        className="input w-full py-2 px-3 text-sm transition-all focus:ring-2 focus:ring-accent/20 bg-page/50 border-border rounded-lg"
        defaultValue={value}
        {...register(name)}
      />
    ) : (
      <span className="text-[15px] font-medium text-charcoal h-9 flex items-center break-all sm:break-normal">
        {value || "—"}
      </span>
    )}
  </div>
);

// --- Header Card ---
const ProfileHeader = ({ user }) => (
  <div className="card p-5 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-border/50 rounded-2xl transition-all hover:shadow-md">
    <div className="relative shrink-0">
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-accent/20 to-accent/5 border border-accent/20">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <button className="absolute bottom-1 right-1 p-2 bg-accent text-cream rounded-full hover:bg-accent-hover transition-transform hover:scale-105 shadow-md cursor-pointer border-2 border-white">
        <Camera size={14} />
      </button>
    </div>
    <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left mt-2 sm:mt-4">
      <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-bold tracking-tight">
        {user.name.first} {user.name.last}
      </h2>
      <p className="text-sm font-medium text-accent/80 bg-accent/10 px-3 py-1 rounded-full capitalize inline-block">
        {user.role}
      </p>
      <div className="flex items-center gap-1.5 text-sm text-subtle mt-2">
        <MapPin size={16} className="text-accent/60" />
        <span>
          {user.address.city}, {user.address.government}
        </span>
      </div>
    </div>
  </div>
);

// --- Personal Info Card ---
const PersonalInfoCard = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onSave({
      ...user,
      ...data,
      name: { first: data.firstName, last: data.lastName },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const formattedDob = user.dateOfBirth.split("-").reverse().join("-");

  return (
    <div className="card p-5 sm:p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-border/50 rounded-2xl relative overflow-hidden">
      {/* Subtle decorative background blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-5 gap-4 relative z-10">
        <div className="flex items-center gap-2.5 text-accent">
          <div className="p-2 bg-accent/10 rounded-lg">
            <User size={20} className="text-accent" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold font-sans text-charcoal">
            Personal Information
          </h3>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary w-full sm:w-auto px-5 py-2 text-sm rounded-lg shadow-sm gap-2 hover:shadow-md transition-all self-start sm:self-auto"
          >
            Edit Profile <Edit2 size={14} />
          </button>
        ) : (
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={handleCancel}
              className="btn btn-ghost flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary flex-1 sm:flex-none px-5 py-2 text-sm rounded-lg shadow-sm gap-2"
            >
              <Save size={14} /> Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 relative z-10">
        <InfoField
          label="First Name"
          value={user.name.first}
          isEditing={isEditing}
          register={register}
          name="firstName"
        />
        <InfoField
          label="Last Name"
          value={user.name.last}
          isEditing={isEditing}
          register={register}
          name="lastName"
        />
        <InfoField
          label="Date of Birth"
          value={isEditing ? user.dateOfBirth : formattedDob}
          isEditing={isEditing}
          register={register}
          name="dateOfBirth"
          type="date"
        />
        <InfoField
          label="Email Address"
          value={user.email}
          isEditing={isEditing}
          register={register}
          name="email"
          type="email"
        />
        <InfoField
          label="Phone Number"
          value={user.phoneNumber}
          isEditing={isEditing}
          register={register}
          name="phoneNumber"
        />
        <InfoField
          label="User Role"
          value={user.role}
          isEditing={isEditing}
          register={register}
          name="role"
          disabled={true}
        />
      </div>
    </div>
  );
};

// --- Address Card ---
const AddressCard = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onSave({ ...user, address: { ...user.address, ...data } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="card p-5 sm:p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-border/50 rounded-2xl relative overflow-hidden">
      {/* Subtle decorative background blob */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-5 gap-4 relative z-10">
        <div className="flex items-center gap-2.5 text-accent">
          <div className="p-2 bg-accent/10 rounded-lg">
            <MapPin size={20} className="text-accent" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold font-sans text-charcoal">
            Address Details
          </h3>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-ghost border border-border w-full sm:w-auto px-5 py-2 text-sm rounded-lg hover:bg-page transition-all gap-2 self-start sm:self-auto"
          >
            Edit Address <Edit2 size={14} />
          </button>
        ) : (
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={handleCancel}
              className="btn btn-ghost flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary flex-1 sm:flex-none px-5 py-2 text-sm rounded-lg shadow-sm gap-2"
            >
              <Save size={14} /> Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 relative z-10">
        <InfoField
          label="Government / State"
          value={user.address.government}
          isEditing={isEditing}
          register={register}
          name="government"
        />
        <InfoField
          label="City"
          value={user.address.city}
          isEditing={isEditing}
          register={register}
          name="city"
        />
        <InfoField
          label="Street / Postal Code"
          value={user.address.street}
          isEditing={isEditing}
          register={register}
          name="street"
        />
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function Profile() {
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const { mutate: performLogout, isPending: isLoggingOut } = useLogout();

  const handleUpdateUser = (updatedData) => {
    setUserData(updatedData);
    // TODO: Connect to backend mutation
  };

  const handleLogout = () => {
    performLogout();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pt-2 pb-12 px-2 sm:px-4 md:px-0">
      {/* Page Header Area */}
      <div className="flex items-center justify-between animate-in fade-in slide-in-from-left-4 duration-500">
        <h1 className="text-2xl sm:text-3xl font-serif text-accent font-bold tracking-tight">
          My Profile
        </h1>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <LogOut size={16} />
          )}
          <span className="hidden sm:inline">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

      {/* Profile Sections */}
      <div className="flex flex-col gap-6 sm:gap-8">
        <ProfileHeader user={userData} />
        <PersonalInfoCard user={userData} onSave={handleUpdateUser} />
        <AddressCard user={userData} onSave={handleUpdateUser} />
      </div>
    </div>
  );
}
