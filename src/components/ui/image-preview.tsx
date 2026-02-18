import { X } from "lucide-react";

interface ImagePreviewProps {
  imageBase64: string | null;
  onRemove: () => void;
}

const ImagePreview = ({ imageBase64, onRemove }: ImagePreviewProps) => {
  if (!imageBase64) return null;

  return (
    <div className="max-w-200 w-full mb-2 flex items-start justify-start">
      <div className="relative">
        <button
          className="absolute top-1 right-1 bg-black/50 rounded-full grid place-items-center p-1 cursor-pointer"
          onClick={onRemove}
        >
          <X color="white" strokeWidth={1} size={16} />
        </button>
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt=""
          className="rounded-xl max-h-25"
        />
      </div>
    </div>
  );
};

export default ImagePreview;
