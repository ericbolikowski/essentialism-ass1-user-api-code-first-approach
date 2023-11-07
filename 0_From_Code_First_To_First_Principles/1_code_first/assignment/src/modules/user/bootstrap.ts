import { Context, Hono } from "hono";
import { CreateUserController } from "./commands/use-cases/create-user/create-user.controller";
import { CreateUserUseCase } from "./commands/use-cases/create-user/create-user.use-case";
import { UserRepository } from "./repository/user.repository";
import { GetUserUseCase } from "./queries/use-cases/get-user/get-user.use-case";
import { GetUserController } from "./queries/use-cases/get-user/get-user.controller";
import { EditUserUseCase } from "./commands/use-cases/edit-user/edit-user.use-case";
import { EditUserController } from "./commands/use-cases/edit-user/edit-user.controller";
import { log } from "console";

export async function bootstrapModule(hono: Hono) {
  console.log("boostrapping user module...");

  const repo = async () => UserRepository.build();

  const createUserUseCase = new CreateUserUseCase(repo);
  const createUserController = new CreateUserController(createUserUseCase);

  const getUserUseCase = new GetUserUseCase(repo);
  const getUserController = new GetUserController(getUserUseCase);

  const editUserUseCase = new EditUserUseCase(repo);
  const editUserController = new EditUserController(editUserUseCase);

  hono.post("/users/new", async (c) => {
    const body = await c.req.json();
    const { httpStatusCode, ...result } = await createUserController.invoke(
      body
    );
    return c.json(result, httpStatusCode);
  });
  hono.get("/users", async (c) => {
    const query = c.req.query();
    const { httpStatusCode, ...result } = await getUserController.invoke(query);
    return c.json(result, httpStatusCode);
  });
  hono.post("/users/edit/:userId", async (c) => {
    const queryAndBody = { id: c.req.param("userId"), ...(await c.req.json()) };
    const { httpStatusCode, ...result } = await editUserController.invoke(
      queryAndBody
    );
    return c.json(result, httpStatusCode);
  });
  hono.get("/", (c: Context) =>
    c.text("Hello! Send a POST request to /users/new !")
  );
}
