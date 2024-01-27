import { GameInfoRoute, router } from '@/router/router';
import { makeStyles, shorthands } from "@fluentui/react-components";

const onGameCardClick = (ev: React.MouseEvent<HTMLElement>, item: string): void => {
  ev?.preventDefault();
  router.navigate(GameInfoRoute(item));
};

const gameCardStyle = makeStyles({
	gamecard: {
		height: '10rem',
		width: '10rem',
		// backgroundColor: 'grey',
		...shorthands.border('1px', 'solid', 'black'),
	},
});

export const GameCard = ({
	gameId,
	style = gameCardStyle().gamecard,
}: {
	gameId: string;
	style?: string;
}) => {
	return (
		<div className={style} onClick={(ev) => onGameCardClick(ev, gameId)}>
			GameCard
		</div>
	);
}