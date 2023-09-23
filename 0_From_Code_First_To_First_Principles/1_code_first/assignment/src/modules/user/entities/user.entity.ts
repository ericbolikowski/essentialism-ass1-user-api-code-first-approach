import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "users" })
export class UserEntity {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  email: string;

  @Property({ unique: true })
  username: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  password: string;
}
