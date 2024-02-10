import { RemoveIcon, BackToWindowIcon, FullScreenIcon, ChromeCloseIcon } from '@fluentui/react-icons-mdl2';
import { Trans } from 'react-i18next';
import { Window } from '@/backend-command/window';

export const Titlebar = () => {
  return (
    <div data-tauri-drag-region id="titlebar">
      <div style={{ marginRight: 'auto', marginLeft: '1rem', lineHeight: '2rem', fontSize: '1rem' }}>
        <div>
          <Trans>title</Trans>
        </div>
      </div>
      <div className="titlebar-button" id="titlebar-minimize" onClick={Window.minimize}>
				<RemoveIcon />
      </div>
      <div className="titlebar-button" id="titlebar-restore" onClick={Window.unmaximize} >
				<BackToWindowIcon />
      </div>
      <div className="titlebar-button" id="titlebar-maximize" onClick={Window.maximize} >
				<FullScreenIcon />
      </div>
      <div className="titlebar-button" id="titlebar-close" onClick={Window.close} >
				<ChromeCloseIcon />
      </div>
    </div>
  );
};
