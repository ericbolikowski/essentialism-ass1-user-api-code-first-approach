import { MikroORM } from "@mikro-orm/core";
import { Context, Hono } from "hono";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { error } from "console";
import { UserEntity } from "./entities/user.entity";
import mikroOrmConfig from "../..//config/mikro-orm.config";
import { UserRepository } from "./repository/user.repository";
import { CreateUserUseCase } from "./commands/use-cases/create-user/create-user.use-case";
import { CreateUserController } from "./commands/use-cases/create-user/create-user.controller";

export async function bootstrapModule(hono: Hono) {
  console.log("boostrapping user module...");

  const repo = await UserRepository.build();
  const useCase = new CreateUserUseCase(repo);
  const controller = new CreateUserController(useCase);

  hono.post("/users/new", async (c) => {
    const body = await c.req.json();
    const result = await controller.invoke(body);
    return c.json(result, result.httpStatusCode);
  });
  hono.get("/", (c: Context) => c.text("Hello Node.js!"));
}

// How do "context objects" work? Is it something that I could use? To pass data
// around, but alos get various utilities when needed? Instead of doing a kind of
// prop drilling, just passing things around...
