export function seedDatabase(firebase) {
  const users = [
    {
      userId: "WzQKT9DB03eTRSQogiIjRb03ztT2",
      username: "Haroon",
      fullName: "Haroon khan",
      emailAddress: "haroonkhan11201@gmail.com",
      following: ["2"],
      followers: ["2", "3"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "Nafeesa",
      fullName: "Nafeesa aslam",
      emailAddress: "nafeesaaslam030@gmail.com",
      following: [],
      followers: ["WzQKT9DB03eTRSQogiIjRb03ztT2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "daniel",
      fullName: "Daniel Salvador",
      emailAddress: "daniel@salvador.com",
      following: [],
      followers: ["WzQKT9DB03eTRSQogiIjRb03ztT2"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/Haroon/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "daniel",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "nafeesa",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
