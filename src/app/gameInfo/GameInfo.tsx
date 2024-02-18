import { useParams } from 'react-router-dom';
import {
  ToggleButton,
  Input,
  makeStyles,
  shorthands,
  Button,
} from '@fluentui/react-components';
import {
  BackIcon,
  BulletedListIcon,
  PictureCenterIcon,
} from '@fluentui/react-icons-mdl2';

import { DefaultGame, Game } from '@/types/Game';
import { router } from '@/router/router';

import { SaveList } from '@/component/SaveList';
import { GameSave } from '@/types/GameSave';
import { IChoiceGroupOption } from '@fluentui/react';
import { ModeSwitch, ViewMode } from '@/component/ModeSwitch';
import { useState } from 'react';
import { SaveFileCard } from '@/component/SaveFileCard';

const mockData: Array<Game> = new Array(0);

const saveMock: Array<GameSave> = new Array(10).fill(0).map((_, i) => ({
  gameId: `${i}`,
  time: `${i}`,
  screenshot:
    'https://steamuserimages-a.akamaihd.net/ugc/2268189945231885036/6AE600DAE368902DDDF0CC92C9D4DE1FC1F31E3B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
  description: `save-${i}`,
}));

const gameInfoStyle = makeStyles({
  body: {
    height: '100%',
    width: '100%',
    // display: 'grid',
    gridTemplateRows: '2rem 1fr',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    // ...shorthands.flex(0, 0, 'rem'),
    flexDirection: 'column',
  },
  gameInfo: {
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.flex(0, 0, '3rem'),
    ...shorthands.padding(0, '1rem'),
  },
  toolbar: {
    backgroundColor: 'lightgrey',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.flex(0, 0, '3rem'),
    ...shorthands.padding(0, '1rem'),
    overflowY: 'auto',
  },
  ModeSwitch: {
    marginLeft: 'auto',
  },
  modeSwitchButton: {
    height: '2rem',
    minWidth: '2rem',
  },
  content: {
    ...shorthands.flex(0, 0, 'calc(100% - 6rem)'),
    height: 'calc(100% - 2rem)',
    width: '100%',
    // display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fill, 1fr)',
    overflowY: 'auto',
  },
  saveFileCardContainer: {
    boxSizing: 'border-box',
    ...shorthands.padding('1rem'),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
  },
  saveFileCard: {
    width: '10rem',
  },
});

const onBackClick = () => {
  router.navigate(-1);
  // const navigate = useNavigate();
  // navigate(-1);
  // console.log('onBackClick');
};

const choiceGroupOptions: Array<IChoiceGroupOption> = [
  { key: 'list', text: 'list', iconProps: { iconName: 'CalendarIcon' } },
  { key: 'picture', text: 'picture', iconProps: { iconName: 'PictureCenter' } },
];

const onChangeText = (
  ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  text?: string
) => {
  console.log(`filter onText ${text}`);
  // this.setState({ items: text ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems });
};

const isModalSelection = false;
const onChangeModalSelection = (
  ev: React.MouseEvent<HTMLElement>,
  checked?: boolean
) => {
  console.log(`onChangeModalSelection ${checked}`);
  // this.setState({ isModalSelection: checked });
};

export const GameInfo = () => {
  const className = gameInfoStyle();
  const { gameId } = useParams<{ gameId: string }>();
  const game = mockData.find((g) => g.id === gameId) || DefaultGame();
  const [ viewMode, setViewMode ] = useState<ViewMode>('thumbnail');

  return (
    <div id="gameinfo.body" className={className.body}>
      <div id="gameinfo.header" className={className.header}>
        <div className={className.gameInfo}>
          <Button style={{ minWidth: '2rem', height: '2rem' }} onClick={onBackClick} shape='square'>
            <BackIcon />
          </Button>
          <span>{game.name}</span>
        </div>
        <div id="fuck" className={className.toolbar}>
          <Input></Input>
          <ModeSwitch
            defaultMode={viewMode}
            className={className.ModeSwitch}
            buttonClassName={className.modeSwitchButton}
            onModeChange={setViewMode}
          />
        </div>
      </div>
      <div id="gameinfo.content" className={className.content}>
        { viewMode === 'list'
          ?
          <SaveList
            saveItems={saveMock}
            getKey={(item) => item.time}
            isModalSelection={isModalSelection}
            onChangeModalSelection={onChangeModalSelection}
            onChangeText={onChangeText}
          />
          :
          <div className={className.saveFileCardContainer}>
            {saveMock.map((s) => <SaveFileCard key={s.gameId} className={className.saveFileCard} gameSave={s} />)}
          </div>
        }
      </div>
    </div>
  );
};
