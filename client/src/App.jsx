import { Root, SplitLayout } from '@vkontakte/vkui'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { useEffect } from 'react'

import MainView from './views/MainView'
import { showPromo } from './utils/vkShowPromo'
import { showOnboarding } from './utils/onboarding'
import { useVkUser } from './utils/useVkUser'

const App = () => {
  const { panel, view } = useActiveVkuiLocation()
  const { getUserInfo } = useVkUser()

  useEffect(() => {
    showOnboarding()
    showPromo()
    getUserInfo()
  }, [])

  return (
    <SplitLayout>
      <Root activeView={view}>
        <MainView id="main_view" activePanel={panel} />
      </Root>
    </SplitLayout>
  )
}

export default App
