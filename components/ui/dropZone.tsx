import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Utility for merging classes, or replace with classNames if preferred
import {
  Download,
  FileImage,
  RotateCcw,
  Upload,
  X,
  ZoomIn,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type FileUploadProps = {
  label?: string;
  onFileChange: (file: File | null) => void;
  className?: string;
  acceptedFormats?: string[];
  maxSize?: number; // in bytes
  showFileInfo?: boolean;
};

const FileUpload: React.FC<FileUploadProps> = ({
  label = "File",
  onFileChange,
  className,
  acceptedFormats = [".png", ".jpg", ".jpeg", ".webp", ".jfif"],
  maxSize = 10 * 1024 * 1024, // 10MB default
  showFileInfo = true,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showFullPreview, setShowFullPreview] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  console.log(previewUrl);
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      return `File type not supported. Accepted formats: ${acceptedFormats.join(
        ", "
      )}`;
    }

    return null;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setUploadError("");

      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        setUploadError(error.message || "File upload failed");
        return;
      }

      const file = acceptedFiles[0] || null;

      if (file) {
        const validationError = validateFile(file);
        if (validationError) {
          setUploadError(validationError);
          return;
        }

        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        setImageError(false);
        onFileChange(file);
      } else {
        handleClearFile();
      }
    },
    [onFileChange, maxSize, acceptedFormats]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": acceptedFormats,
    },
    multiple: false,
    maxSize,
  });

  const handleClearFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setImageError(false);
    setUploadError("");
    onFileChange(null);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClearFile();
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) {
      const link = document.createElement("a");
      link.href = previewUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullPreview(true);
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>

      {!previewUrl ? (
        <div
          {...getRootProps()}
          className={cn(
            "bg-pageColor rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50/50",
            "border-blue-500 bg-blue-50 scale-[1.02]",
            uploadError && "border-red-300 bg-red-50/50"
          )}
        >
          <Input {...getInputProps()} className="hidden" type="file" />

          <div
            className={cn(
              "transition-transform duration-200",
              isDragActive && "scale-110"
            )}
          >
            <div className="p-4 rounded-full bg-blue-100">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-sm font-medium text-gray-700">
              {isDragActive
                ? "Drop your file here"
                : "Choose a file or drag it here"}
            </p>
            <p className="text-xs text-gray-500">
              {acceptedFormats.join(", ").toUpperCase()} up to{" "}
              {formatFileSize(maxSize)}
            </p>
          </div>

          {uploadError && (
            <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded text-xs text-red-600">
              {uploadError}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div
            {...getRootProps()}
            className="bg-pageColor rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Input {...getInputProps()} className="hidden" type="file" />

            <div className="flex flex-col items-center space-x-4">
              {/* Image Preview */}
              <div className="relative group flex-shrink-0">
                {!imageError ? (
                  <img
                    src={`${previewUrl}`}
                    alt="File preview"
                    width={80}
                    height={80}
                    className="rounded-lg border object-cover shadow-sm"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg border bg-gray-100 flex items-center justify-center">
                    <FileImage className="w-6 h-6 text-gray-400" />
                  </div>
                )}

                {/* Quick actions overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-1">
                  <button
                    type="button"
                    onClick={handlePreviewClick}
                    className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    title="View full size"
                  >
                    <ZoomIn className="w-3 h-3 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    title="Download"
                  >
                    <Download className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* File Info */}
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    {showFileInfo && (
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-blue-600">
                          <RotateCcw className="w-3 h-3" />
                          <span>Click to replace</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {showFullPreview && previewUrl && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowFullPreview(false)}
        >
          <div className="relative max-w-5xl max-h-full">
            <div className="absolute -top-12 right-0 flex space-x-2">
              <button
                type="button"
                onClick={handleDownload}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
                title="Download"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => setShowFullPreview(false)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
                title="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <img
              src={`${previewUrl}`}
              alt="Full preview"
              width={1000}
              height={1000}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
