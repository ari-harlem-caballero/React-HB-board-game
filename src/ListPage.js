import { useState, useEffect } from 'react';
import { getGames } from './services/fetch-utils';
import Game from './Game';

export default function ListPage() {
  // you'll need some state to hold onto the array of games
  const [gamesArr, setGamesArr] = useState([]);
  // fetch the games on load and inject them into state
  useEffect(() => {
    async function fetch() {
      const data = await getGames();

      setGamesArr(data);
    }

    fetch();
  }, []);

  return (
    <div className='list games'>
      {/* map through the games in state and render Game components */}
      {
        gamesArr.map((game, i) =>
          <Game key={game.title + i}
            game={game} />
        )}
    </div>
  );
}
