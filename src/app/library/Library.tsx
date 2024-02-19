import { Label, Input } from "@fluentui/react-components";
import { SearchIcon } from "@fluentui/react-icons-mdl2";
import { GameCard } from "@/component/GameCard";
import { Game } from "@/types/Game";
import { useEffect, useState } from "react";
import { Steam } from "@/backend-command/command";
import { useGameLibraryStore, refresh } from "@/store/GameLibrary";

import './Library.scss';

export const Library = () => {
	const [filter, setFilter] = useState('');
	const gameLibrary = useGameLibraryStore(state => state.gameLibrary);
	// const refresh = useGameLibraryStore(state => state.refresh);

	useEffect(() => {
		refresh();
	}, []);

	const library = gameLibrary.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()));
	
	return (
		<div id="gr-library">
			<div id="gr-library-header">
				<div>
					<Label>filter</Label>
					<Input
						value={filter}
						onChange={(_, value) => {
							console.log(value);
							setFilter(value.value);
						}}
						contentBefore={<SearchIcon aria-label="Enter by voice" />}
					/>
				</div>
			</div>
			<div id="gr-library-content">
				{library.map(game => <GameCard key={game.id} game={game} />)}
			</div>
		</div>
	)
};