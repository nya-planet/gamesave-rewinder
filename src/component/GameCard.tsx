import { makeStyles, shorthands } from "@fluentui/react-components";

const gameCardStyle = makeStyles({
	gamecard: {
		height: '10rem',
		width: '10rem',
		// backgroundColor: 'grey',
		...shorthands.border('1px', 'solid', 'black'),
	},
});

export const GameCard = ({
	style = gameCardStyle().gamecard,
}) => {
	return (
		<div className={style}>
			GameCard
		</div>
	);
}