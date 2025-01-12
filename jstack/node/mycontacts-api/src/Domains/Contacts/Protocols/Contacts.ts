export type Order = "ASC" | "DESC"

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  category_id: string;
}