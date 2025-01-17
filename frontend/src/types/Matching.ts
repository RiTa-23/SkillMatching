export interface MatchingUsers {
  project: {
    project_id: number;
    title: string;
    company_id: number;
    contents: string;
    start_date: string;
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    languages: {
      language_id: number;
      language_name: string;
      created_at: string;
      updated_at: string;
      pivot: {
        project_id: number;
        language_id: number;
        created_at: string;
        updated_at: string;
      };
    }[];
  };
  matching_users: {
    user: {
      user_id: number;
      name: string;
      birthday: string;
      email: string;
      role_id: number;
      created_at: string;
      updated_at: string;
      languages: {
        language_id: number;
        language_name: string;
        created_at: string;
        updated_at: string;
        pivot: {
          user_id: number;
          language_id: number;
          level: number;
          created_at: string;
          updated_at: string;
        };
      }[];
      hope_languages: {
        language_id: number;
        language_name: string;
        created_at: string;
        updated_at: string;
        pivot: {
          user_id: number;
          language_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    };
    score: number;
  }[];
}
