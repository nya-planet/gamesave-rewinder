import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from '@fluentui/react-components';

import { DownloadIcon, DeleteIcon } from '@fluentui/react-icons-mdl2';

import { GameSave } from '@/types/GameSave';

export const SaveFileCard = ({
  className,
  gameSave,
}: {
  className: string;
  gameSave: GameSave;
}) => {
  return (
    <Card className={className}>
      <CardPreview>
        <img
          src={gameSave.screenshot}
          alt="Preview of a Word document: About Us - Overview"
        />
      </CardPreview>

      <CardFooter>
        <div>{gameSave.description}</div>
        <Button
          shape={'square'}
          appearance="primary"
          icon={<DownloadIcon />}
        ></Button>
        <Button shape={'square'} icon={<DownloadIcon />}></Button>
        <Button shape={'square'} icon={<DeleteIcon />}></Button>
      </CardFooter>
    </Card>
  );
};
