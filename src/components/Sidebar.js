import React from "react";
import useUser from "../hooks/useUser";
import Suggestions from "./Suggestions";
import UserIn from "./User";

const Sidebar = () => {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();

  console.log("docId", docId);
  return (
    <div className="p-4">
      <UserIn username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInDocId={docId}
      />
    </div>
  );
};

export default Sidebar;
