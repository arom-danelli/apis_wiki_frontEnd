export interface API {
    id: number;
    name: string;
    description: string;
    free: boolean;
    endpoints: string;
    documentation: string;
    likes: number;
    comments: Comment[];
    url: string;
    image?: string;
  }