import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bootstrapModule } from "./modules/user/bootstrap";

const app = new Hono();

bootstrapModule(app);

serve(app);
