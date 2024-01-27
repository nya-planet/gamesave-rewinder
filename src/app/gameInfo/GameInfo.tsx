import { useParams } from "react-router-dom";

const GameInfoWrap = () => {
	const { gameId } = useParams<{ gameId: string }>();
	return <_GameInfo gameId={gameId || ''} />;
}

const _GameInfo = ({ gameId }: { gameId: string }) => {
		return (
			<div>
				GameInfo
				gameId: {gameId}
			</div>
		);
};

export const GameInfo = GameInfoWrap;