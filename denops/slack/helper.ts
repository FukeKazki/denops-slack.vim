import { Denops, vars } from "./deps.ts";

// options.luaでgに設定してるtoken等を取得する
export const getBuildOption = async (denops: Denops) => {
  const token = await vars.g.get<string>(
    denops,
    "slack_api_token",
    "",
  );
  const channel = await vars.g.get<string>(
    denops,
    "slack_channel",
    "",
  );
  // const token = await vars.environment.get(denops, "SLACK_API_TOKEN", "");
  // const channel = await vars.environment.get(denops, "SLACK_CHANNEL", "");
  return {
    token,
    channel,
  };
};

export const getMessage = async (
  denops: Denops,
  start: number,
  end: number,
  text: string,
) => {
  if (text) {
    return {
      message: text,
      isPlane: true,
    };
  }
  const message: string[] = [];
  for (const m of (await denops.call("getline", start, end)) as string[]) {
    message.push(m);
  }
  return {
    message: message.join("\n"),
    isPlane: false,
  };
};
