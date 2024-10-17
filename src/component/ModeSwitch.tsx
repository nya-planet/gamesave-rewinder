import { ToggleButton } from '@fluentui/react-components';
import {
  BulletedListIcon,
  PictureCenterIcon,
} from '@fluentui/react-icons-mdl2';
import { useState } from 'react';

export type ViewMode = 'list' | 'thumbnail';

export const ModeSwitch = ({
  onModeChange,
	defaultMode = 'thumbnail',
  className,
	buttonClassName,
}: {
  onModeChange: (mode: ViewMode) => void;
	defaultMode?: ViewMode;
  className?: string;
	buttonClassName?: string;
}) => {
  const [mode, setMode] = useState<ViewMode>(defaultMode);

  const Click = (mode: ViewMode) => {
    return () => {
      setMode(mode);
      onModeChange(mode);
    };
  };

  return (
    <div className={className} >
			<ToggleButton
				icon={<PictureCenterIcon />}
				className={buttonClassName}
				shape="square"
				onClick={Click('thumbnail')}
				checked={mode === 'thumbnail'}
				disabled={mode === 'thumbnail'}
			/>
      <ToggleButton
				icon={<BulletedListIcon />}
        className={buttonClassName}
        shape="square"
        onClick={Click('list')}
        checked={mode === 'list'}
				disabled={mode === 'list'}
      />
    </div>
  );
};
