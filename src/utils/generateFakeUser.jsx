import { faker } from "@faker-js/faker";

const generateFakeUser = () => {
  return {
    id: faker.datatype.uuid(),
    fullname: faker.name.fullName(),
    avatar: faker.image.avatar(),
  };
};

export const generateFakeUsers = (length) => {
  const users = [];

  Array.from({ length: length }).forEach(() => {
    users.push(generateFakeUser());
  });
  return users;
};
