import { createBrowserRouter } from 'react-router-dom'
import App from '../pages/App'
import ErrorBoundary from '../pages/ErrorPage'
import Profile from '../pages/Profile'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Main from '../pages/Main'
import Game from '../pages/Game'
import LeaderBord from '../pages/LeaderBord'
import Forums from '../pages/Forum/Forums'
import Messages from '../pages/Forum/Messages'
import Topics from '../pages/Forum/Topics'
import Forum from '../pages/Forum'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'game',
            element: <Game />,
          },
          {
            path: 'leaderboard',
            element: <LeaderBord />,
          },
          {
            path: 'forum',
            element: <Forum />,
            children: [
              {
                index: true,
                element: <Forums />,
              },
              {
                path: ':forumId/topics',
                element: <Topics />,
              },
              {
                path: ':forumId/topics/:topicId/messages',
                element: <Messages />,
              },
            ],
          },
        ],
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
])

export default router
