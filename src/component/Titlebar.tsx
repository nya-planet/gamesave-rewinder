import { RemoveIcon, BackToWindowIcon, FullScreenIcon, ChromeCloseIcon } from '@fluentui/react-icons-mdl2';
import { Trans } from 'react-i18next';
import { Window } from '@/backend-command/window';
import styled from 'styled-components';

const TitlebarWrapper = styled.div`
  height: 100%;
  min-height: 100%;
  background: rgb(196, 196, 196);
  user-select: none;
  display: flex;
  justify-content: flex-end;

  .title-text {
    margin-right: auto;
    margin-left: 1rem;
    line-height: 2rem;
    font-size: 1rem;
  }

  .titlebar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 2rem;
    color: #000000;
  }

  .titlebar-button:hover {
    background: #ffffff;
  }
`;

export const Titlebar = () => {
  return (
    <TitlebarWrapper data-tauri-drag-region id="titlebar">
      <div className="title-text">
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
    </TitlebarWrapper>
  );
};
