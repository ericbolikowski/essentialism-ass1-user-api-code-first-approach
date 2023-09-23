export default {
  entities: ["./dist/src/modules/user/entities/"],
  entitiesTs: ["./src/modules/user/entities/"],
  type: "postgresql",
  clientUrl: process.env.DATABASE_URL,
};
