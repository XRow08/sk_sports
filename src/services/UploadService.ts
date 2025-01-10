import Api from "@/helpers/Api";

export const UploadService = {
  async upload(file: any) {
    const headers = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await Api.post(`/upload/image`, file, headers);
    return data.imageUrl as string;
  },
};
