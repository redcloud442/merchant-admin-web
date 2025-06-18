import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

type SafeImageProps = {
  url: string;
};

const SafeImage = ({ url }: SafeImageProps) => {
  const [zoom, setZoom] = useState(1);

  const minZoom = 0.5;
  const maxZoom = 3;
  const zoomStep = 0.25;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + zoomStep, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - zoomStep, minZoom));
  };

  return (
    <div className="relative inline-block">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= maxZoom}
          className="p-2 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={zoom <= minZoom}
          className="p-2 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg text-sm font-medium">
        {Math.round(zoom * 100)}%
      </div>

      {/* Image container */}
      <div className="overflow-hidden border relative flex items-center justify-center">
        <img
          key={url}
          src={url}
          alt="Attachment Preview"
          width={300}
          height={300}
          className={`object-contain transition-transform duration-200 ease-out ${`scale-${zoom}`}`}
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
};

export default SafeImage;
