export type CreateUserParam = {
  userName: string;
  password: string;
};

export type UpdateUserParam = {
  userName: string;
  password: string;
};

export type CreateUserProfileParam = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateUserPostParam = {
  title: string;
  description: string;
};
