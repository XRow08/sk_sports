export interface INotification {
  id: string;
  user_id: string | null;
  customer_id: string | null;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateNotification {
  user_id?: string;
  customer_id?: string;
  name: string;
  description: string;
}

export interface IUpdateNotification extends Partial<ICreateNotification> {}
