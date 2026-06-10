import Sidebar from "./sidebar";
import { useState } from "react";
import type { FieldInputData } from "../components/input/type";
import FormRenderer from "../components/form/form-render";
const Layout = () => {
  const [schema, Setschema] = useState<Array<Record<string, unknown>>>([]);
  const addFiledToSchema = (data: FieldInputData) => {
    console.log(data, "dataaaaa");
    const newField = {
      id: `${data.label}_${Date.now()}`,
      control: data.controlType,
      options: data.options,
      label: data.label,
      placeholder: data.placeholder,
      isRequired: data.validation,
      min: data.min,
      max: data.max,
    };

    Setschema((previous) => [...previous, newField]);
  };

  const handleDeleteSchema = (idTodelete: string) => {
    Setschema((prev) => prev.filter((i) => i.id !== idTodelete));
  };
  console.log(schema);
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <Sidebar onAddField={addFiledToSchema} />
        </div>

        <div className="main">
          {" "}
          <FormRenderer schema={schema} OnDeleteField={handleDeleteSchema} />
        </div>
      </div>
    </>
  );
};

export default Layout;
