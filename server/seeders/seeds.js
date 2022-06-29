const faker = require("faker");

const db = require("../config/connection");
const { Project, User } = require("../models");

db.once("open", async () => {
  await Project.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create projects
  let createdProjects = [];
  for (let i = 0; i < 100; i += 1) {
    const projectText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdProject = await Project.create({ projectText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { projects: createdProject._id } }
    );

    createdProjects.push(createdProject);
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomProjectIndex = Math.floor(
      Math.random() * createdProjects.length
    );
    const { _id: projectId } = createdProjects[randomProjectIndex];

    await Project.updateOne(
      { _id: projectId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }

  //  create saved projects
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    const randomProjectIndex = Math.floor(
      Math.random() * createdProjects.length
    );
    const { _id: projectId } = createdProjects[randomProjectIndex];

    let savedProjectId = projectId;

    while (savedProjectId === projectId) {
      const randomProjectIndex = Math.floor(
        Math.random() * createdProjects.length
      );
      savedProjectId = createdProjects.randomProjectIndex;
    }

    await User.updateOne(
      { _id: userId },
      { $addToSet: { savedProjects: savedProjectId } }
    );
  }

  console.log("all done!");
  process.exit(0);
});
