import { useState } from 'react';
import { Button, FluentProvider, webLightTheme, makeStyles } from '@fluentui/react-components';
import { Nav, INavLinkGroup, INavLink } from '@fluentui/react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/router/router';
import { Titlebar } from '@/component/Titlebar';

import './App.scss';

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
        name: 'Library',
        url: '/',
        // onClick: onLinkClick,
      },
      {
        name: 'Settings',
        url: '/settings',
        // onClick: onLinkClick,
      },
      {
        name: 'GameInfo',
        url: '/gameinfo',
      },
      {
        name: 'About',
        url: '/about',
      },
    ],
  },
];



export const App = ({
  theme = webLightTheme,
  className = containerInitStyle().provider,
  navGroups = navLinkGroups,
  grRouter = router,
}) => {
  return (
    <FluentProvider theme={theme} className={className}>
    <div id="gr-container">
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
    </div>
    </FluentProvider>
  );
}
