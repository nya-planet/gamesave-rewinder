import { useParams } from 'react-router-dom';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { BackIcon } from '@fluentui/react-icons-mdl2';

import { DefaultGame, Game } from '@/types/Game';
import { router } from '@/router/router';

import { SaveList } from '@/component/SaveList';

const mockData: Array<Game> = new Array(20)
  .fill(0)
  .map((_, i) => ({ ...DefaultGame(), id: `${i}`, name: `game-${i}` }));

const gameInfoStyle = makeStyles({
  body: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    backgroundColor: 'grey',
    ...shorthands.flex(0, 0, '2rem'),
  },
  content: {
    ...shorthands.flex(0, 0, 'calc(100% - 2rem)'),
    height: 'calc(100% - 2rem)',
    width: '100%',
  },
});

const _onBackClick = () => {
  router.navigate(-1);
  // const navigate = useNavigate();
  // navigate(-1);
  // console.log('onBackClick');
};

const GameInfoWrap = () => {
  const { gameId } = useParams<{ gameId: string }>();
  return (
    <_GameInfo game={mockData.find((g) => g.id === gameId) || DefaultGame()} />
  );
};

const _GameInfo = ({
  game,
  className = gameInfoStyle(),
  onBackClick = _onBackClick,
}: {
  game: Game;
  className?: ReturnType<typeof gameInfoStyle>;
  onBackClick?: () => void;
}) => {
  return (
    <div className={className.body}>
      <div className={className.header}>
        <div onClick={onBackClick}>
          <BackIcon />
        </div>
        <div>{game.name}</div>
      </div>
      <div className={className.content}>
        <div>GameInfo gameId: {game.id}</div>
        <SaveList />
      </div>
    </div>
  );
};

export const GameInfo = GameInfoWrap;
