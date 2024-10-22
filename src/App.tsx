import { useState } from 'react';
import { Button, FluentProvider, webLightTheme, makeStyles } from '@fluentui/react-components';
import { Nav, INavLinkGroup, INavLink } from '@fluentui/react';
import { RouterProvider } from 'react-router-dom';
import i18next from '@/i18n/i18n';
import styled from 'styled-components';

import { LibraryRoute, SettingsRoute, AboutRoute, router } from '@/router/router';
import { Titlebar } from '@/component/Titlebar';

import './init.scss';
import { Window } from '@/backend-command/window';
import { Steam } from '@/backend-command/command';

// const FluentProviderWrapper = styled(FluentProvider)`
//   height: 100%;
//   width: 100%;
// `;

const containerInitStyle = makeStyles({
  provider: {
    height: '100%',
    width: '100%',
  }
});

const onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
  ev?.preventDefault();
  router.navigate(item?.url || '/');
};

const navLinkGroups: Array<INavLinkGroup> = [
  {
    links: [
      {
        name: i18next.t('library'),
        url: LibraryRoute,
      },
      {
        name: i18next.t('settings'),
        url: SettingsRoute,
      },
      {
        name: i18next.t('about'),
        url: AboutRoute,
      },
    ],
  },
];

const GrContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  --gr-header-height: 32px;

  #gr-header {
    height: 100%;
    width: 100%;
    flex: 0 0 var(--gr-header-height);
    background-color: gray;
  }

  #gr-body {
    flex: 0 0 calc(100% - var(--gr-header-height));
    height: calc(100% - var(--gr-header-height));
    width: 100%;
    display: flex;

    #gr-left-sidebar {
      width: 100%;
      flex: 0 0 20%;
    }

    #gr-content {
      width: 100%;
      flex: 0 0 80%;
    }
  }
`;
export const App = ({
  theme = webLightTheme,
  className = containerInitStyle().provider,
  navGroups = navLinkGroups,
  grRouter = router,
}) => {
  return (
    <FluentProvider theme={theme} className={className}>
    <GrContainer id="gr-container">
      <div id="gr-header">
        <Titlebar />
      </div>
      <div id="gr-body">
        <div id="gr-left-sidebar">
          <Nav groups={navGroups} onLinkClick={onLinkClick}></Nav>
        </div>
        <div id="gr-content">
          <RouterProvider router={grRouter} />
        </div>
      </div>
    </GrContainer>
    </FluentProvider>
  );
}

// Window.minimize();