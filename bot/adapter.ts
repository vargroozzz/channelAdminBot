// @ts-ignore
import {FrameworkAdapter} from 'grammy/out/convenience/frameworks';

const SECRET_HEADER = "X-Telegram-Bot-Api-Secret-Token";

const WRONG_TOKEN_ERROR = "secret token is wrong";
const ok = () => new Response(null, { status: 200 });
const okJson = (json: string) =>
    new Response(json, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
const unauthorized = () =>
    new Response('"unauthorized"', {
        status: 401,
        statusText: WRONG_TOKEN_ERROR,
    });

export const bunAdapter: FrameworkAdapter = (req: Request) => {
    let resolveResponse: (res: Response) => void;
    return {
        update: req.json(),
        header: req.headers.get(SECRET_HEADER) || undefined,
        end: () => {
            if (resolveResponse) resolveResponse(ok());
        },
        respond: (json: string) => {
            if (resolveResponse) resolveResponse(okJson(json));
        },
        unauthorized: () => {
            if (resolveResponse) resolveResponse(unauthorized());
        },
        handlerReturn: new Promise((resolve) => {
            resolveResponse = resolve;
        }),
    };
};