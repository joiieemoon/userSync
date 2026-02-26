import React from 'react'
import type { RootState } from '../../redux/store/store';
import { useSelector } from "react-redux";
const CreateProfilePicture = () => {
      const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <h1>Create Profile Picture</h1>
    </div>
  )
}

export default CreateProfilePicture
