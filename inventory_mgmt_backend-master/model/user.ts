interface User {
  id: Number;
  name: String;
  password: String;
  role: UserRole;
  active: Boolean;
}

enum UserRole {
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
  USER = "user",
}

export default User;
