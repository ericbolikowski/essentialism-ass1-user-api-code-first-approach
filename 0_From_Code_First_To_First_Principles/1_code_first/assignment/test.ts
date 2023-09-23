// import express from "express";
// import { User } from "./user";
// import { UserRouter } from "./user-router";
// import { UserService } from "./user-service";
// import { UserController } from "./user-controller";
// import { UserRepository } from "./user-repository";

// const app = express();
// const port = 3000;

// /**
//  * Make UserRepository, pass it to ...
//  * 3 x User Use cases, pass them to ...
//  * User Controller, configure them with the router
//  *
//  */

// const userRepo = new UserRepository();
// const userServ = new UserService(userRepo);
// const userCtrl = new UserController(userServ);
// const userRtr = new UserRouter(userCtrl);

// // Generate code for the UserRouter

// app.use(express.json());
// app.use(userRtr.router);

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// // Create a MikroORM model file for a User Entity that has the following properties:
// // id, number, primary key, auto-incremented
// // email, string, unique
// // username, string, unique
// // firstName, string
// // lastName, string
// // password, string, initiated with random string
