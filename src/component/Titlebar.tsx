import { RemoveIcon, BackToWindowIcon, FullScreenIcon, ChromeCloseIcon } from '@fluentui/react-icons-mdl2';
import { Trans } from 'react-i18next';

export const Titlebar = () => {
  return (
    <div data-tauri-drag-region id="titlebar">
      <div style={{ marginRight: 'auto', marginLeft: '1rem', lineHeight: '2rem', fontSize: '1rem' }}>
        <div>
          <Trans>title</Trans>
        </div>
      </div>
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
