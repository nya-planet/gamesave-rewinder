import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Library } from '@/app/library/Library';
import { Settings } from '@/app/settings/Settings';
import { GameInfo } from '@/app/gameInfo/GameInfo';

export const LibraryRoute = '/library';
export const SettingsRoute = '/settings';
const _GameInfoRoute = '/gameInfo';
export const GameInfoRoute = (id: string) => `${_GameInfoRoute}/${id}`;

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={LibraryRoute} />},
  { path: LibraryRoute, element: <Library />,  },
  { path: SettingsRoute, element: <Settings /> },
  { path: GameInfoRoute(':gameId'), element: <GameInfo /> },
]);