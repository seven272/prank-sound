import { Panel } from '@vkontakte/vkui'
import { useSelector } from 'react-redux'

import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import ButtonsAdmin from '../../../components/buttons-admin/ButtonsAdmin'
import CategoryListAdmin from './category-list-admin/CategoryListAdmin'
import AddCategory from './add-category/AddCategory'
import Error403 from '../../../components/error-403/Error403'

const CategoryFolder = ({ id }) => {
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
