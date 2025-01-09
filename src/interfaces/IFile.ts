export interface IFile {
  id: string;
  url: string;
  type_file_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
