import { Context, Hono } from "hono";
import { CreateUserController } from "./commands/use-cases/create-user/create-user.controller";
import { CreateUserUseCase } from "./commands/use-cases/create-user/create-user.use-case";
import { UserRepository } from "./repository/user.repository";

export async function bootstrapModule(hono: Hono) {
  console.log("boostrapping user module...");

  const repo = await UserRepository.build();
  const useCase = new CreateUserUseCase(repo);
  const controller = new CreateUserController(useCase);

  hono.post("/users/new", async (c) => {
    const body = await c.req.json();
    const { httpStatusCode, ...result } = await controller.invoke(body);
    return c.json(result, httpStatusCode);
  });
  hono.get("/", (c: Context) =>
    c.text("Hello! Send a POST request to /users/new !")
  );
}
