import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";

const Signup = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState("");

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";
  const handleSignUp = async (e) => {
    e.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length)
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        navigate("/");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setError("The email address is already in use by another account");
        } else if (error.code === "auth/invalid-email") {
          setError("The email address is badly formatted");
        }
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    else {
      setError("This user is already taken,please try another one");
    }
  };
  useEffect(() => {
    document.title = "Sign_up - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md  items-center h-screen  ">
      <div className="flex w-3/5">
        <img src="/images/profile.jpg" alt=" Instagram app" />
      </div>
      <div className="flex flex-col w-2/5 ml-4 ">
        <h1 className="flex justify-center w-full">
          <img
            src="/images/Instagram.png"
            alt="Instagram"
            className="mt-2 w-6/12 mb-4"
          />
        </h1>

        {error && <p className="text-xs text-red-primary">{error}</p>}

        <form onSubmit={handleSignUp} method="POST">
          <input
            aria-label="Enter your username"
            type="text"
            placeholder="username"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            aria-label="Enter your Full Name"
            type="text"
            placeholder="Full Name"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <input
            aria-label="Enter your email address"
            type="text"
            placeholder="Email address"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={(e) => setEmailAddress(e.target.value)}
            value={emailAddress}
          />
          <input
            aria-label="Enter your password"
            type="password"
            placeholder="Password"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
              isInvalid && "opacity-50"
            }`}
          >
            Log In
          </button>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary mt-4">
            <p>
              Have an account ?
              <Link to="/login" className="font-bold text-blue-medium ml-2">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
