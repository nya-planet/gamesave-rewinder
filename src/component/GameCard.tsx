import { makeStyles } from "@fluentui/react-components";

const gameCardStyle = makeStyles({
	gamecard: {
		height: '10rem',
		width: '10rem',
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