type CreateUserDTO = {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar?: string;
};

export default CreateUserDTO;
