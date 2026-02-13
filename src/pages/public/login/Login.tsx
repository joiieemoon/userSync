import loginCover from '../../../assets/img/logincover.png';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import { loginFields } from "../components/formfields/formconfig";
import { loginFields } from "../../../components/formfields/formconfig";
import { Link } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { Formik } from "formik";
// import { auth } from 'firebase/auth';
import { auth } from "../../../components/firebase/firebase";
import { loginvalidationSchema } from '../../../components/validations/validationSchema';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});


export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row min-h-screen dark:bg-black">

      <div className="flex-1 flex items-center justify-center p-6">
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await signInWithEmailAndPassword(auth, values.email, values.password);
              console.log("user login successfully");
                 toast.success("User Login Successfully!!",{position:'top-center'})
              //  navigate("/");

              setTimeout(() => {
      navigate("/");
    }, 1500);
               
            } catch (error) {
              console.log(error.message);
               toast.error(error.message,{
                position:'bottom-center'
              })
            }
             finally {
              setSubmitting(false);
            } 
          }}
        >
          {({ values,
            handleSubmit,
            errors,
            handleChange,
            handleBlur,

            touched }) => (
            <Form onSubmit={handleSubmit} className="w-full max-w-md bg-white/80 dark:bg-black p-10 rounded-2xl shadow-2xl space-y-5">

              <div className="text-center">
                <h2 className="text-3xl font-bold dark:text-white">
                  Welcome Back
                </h2>
              </div>
              <ToastContainer position="top-center" />

              {loginFields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name} className="text-gray-800 dark:text-white">
                    {field.label}
                  </Label>

                  <TextInput
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={values[field.name as keyof typeof values]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    required
                    className="mt-1"
                  />
                  {errors[field.name as keyof typeof errors] && touched[field.name as keyof typeof touched] ? (
                    <p className="text-red-500 text-sm">{errors[field.name as keyof typeof errors]}</p>
                  ) : null}
                </div>
              ))}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600">
                Login
              </Button>

              <span className='dark:text-white'>
                New user ? <Link to="/signup" className="text-blue-600">
                  Sign Up
                </Link>
              </span>

            </Form>
          )}
        </Formik>
      </div>

      <div className="hidden md:flex flex-1">
        <img
          src={loginCover}
          alt="usersync"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};
