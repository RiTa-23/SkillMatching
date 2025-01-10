export interface Project {
  project_id: number;
  title: string;
  status: string;
}

export interface ProjectDetail {
  project_id: number;
  company_name: string;
  title: string;
  contents: string;
  start_date: string;
  end_date: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
