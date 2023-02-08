import { Permission } from "./permission.model";

export interface User {

  id?: number | null;
  username: string;
  fullname: string;
  permissions: Permission[];

}
