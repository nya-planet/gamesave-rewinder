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

import { Game } from '@/types/Game';
const _saveColumns: Array<IColumn> = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column2',
    name: 'Value',
    fieldName: 'value',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
];

const getGameKey = (item: Game, index?: number) => {
  return item.id;
};

const gameSelection: ISelection<IObjectWithKey | Game> = new Selection<
  IObjectWithKey | Game
>({
  onSelectionChanged: () => {
    // setSelectedItems((_selection as ISelection<IDataType>).getSelection());
  },
  getKey: (item: Game) => {
    return item.id;
  },
});

const onItemInvoked = (item: Game, index?: number, ev?: Event) => {
  alert(`Item ${item.id} invoked`);
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

const _getSelectionDetails = (selection: ISelection<Game>): string => {
  const selectionCount = selection.getSelectedCount();

  switch (selectionCount) {
    case 0:
      return 'No items selected';
    case 1:
      return '1 item selected: ' + (selection.getSelection()[0] as Game).name;
    default:
      return `${selectionCount} items selected`;
  }
};

//ISelection<IObjectWithKey | Game> workaround
//https://github.com/microsoft/fluentui/issues/13411
//https://github.com/microsoft/fluentui/issues/19657

export const SaveList = ({
  saveItems = [],
  saveColumns = _saveColumns,
  getKey = getGameKey,
  selection = gameSelection,
  classNames = _classNames,
  isModalSelection = false,
  onChangeModalSelection = _onChangeModalSelection,
  onChangeText = _onChangeText,
  announcedMessage = '',
  getSelectionDetails = _getSelectionDetails,
}) => {
  const selectionDetails = getSelectionDetails(selection as ISelection<Game>);

  return (
    <div>
      <div className={classNames.controlWrapper}>
        <Toggle
          label="Enable modal selection"
          checked={isModalSelection}
          onChange={onChangeModalSelection}
          onText="Modal"
          offText="Normal"
          styles={controlStyles}
        />
        <TextField
          label="Filter by name:"
          onChange={onChangeText}
          styles={controlStyles}
        />
        <Announced
          message={`Number of items after filter applied: ${saveItems.length}.`}
        />
      </div>
      <div className={classNames.selectionDetails}>{selectionDetails}</div>
      <Announced message={selectionDetails} />
      {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
      {isModalSelection ? (
        <MarqueeSelection selection={selection as ISelection<IObjectWithKey>}>
          <DetailsList
            items={saveItems}
            columns={saveColumns}
            selectionMode={SelectionMode.multiple}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={selection as ISelection<IObjectWithKey>}
            selectionPreservedOnEmptyClick={true}
            // onItemInvoked={this._onItemInvoked}
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
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          // onItemInvoked={this._onItemInvoked}
        />
      )}
    </div>
  );
};
