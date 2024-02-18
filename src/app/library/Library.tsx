import { Label, Input, makeStyles, shorthands } from "@fluentui/react-components";
import { SearchIcon } from "@fluentui/react-icons-mdl2";
import { GameCard } from "@/component/GameCard";
import { Game } from "@/types/Game";
import { useEffect, useState } from "react";
import { Steam } from "@/backend-command/command";

const libraryStyle = makeStyles({
	body: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		...shorthands.flex(0, 0, '2rem'),
		backgroundColor: 'grey',
	},
	content: {
		boxSizing: 'border-box',
		...shorthands.padding('1rem'),
		...shorthands.flex(0, 0, 'calc(100% - 2rem)'),
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
		overflowY: 'auto',
	},
});

export const Library = ({gameList = [] as Array<Game>, className = libraryStyle()}) => {
	const [_gameList, setGameList] = useState(gameList);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const a = async () => {
			const list = await Steam.library.list();
			setGameList(list.filter(game => game.name.toLowerCase().includes(filter.toLowerCase())));
		}

		a();
	}, [filter]);

	return (
		<div id="gr-library" className={className.body}>
			<div id="gr-library-header" className={className.header}>
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
			<div id="gr-library-content" className={className.content}>
				{_gameList.map(game => <GameCard key={game.id} game={game} />)}
			</div>
		</div>
	)
};