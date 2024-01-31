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
		...shorthands.margin('0.5rem'),
		boxShadow: '0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.5)',
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