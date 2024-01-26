import { Label, Input, makeStyles, shorthands } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { GameCard } from "@/component/GameCard";

const mockData = new Array(9).fill(0);

const libraryStyle = makeStyles({
	body: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		backgroundColor: 'red',
		...shorthands.flex(0, 0, '2rem'),
	},
	content: {
		height: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		...shorthands.flex(0, 0, '90%'),
		overflowY: 'auto',
	},
});

export const Library = ({gameList = mockData, className = libraryStyle()}) => (
	<div id="gr-library" className={className.body}>
		<div className={className.header}>
			<div>
        <Label>filter</Label>
        <Input
          contentAfter={<SearchRegular aria-label="Enter by voice" />}
        />
      </div>
		</div>
		<div className={className.content}>
			{gameList.map((game, i) => <GameCard key={i} />)}
		</div>
	</div>
);