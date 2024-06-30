import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (!user || !user.uid) {
        return;
      }

      const { uid: userId } = user;
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos();
  }, [user]);

  return { photos };
};

export default usePhotos;
