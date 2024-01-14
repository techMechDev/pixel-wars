import { Game } from "../islands/Game.tsx";
import { getGrid } from '../shared/db.ts';

export default async function Home() {
  const { tiles } = await getGrid();
  return (
    <>
      <head>
        <title>pixel-wars</title>
      </head>
      <Game initialTiles={tiles}/>
    </>
  )
}
