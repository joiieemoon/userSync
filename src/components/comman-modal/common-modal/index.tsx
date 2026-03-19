import React, { ReactNode } from "react";
import EditBtn from "../../button/editbutton/Editbtn.tsx";
import type { CommonModalProps } from "../../../types/interfaces/index.ts";

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  submitDisabled = false,
  className = "",
  ...rest
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
      {...rest}
    >
      <div
        className={`bg-white rounded-lg p-6 shadow-lg w-full max-w-md ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="text-center text-xl font-semibold mb-4">{title}</div>
        )}

        <div className="mb-4">{children}</div>

        {footer ? (
          footer
        ) : (
          <div className="flex justify-center  gap-4 ">
            <EditBtn
              type="button"
              label={cancelLabel}
              variant="secondary"
              onClick={onClose}
              icon=""
            />
            <EditBtn
              type="button"
              label={submitLabel}
              variant="primary"
              onClick={onSubmit}
              disabled={submitDisabled}
              icon=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonModal;
