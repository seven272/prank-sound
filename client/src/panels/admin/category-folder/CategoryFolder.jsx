import { Panel } from '@vkontakte/vkui'

import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import ButtonsAdmin from '../../../components/buttons-admin/ButtonsAdmin'
import CategoryListAdmin from './category-list-admin/CategoryListAdmin'
import AddCategory from './add-category/AddCategory'

const CategoryFolder = ({ id }) => {
  return (
    <Panel id={id}>
      <Header />
      <ButtonsAdmin />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <CategoryListAdmin />
        <AddCategory />
      </div>
      <Footer />
    </Panel>
  )
}

export default CategoryFolder
