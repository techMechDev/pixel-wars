import { CHANNELS } from "./constants.ts";
import { BOARDGAME, COLORS_NAMES, KEYS} from './constants.ts'
import { Grid, Color } from "./types.ts";

const db = await Deno.openKv();

export const getGrid = async (): Promise<Grid> => {
    const tiles = new Array(BOARDGAME).fill(COLORS_NAMES.green);
    const versionstamps = new Array(BOARDGAME).fill('');
    const pixels = db.list<string>({ prefix: [KEYS.tiles] });

    for await (const pixel of pixels) {
        const index = pixel.key[1] as number;
        tiles[index] = pixel.value;
        versionstamps[index] = pixel.versionstamp;
    }

    return { tiles, versionstamps }
}

export async function updateGrid(
    index: number,
    color: Color,
): Promise<string> {
    const { versionstamp } = await db.set([KEYS.tiles, index], color);

    const bc = new BroadcastChannel(CHANNELS.PIXEL_UPDATE);
    bc.postMessage({ index, color, versionstamp });
    setTimeout(() => bc.close(), 5);

    return versionstamp;
}