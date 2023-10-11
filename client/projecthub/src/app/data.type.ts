export interface signUp {
  name: string;
  password: string;
  email: string;
  role: string;
}
export interface login {
  password: string;
  email: string;
}
export interface projectData {
  name: string;
  description: string;
  startDate: string;
  EndDate: String;
}
export interface tasklist {
  message: string;
  taskLists: any; // Adjust this type to match the actual structure of your task data
}
