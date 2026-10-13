export type UserRole = "STUDENT" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl: string;
  createdAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  videoId?: string;
  pdfKey?: string;
  order: number;
  completed?: boolean;
}

export interface StudentProgress {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: Date;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  hash: string;
  issuedAt: Date;
}
