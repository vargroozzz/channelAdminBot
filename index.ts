import {serverOptions} from "./server/serverOptions.ts";

const server = Bun.serve(serverOptions);

// deploy to github pages
// https://www.youtube.com/watch?v=X0TFqqDYOrA