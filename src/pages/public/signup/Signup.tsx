// import signupCover from '../../../assets/img/signupcover.png';
import loginCover from '../../../assets/img/logincover.png';
import { Button, Label, TextInput } from "flowbite-react";
import { signupFields } from "../../../components/formfields/formconfig";
import { Link } from 'react-router-dom';
import { Formik, Form } from "formik";
// import * as Yup from "yup";
import { auth, db } from "../../../components/firebase/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usepasswordtoggle } from '../../../components/formfields/usepasswordtoggle.js';
import { signupvalidationSchema } from '../../../components/validations/validationSchema';
import { HiEye, HiEyeOff } from "react-icons/hi";


export const Signup = () => {

  const { showPassword, togglePassword } = usepasswordtoggle();

  return (
    <div className="flex flex-col md:flex-row min-h-screen dark:bg-black">

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6">


        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePhoto: null,
          }}

          validationSchema={signupvalidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const userCreadential = await createUserWithEmailAndPassword(auth, values.email, values.password);
              const user = userCreadential.user;

              const storage = getStorage();
              // let photoURl="";

              // if(values.profilePhoto){

              //   //create the storage file to storage
              //   const storageRef=ref(storage,`profilePhotos/${user.uid}`)

              //   //upload the file to storage
              //   await uploadBytes(storageRef,values.profilePhoto);

              //   //get the downloadable url
              //   photoURl=await getDownloadURL(storageRef);

              // }
              if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                  email: user.email,
                  firstName: values.firstName,
                  lastname: values.lastName,
                  password: values.password,
                  // profilePhoto:photoURl,
                  profilePhoto: "",//temp
                })
              }
              console.log("user registerd", user);
              toast.success("User Registerd Successfully!!", { position: 'top-center' })
            }
            catch (error) {
              console.log(error);
              toast.error(error.message, {
                position: 'bottom-center'
              })
            }
            finally {
              setSubmitting(false);
            }
            // console.log("signup values", values)
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="w-full max-w-md bg-white/80 dark:bg-black p-10 rounded-2xl shadow-2xl space-y-5 relative">
              <ToastContainer position="top-center" />
              <div className="text-center">
                <h2 className="text-3xl font-bold dark:text-white">Create Account</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Please create your account</p>
              </div>

              {signupFields.map((field) => (
                <div key={field.name} className='relative mt-1'>
                  <Label htmlFor={field.name} className="text-gray-800 dark:text-white">{field.label}</Label>

                  {

                    field.type === "file" ? (
                      <input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFieldValue(field.name, e.currentTarget.files?.[0])}
                        className="mt-1"
                      />
                    ) : (
                      <TextInput
                        id={field.name}
                        name={field.name}
                        type={field.type === "password" ? showPassword[field.name] ? "text" : "password" : field.type}
                        placeholder={field.placeholder}
                        value={values[field.name as keyof typeof values]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="mt-1"
                      />
                    )}
                   {
                                      field.type === "password" && (
                                        <button type='button' onClick={() => { togglePassword(field.name) }} className="absolute right-3 top-10  text-gray-500 cursor-pointer">
                                          {showPassword[field.name]?<HiEyeOff/>:<HiEye/>}
                                        </button>
                                      )
                                    }
                  {errors[field.name as keyof typeof errors] && touched[field.name as keyof typeof touched] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name as keyof typeof errors]}
                    </p>
                  )}
                </div>
              ))}

              <Button type="submit" className="w-full bg-blue-600">Sign Up</Button>

              <span className="dark:text-white">
                Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>

      {/* Image Side */}
      <div className="hidden md:flex flex-1">
        <img
          src={loginCover}
          alt="signup cover"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};
