import { convertFileSrc } from '@tauri-apps/api/core';

import { useParams } from 'react-router-dom';
import {
  ToggleButton,
  Input,
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
// import { IChoiceGroupOption } from '@fluentui/react';
import { ModeSwitch, ViewMode } from '@/component/ModeSwitch';
import { useEffect, useState } from 'react';
import { SaveFileCard } from '@/component/SaveFileCard';
import { useGameLibraryStore, refresh } from '@/store/GameLibrary';

import './GameInfo.scss';
import { styled } from 'styled-components';

const saveMock: Array<GameSave> = new Array(10).fill(0).map((_, i) => ({
  gameId: `${i}`,
  time: `${i}`,
  screenshot:
    'https://steamuserimages-a.akamaihd.net/ugc/2268189945231885036/6AE600DAE368902DDDF0CC92C9D4DE1FC1F31E3B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
  description: `save-${i}`,
}));

const onBackClick = () => {
  router.navigate(-1);
  // const navigate = useNavigate();
  // navigate(-1);
  // console.log('onBackClick');
};

// const choiceGroupOptions: Array<IChoiceGroupOption> = [
//   { key: 'list', text: 'list', iconProps: { iconName: 'CalendarIcon' } },
//   { key: 'picture', text: 'picture', iconProps: { iconName: 'PictureCenter' } },
// ];

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
  const { gameId } = useParams<{ gameId: string }>();
  const [ viewMode, setViewMode ] = useState<ViewMode>('thumbnail');
  // const refresh = useGameLibraryStore(state => state.refresh);
  const gameLibrary = useGameLibraryStore(state => state.gameLibrary);
  console.log(gameId, gameLibrary);
  const game = gameLibrary.find((g) => g.id === gameId) || DefaultGame();
  
  useEffect(() => {
    const re = async () => {
      await refresh();
      console.log('GameInfo useEffect');
    };

    re();
  }, []);

  return (
    <div id="gr-gameinfo">
      <div id="gr-gameinfo-header">
        <div id='gr-gameinfo-info'>
          <Button style={{ minWidth: '2rem', height: '2rem' }} onClick={onBackClick} shape='square'>
            <BackIcon />
          </Button>
          <img src={convertFileSrc(game.header === null ? 'null' : game.header )} alt={game.name} style={{ height: '43px', width: '92px' }} />
          <span style={{ fontSize: '2rem' }} >{game.name}</span>
        </div>
        <div id="gr-gameinfo-toolbar">
          <Input></Input>
          <ModeSwitch
            defaultMode={viewMode}
            onModeChange={setViewMode}
          />
        </div>
      </div>
      <div id="gr-gameinfo-content">
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
          <div id="save-container">
            {saveMock.map((s) => <SaveFileCard key={s.gameId} className={"save-file-card"} gameSave={s} />)}
          </div>
        }
      </div>
    </div>
  );
};
