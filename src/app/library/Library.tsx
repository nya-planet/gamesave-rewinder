import { Label, Input, makeStyles } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { GameCard } from "@/component/GameCard";

const mockData = new Array(10).fill(0);

const libraryStyle = makeStyles({
	library: {
		display: 'flex',
		flexWrap: 'wrap',
	},
});

export const Library = ({gameList = mockData, className = libraryStyle().library}) => (
	<div>
		<div>
			<div>
        <Label>filter</Label>
        <Input
          contentAfter={<SearchRegular aria-label="Enter by voice" />}
        />
      </div>
		</div>
		<div className={className}>
			{gameList.map((game, i) => <GameCard key={i} />)}
		</div>
	</div>
);