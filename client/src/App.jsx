import { Root, SplitLayout } from '@vkontakte/vkui'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { useEffect } from 'react'

import MainView from './views/MainView'
import { showPromo } from './utils/vkShowPromo'

const App = () => {
  const { panel, view } = useActiveVkuiLocation()

  useEffect(() => {
    showPromo()
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
