import { useState } from "react";

type SafeImageProps = {
  url: string;
};

const SafeImage = ({ url }: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);

  const replacedUrl = url.replace(
    "https://content.elevateglobal.app",
    "https://kvrvtcwffqhkzlpfjjoy.supabase.co"
  );

  if (hasError) {
    return (
      <div className="w-[600px] h-[600px] flex items-center justify-center bg-gray-100 border border-dashed text-gray-500 text-sm">
        Failed to load image.
      </div>
    );
  }

  return (
    <img
      key={replacedUrl}
      src={replacedUrl}
      alt="Attachment Preview"
      className="object-contain w-[600px] h-[600px]"
      onError={() => setHasError(true)}
    />
  );
};

export default SafeImage;
