import { useRef, useEffect } from "react";
import type { ModalProps } from "../../../features/roles/types";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
  title,
  footer,
}) => {


  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-3xl bg-white  dark:bg-gray-900";
  return (
    <div className="fixed inset-0 flex items-center justify-center z-99999">
      {/* overlay */}
      {!isFullscreen && (
        <div
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]"
          onClick={onClose}
        />
      )}

      <div
        className={`${isFullscreen ? "w-full h-full" : "rounded-3xl"} dark:text-white relative bg-white dark:bg-gray-900 ${className}`}
      >
        {/* HEADER */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold mt-6 flex justify-center  w-full">
              {title}
            </h2>
          </div>
        )}

        {/* BODY */}
        <div className="p-4">{children}</div>

        {/* FOOTER */}
        {footer && (
          <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
