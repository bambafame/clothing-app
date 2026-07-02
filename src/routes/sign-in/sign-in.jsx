import SignUpForm from "../../components/sign-up/sign-up-form";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    const userDocRef = await createUserDocumentFromAuth(response.user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
