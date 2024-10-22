import { convertFileSrc } from '@tauri-apps/api/core';
import { GameInfoRoute, router } from '@/router/router';
import { Game } from '@/types/Game';
import styled from 'styled-components';

const onGameCardClick = (ev: React.MouseEvent<HTMLElement>, item: string): void => {
  ev?.preventDefault();
  router.navigate(GameInfoRoute(item));
};

const GameCardWrapper = styled.div<{ cover: string | null }>`
  --height: 13.5rem;
  --width: 9rem;

  height: var(--height);
  width: var(--width);
  margin: 0.5rem;
  box-shadow: 0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-image: ${props => props.cover ? `url("${convertFileSrc(props.cover)}")` : 'gray'};
  transition: height 0.5s, width 0.5s;
  &:hover {
    height: calc(1.2 * var(--height));
    width: calc(1.2 * var(--width));
  }
`;

export const GameCard = ({
	game,
}: {
	game: Game;
}) => {
	return (
		<GameCardWrapper onClick={(ev) => onGameCardClick(ev, game.id)} cover={game.cover} >
			{/* <img src={convertFileSrc(game.cover)} alt={game.name} /> */}
			{game.cover === null ? <div>{game.name}</div> : null}
		</GameCardWrapper>
	);
}