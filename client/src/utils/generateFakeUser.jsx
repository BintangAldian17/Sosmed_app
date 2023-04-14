import { faker } from "@faker-js/faker";

const generateFakeUser = () => {
  return {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    avatar: faker.image.avatar(),
  };
};

const generatePostUsers = () => {
  return {
    posts: faker.image.abstract(),
    avatar: faker.image.avatar(),
    name: faker.name.firstName(),
  };
};

export const generateFakeUsers = (length) => {
  const users = [];

  Array.from({ length: length }).forEach(() => {
    users.push(generateFakeUser());
  });
  return users;
};

export const generatePostsUser = (length) => {
  const posts = [];

  Array.from({ length: length }).forEach(() => {
    posts.push(generatePostUsers());
  });
  return posts;
};
