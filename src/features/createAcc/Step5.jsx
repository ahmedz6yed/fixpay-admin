import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Loader2,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStepStore } from "../../store/useStepStore";

export default function Step5() {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const nextStep = useStepStore((state) => state.nextStep);
  const prevStep = useStepStore((state) => state.prevStep);
  const updateForm = useStepStore((state) => state.updateForm);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const PrevStep = () => {
    prevStep();
    navigate("/register/location-details");
  };

  const NextStep = async () => {
    setIsUploading(true);

    // Update store with photo (if any)
    if (preview) {
      updateForm({ profilePhoto: preview });

      setIsUploading(false);

      // Increment step and move to OTP confirmation
      nextStep();
      navigate("/register/email-otp");
    }

    return (
      <div className="flex flex-col h-full w-full animate-in fade-in duration-500">
        <div className="mb-8 relative pl-5">
          <div className="absolute left-0 top-1.5 w-1.5 h-8 bg-accent rounded-full shadow-sm"></div>
          <h2 className="text-3xl font-serif text-charcoal mb-2 tracking-tight">
            Profile Photo
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-[280px]">
            Add a photo to make your account more personalized. This step is
            optional.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-8 py-4">
          {/* Photo Upload Area */}
          <div
            onClick={handleUploadClick}
            className={`relative w-48 h-48 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-300 group overflow-hidden
            ${preview ? "border-accent bg-surface-raised" : "border-border hover:border-accent bg-surface hover:bg-surface-raised"}`}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white w-8 h-8" />
                </div>
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 text-red-500 transition-colors"
                  title="Remove photo"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-text-subtle group-hover:text-accent transition-colors">
                <div className="w-16 h-16 rounded-full bg-border/30 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <User size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">Upload Photo</p>
                  <p className="text-[10px] opacity-60 uppercase tracking-widest mt-1">
                    Click or Drag
                  </p>
                </div>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-text-subtle flex items-center justify-center gap-1.5">
              <CheckCircle2 size={14} className="text-accent" />
              JPG, PNG or GIF. Max 5MB.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-4 pb-8">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={PrevStep}
              disabled={isUploading}
              className="btn btn-ghost px-6 justify-center py-3.5 rounded-xl hover:bg-surface-raised group border-border/80 text-charcoal/80 hover:text-charcoal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5 text-text-subtle group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            <button
              type="button"
              onClick={NextStep}
              disabled={isUploading}
              className="btn btn-primary flex-1 justify-center py-3.5 rounded-xl group shadow-md hover:shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {preview ? "Next" : "Skip & Next"}
                  <ArrowRight className="w-4 h-4 ml-1.5 opacity-80 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };
}
