type Position = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
};


export interface Result<T> {
  isSuccess: boolean;
  value?: T;
  error?: string;
  statusCode: number;
}
