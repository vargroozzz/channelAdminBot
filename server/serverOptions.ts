import {webhookCallback} from "grammy";
import {type Serve} from "bun";

import {bot} from "../bot/bot";

export const serverOptions = {
    port: 3000,
    fetch(request, server) {
        const url = new URL(request.url);
        if (url.pathname === "/webhook") {
            return webhookCallback(bot, 'std/http')(request)
        }
        return new Response("Not found", {status: 404})
    }
} satisfies Serve
