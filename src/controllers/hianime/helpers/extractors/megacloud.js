import {client} from "../utils/client.js";
import {decrypt, extractVariables, getSecret} from "../utils/decrypt.js";

class Megacloud {
    constructor(videoUrl) {
        this.megacloud = {
            script: "https://megacloud.tv/js/player/a/prod/e1-player.min.js?v=",
            host: "https://megacloud.tv",
        };
        this.videoUrl = videoUrl;
    }

    async scrapeMegaCloud() {
        const res = await client(
            `${this.megacloud.host}/embed-2/ajax/e-1/getSources?id=${
                this.videoUrl.split("/").pop()?.split("?")[0]
            }`,
            {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    referer: `${this.megacloud.host}/embed-2/e-1/${this.videoUrl
                        .split("/")
                        .pop()}&autoPlay=1&oa=0&asi=1`,
                },
            }
        );

        let sourceData = {
            intro: res.data.intro,
            outro: res.data.outro,
            sources: [],
            tracks: res.data.tracks,
            server: res.data.server,
        };

        const scriptText = await client(
            this.megacloud.script.concat(String(Date.now()))
        );

        if (!scriptText)
            throw new Error("Unable to fetch script text to get vars !");

        const vars = extractVariables(scriptText.data, "MEGACLOUD");
        const {secret, encryptedSource} = getSecret(res.data.sources, vars);
        const value = decrypt(encryptedSource, secret);
        const files = JSON.parse(value);
        files.map((s) => {
            sourceData.sources.push({
                url: s.file,
                type: s.type,
                isM3U8: s.file.includes(".m3u8"),
            });
        });
        return sourceData;
    }
}

export {Megacloud};
