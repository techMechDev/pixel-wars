import { type Handlers } from 'https://deno.land/x/fresh@1.6.1/server.ts';
import { updateGrid } from '../../shared/db.ts';
import { BOARDGAME, COLORS } from '../../shared/constants.ts';

export const handler: Handlers = {
    async POST(request) {
        const { index, color } = await request.json();

        if (typeof index !== 'number') {
            return Response.json({ error: 'index must be a number'}, { status: 400})
        }

        if ( index < 0 || index >= BOARDGAME ) {
            return Response.json({ error: 'index out of bounds' }, { status: 400 })
        }

        if ( !COLORS.includes(color) ) {
            return Response.json({ error: 'invalid color'}, { status: 400})
        }

        const versionstamp = await updateGrid(index, color);
        return Response.json({ versionstamp });
    }
}