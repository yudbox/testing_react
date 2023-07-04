import { rest } from "msw";
import { setupServer } from "msw/node";

// const config = {
//   path: "/api/repositories",
//   medhod: "get",
//   res: (req, res, ctx) => {
//     return {
//       items: [{}, {}],
//     };
//   },
// };

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.medhod || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}
