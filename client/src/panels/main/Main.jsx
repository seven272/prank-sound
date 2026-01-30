import { Panel } from '@vkontakte/vkui'

import styles from './Main.module.css'
import CategoriesList from './categories-list/CategoriesList'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
const Main = ({ id }) => {
  return (
    <Panel id={id}>
      <Header />
      <div className={styles.section_main}>
        <CategoriesList />
      </div>
      <Footer />
    </Panel>
  )
}

export default Main
