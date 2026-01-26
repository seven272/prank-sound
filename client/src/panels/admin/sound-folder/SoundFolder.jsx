import { Panel } from '@vkontakte/vkui'

import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import ButtonsAdmin from '../../../components/buttons-admin/ButtonsAdmin'
import SoundList from './sound-list/SoundList'

const SoundFolder = ({ id }) => {
  return (
    <Panel id={id}>
      <Header />
      <ButtonsAdmin />
      <SoundList />

      <Footer />
    </Panel>
  )
}

export default SoundFolder
