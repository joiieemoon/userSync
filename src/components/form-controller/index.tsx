import Inputfields from "../formfields/Formfields";

interface Props {
  control: "input" | "textarea" | "select" | "checkbox";
  [key: string]: any;
  
}

const FormController = ({ control, ...props }: Props) => {
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
