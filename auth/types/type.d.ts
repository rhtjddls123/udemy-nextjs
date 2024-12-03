export interface UserType {
  id: number;
  email: string;
  password: string;
}

export interface SessionType {
  id: string;
  expires_at: number;
  user_id: number;
}

export interface TrainingType {
  id: number;
  title: string;
  image: string;
  description: string;
}
