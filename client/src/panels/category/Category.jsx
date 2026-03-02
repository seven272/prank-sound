import { Panel } from '@vkontakte/vkui'
import { useParams } from '@vkontakte/vk-mini-apps-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


import styles from './Category.module.css'
import SoundCard from './sound-card/SoundCard'
import SoundCarousel from './sound-carousel/SoundCarousel'
import Dashboard from './dashboard/Dashboard'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Loader from '../../UI/loader/Loader'
import LockedSound from './locked-sound/LockedSound'
import { fetchGetCategorySounds } from '../../redux/slices/soundSlice'

const Category = ({ id }) => {
  const { alias } = useParams()
  const dispatch = useDispatch()
  
  const { categorySounds, currentSound } = useSelector(
    (state) => state.sound,
  )
 

  const { vk_id, isPaid } = useSelector((state) => state.vkUser)
  const [soundDisable, setSoundDisable] = useState(true)

  useEffect(() => {
    if (alias) {
      dispatch(fetchGetCategorySounds(alias))
    }
  }, [alias, dispatch])

  useEffect(() => {
    if (currentSound.isFree === true) {
      setSoundDisable(false)
    } else if (currentSound.isFree === false && vk_id === '') {
      setSoundDisable(true)
    } else if (
      currentSound.isFree === false &&
      vk_id !== '' &&
      isPaid === false
    ) {
      setSoundDisable(true)
    } else if (
      currentSound.isFree === false &&
      vk_id !== '' &&
      isPaid === true
    ) {
      setSoundDisable(false)
    }
  }, [currentSound, vk_id, isPaid])

 

  if (categorySounds.length === 0) {
    return <Loader />
  }

  return (
    <Panel id={id} key={alias}>
      <Header />
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <SoundCard />
          {soundDisable ? <LockedSound /> : <Dashboard />}

          <SoundCarousel arrSounds={categorySounds} />
        </div>
      </section>
      <Footer />
    </Panel>
  )
}

export default Category
