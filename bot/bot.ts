import { Bot } from 'grammy'

if (Bun.env.BOT_TOKEN === undefined) throw new Error('BOT_TOKEN must be provided!');

export const bot = new Bot(Bun.env.BOT_TOKEN)
