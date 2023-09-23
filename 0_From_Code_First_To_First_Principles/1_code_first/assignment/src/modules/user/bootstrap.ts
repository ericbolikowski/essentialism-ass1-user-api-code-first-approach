import { MikroORM } from "@mikro-orm/core";
import { Context, Hono } from "hono";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { error } from "console";
import { UserEntity } from "./entities/user.entity";
import mikroOrmConfig from "../..//config/mikro-orm.config";

export async function bootstrapModule(hono: Hono) {
  console.log("bootstrapping user module...");

  // I want this to use the config from the config file ("../../config/mikro-orm.config"),
  // but it's not working for some reason... mysterious TS errors
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ["./dist/src/modules/user/entities/"],
    entitiesTs: ["./src/modules/user/entities/"],
    type: "postgresql",
    clientUrl: process.env.DATABASE_URL,
  });

  const em = orm.em.fork();

  // const user = new UserEntity();
  // user.email = "eric@binarylights.com";
  // user.username = "erictest";
  // user.firstName = "Eric";
  // user.lastName = "Bolikowski";
  // user.password = "hello";

  // em.persistAndFlush(user);

  hono.get("/", (c: Context) => c.text("Hello Node.js!"));
}
