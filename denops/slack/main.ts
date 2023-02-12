import { Denops, ensureString, execute, SlackAPI } from "./deps.ts";
import { getBuildOption } from "./helper.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async echo(text: unknown): Promise<unknown> {
      ensureString(text);
      return await Promise.resolve(text);
    },
    // slackに投稿する
    async post(text: unknown): Promise<unknown> {
      const option = await getBuildOption(denops);
      const client = SlackAPI(option.token);
      console.log(option);
      ensureString(text);
      const res = await client.chat.postMessage({
        text,
        channel: option.channel,
      });
      return res.ok;
    },
  };

  await execute(
    denops,
    `command! -nargs=1 HelloWorldEcho echomsg denops#request('${denops.name}', 'echo', [<q-args>])`,
  );
  await execute(
    denops,
    `command! -nargs=1 Slack echomsg denops#request('${denops.name}', 'post', [<q-args>])`,
  );
}
