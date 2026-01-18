
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PlumberInfo {
  name: string;
  services: string[];
  faqs: { question: string; answer: string }[];
  contact: {
    email?: string;
    phone?: string;
    city: string;
  };
}
