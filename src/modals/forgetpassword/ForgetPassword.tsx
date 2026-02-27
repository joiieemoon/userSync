import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../components/firebase/firebase";
import { toast } from "react-toastify";



type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
};

export default function ForgotPassword({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!email) {
      // alert("Enter your email");
      return;
    }

    // onSubmit(email);
    // setEmail("");

    try{
      await sendPasswordResetEmail(auth,email.trim());
      // alert("Password reset email sent");
      toast.success("password reset email sent");
      onClose();
      setEmail("");

      
    }
    catch(error){
// alert(error.message);
toast.error(error.message ,{
  position:"bottom-center"
})
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter registered email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-amber-300 text-black  py-2 rounded mb-2"
        >
          Send Reset Link
        </button>

        <button
          onClick={onClose}
          className="w-full text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
