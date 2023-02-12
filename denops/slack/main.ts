import { Denops, ensureString, execute, SlackAPI } from "./deps.ts";
import { getBuildOption } from "./helper.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    // slackに投稿する
    async post(text: unknown): Promise<unknown> {
      const option = await getBuildOption(denops);
      const client = SlackAPI(option.token);
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
    `command! -nargs=1 Slack echomsg denops#request('${denops.name}', 'post', [<q-args>])`,
  );
}
