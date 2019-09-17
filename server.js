require("dotenv").config();
const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    message: String
  }
`);

const root = {
  message: () => "Hello World!"
};

const app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log("Express GraphQL Server listening on Port 4000")
);
