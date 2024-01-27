import { ArrowMaximize16Regular, Maximize20Regular, Add24Regular } from '@fluentui/react-icons';

export const Titlebar = () => {
  return (
    <div data-tauri-drag-region id="titlebar">
      <div className="titlebar-button" id="titlebar-minimize">
        <ArrowMaximize16Regular />
      </div>
      <div className="titlebar-button" id="titlebar-maximize">
        <Maximize20Regular />
      </div>
      <div className="titlebar-button" id="titlebar-close">
        <Add24Regular style={{ 'rotate': '45deg' }} />
      </div>
    </div>
  );
};
