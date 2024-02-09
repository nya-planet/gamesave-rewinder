import { Label, Input, makeStyles, shorthands } from "@fluentui/react-components";
import { SearchIcon } from "@fluentui/react-icons-mdl2";
import { GameCard } from "@/component/GameCard";

const mockData = new Array(20).fill(0).map((_, i) => ({ id: `${i}`, name: `game-${i}` }));

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

export const Library = ({gameList = mockData, className = libraryStyle()}) => (
	<div id="gr-library" className={className.body}>
		<div id="gr-library-header" className={className.header}>
			<div>
        <Label>filter</Label>
        <Input
          contentBefore={<SearchIcon aria-label="Enter by voice" />}
        />
      </div>
		</div>
		<div id="gr-library-content" className={className.content}>
			{gameList.map(game => <GameCard key={game.id} gameId={game.id} />)}
		</div>
	</div>
);