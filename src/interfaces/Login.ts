export interface LoginFormData {
  email: string;
  password: string;
}

export interface responseAuth {
  status: number;
  data: {
    name: string;
    token: string;
  };
  response: {
    status: number;
  };
}