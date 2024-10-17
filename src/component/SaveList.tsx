import {
  DetailsList,
  DetailsListLayoutMode,
  MarqueeSelection,
  Selection,
  SelectionMode,
  IColumn,
  Toggle,
  TextField,
  Announced,
  ISelection,
  mergeStyleSets,
  IObjectWithKey,
} from '@fluentui/react';

import { Input } from '@fluentui/react-components';

import i18next from '@/i18n/i18n';

import { GameSave } from '@/types/GameSave';
const _saveColumns: Array<IColumn> = [
  {
    key: 'time',
    name: i18next.t('save.time'),
    fieldName: 'time',
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
  },
  {
    key: 'description',
    name: i18next.t('save.description'),
    fieldName: 'description',
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
  },
];

const getGameKey = (item: GameSave, index?: number) => {
  return `${item.gameId}-${item.time}`;
};

const gameSelection: ISelection<IObjectWithKey | GameSave> = new Selection<
  IObjectWithKey | GameSave
>({
  onSelectionChanged: () => {
    // setSelectedItems((_selection as ISelection<IDataType>).getSelection());
  },
  getKey: getGameKey,
});

const _onItemInvoked = (item: GameSave, index?: number, ev?: Event) => {
  console.log(`Item ${item.gameId} ${item.time} invoked`);
};

const _onRenderRow = (props?: any, defaultRender?: any) => {
  console.log(props, defaultRender);
  return (
    defaultRender(props)
  );
};

const _classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
});

const controlStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};

const _onChangeModalSelection = (
  ev: React.MouseEvent<HTMLElement>,
  checked?: boolean
) => {
  console.log(`onChangeModalSelection ${checked}`);
  // this.setState({ isModalSelection: checked });
};

const _onChangeText = (
  ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  text?: string
) => {
  console.log(`filter onText ${text}`);
  // this.setState({ items: text ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems });
};

const _getSelectionDetails = (selection: ISelection<GameSave>): string => {
  const selectionCount = selection.getSelectedCount();

  switch (selectionCount) {
    case 0:
      return 'No items selected';
    case 1:
      return '1 item selected: ' + (selection.getSelection()[0] as GameSave).time;
    default:
      return `${selectionCount} items selected`;
  }
};

//ISelection<IObjectWithKey | Game> workaround
//https://github.com/microsoft/fluentui/issues/13411
//https://github.com/microsoft/fluentui/issues/19657

export const SaveList = ({
  saveItems = [] as Array<GameSave>,
  saveColumns = _saveColumns,
  getKey = getGameKey,
  selection = gameSelection,
  classNames = _classNames,
  isModalSelection = false,
  onChangeModalSelection = _onChangeModalSelection,
  onChangeText = _onChangeText,
  announcedMessage = '',
  getSelectionDetails = _getSelectionDetails,
  onItemInvoked = _onItemInvoked,
}) => {
  const selectionDetails = getSelectionDetails(selection as ISelection<GameSave>);

  return (
    <div>
      {isModalSelection ? (
        <MarqueeSelection selection={selection as ISelection<IObjectWithKey>}>
          <DetailsList
            items={saveItems}
            columns={saveColumns}
            selectionMode={SelectionMode.multiple}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            isHeaderVisible={true}
            selection={selection as ISelection<IObjectWithKey>}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={onItemInvoked}
            onRenderRow={_onRenderRow}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
        </MarqueeSelection>
      ) : (
        <DetailsList
          items={saveItems}
          columns={saveColumns}
          selectionMode={SelectionMode.none}
          getKey={getKey}
          setKey="none"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          isHeaderVisible={true}
          onItemInvoked={onItemInvoked}
          onRenderRow={_onRenderRow}
        />
      )}
    </div>
  );
};
