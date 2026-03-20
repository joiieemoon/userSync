import Inputfields from "../form-fields/Formfields";
import type { formcontrollerProps } from "../../types/interfaces";

const FormController = ({ control, ...props }: formcontrollerProps) => {
  switch (control) {
    case "input":
      return <Inputfields {...props} />;

    case "textarea":
      return <Inputfields as="textarea" {...props} />;

    case "select":
      return <Inputfields as="select" {...props} />;

    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-amber-400"
        />
      );

    default:
      return null;
  }
};

export default FormController;
