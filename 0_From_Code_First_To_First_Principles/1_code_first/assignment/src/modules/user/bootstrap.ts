import { Context, Hono } from "hono";
import { CreateUserController } from "./commands/use-cases/create-user/create-user.controller";
import { CreateUserUseCase } from "./commands/use-cases/create-user/create-user.use-case";
import { UserRepository } from "./repository/user.repository";
import { GetUserUseCase } from "./queries/use-cases/get-user/get-user.use-case";
import { GetUserController } from "./queries/use-cases/get-user/get-user.controller";

export async function bootstrapModule(hono: Hono) {
  console.log("boostrapping user module...");

  const repo = async () => UserRepository.build();
  const createUserUseCase = new CreateUserUseCase(repo);
  const createUserController = new CreateUserController(createUserUseCase);

  const getUserUseCase = new GetUserUseCase(repo);
  const getUserController = new GetUserController(getUserUseCase);

  hono.post("/users/new", async (c) => {
    const body = await c.req.json();
    const { httpStatusCode, ...result } = await createUserController.invoke(
      body
    );
    return c.json(result, httpStatusCode);
  });
  hono.get("/users", async (c) => {
    const query = c.req.query();
    console.log(query);
    const { httpStatusCode, ...result } = await getUserController.invoke(query);
    return c.json(result, httpStatusCode);
  });
  hono.get("/", (c: Context) =>
    c.text("Hello! Send a POST request to /users/new !")
  );
}
