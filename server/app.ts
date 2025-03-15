import type { Config, Context } from "@netlify/functions";
import { createRequestHandler, type SessionData } from "react-router";
import { getSession } from "../app/sessions.server";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_NETLIFY: string;
    session: SessionData;
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default async (request: Request, context: Context) => {
  const session = await getSession();
  return requestHandler(request, {
    VALUE_FROM_NETLIFY: "Hello from Netlify",
    session,
  });
};

export const config: Config = {
  path: "/*",
  preferStatic: true,
};
