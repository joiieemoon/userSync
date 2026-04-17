import type { InputControllerProps } from "../types";
import React from "react";

import Input from "../input-fields/InputField";

const InputController = ({ control, ...props }: InputControllerProps) => {
  switch (control) {
    case "input":
      return <Input {...props} />;

    case "textarea":
      return <Input as="textarea" {...props} />;

    case "select":
      return <Input as="select" {...props} />;

    case "checkbox":
      return (
        <Input
          type="checkbox"
          //   checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-amber-400"
        />
      );

    default:
      return null;
  }
};

export default React.memo(InputController);
