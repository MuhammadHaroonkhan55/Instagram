import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";

import { getUserPhotosByUserId } from "../services/firebase";
import HeaderProfile from "./HeaderProfile";
import Photos from "./Photos";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({
    ...state,
    ...newState,
  });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user?.followers?.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <HeaderProfile
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
