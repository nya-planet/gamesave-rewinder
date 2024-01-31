import { RemoveIcon, BackToWindowIcon, FullScreenIcon, ChromeCloseIcon } from '@fluentui/react-icons-mdl2';

export const Titlebar = () => {
  return (
    <div data-tauri-drag-region id="titlebar">
      <div className="titlebar-button" id="titlebar-minimize">
				<RemoveIcon />
      </div>
      <div className="titlebar-button" id="titlebar-restore">
				<BackToWindowIcon />
      </div>
      <div className="titlebar-button" id="titlebar-maximize">
				<FullScreenIcon />
      </div>
      <div className="titlebar-button" id="titlebar-close">
				<ChromeCloseIcon />
      </div>
    </div>
  );
};
