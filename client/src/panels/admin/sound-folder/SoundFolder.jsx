import { Panel } from '@vkontakte/vkui'
import { useSelector } from 'react-redux'

import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import ButtonsAdmin from '../../../components/buttons-admin/ButtonsAdmin'
import SoundList from './sound-list/SoundList'
import Error403 from '../../../components/error-403/Error403'

const SoundFolder = ({ id }) => {
  const { user } = useSelector((state) => state.auth)

  if (!user || !user.isAdmin) {
    return (
      <Panel id={id}>
        <Header />
        <Error403 />
        <Footer />
      </Panel>
    )
  }
  
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
