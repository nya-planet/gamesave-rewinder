import { convertFileSrc } from '@tauri-apps/api/tauri';
import { GameInfoRoute, router } from '@/router/router';
import { Game } from '@/types/Game';
import { makeStyles, shorthands } from "@fluentui/react-components";

const onGameCardClick = (ev: React.MouseEvent<HTMLElement>, item: string): void => {
  ev?.preventDefault();
  router.navigate(GameInfoRoute(item));
};

const gameCardStyle = makeStyles({
	gamecard: {
		height: '13.5rem',
		width: '9rem',
		...shorthands.margin('0.5rem'),
		boxShadow: '0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.5)',
		backgroundSize: 'cover',
	},
});

export const GameCard = ({
	game,
	style = gameCardStyle().gamecard,
}: {
	game: Game;
	style?: string;
}) => {
	const coverStyle = game.cover ? {
		backgroundImage: `url("${convertFileSrc(game.cover)}")`,
	} : {};
	return (
		<div className={style} onClick={(ev) => onGameCardClick(ev, game.id)} style={coverStyle}>
			{/* <img src={convertFileSrc(game.cover)} alt={game.name} /> */}
			{game.cover === null ? <div>{game.name}</div> : null}
		</div>
	);
}