/* eslint-disable no-unused-vars */
import React from 'react'
import { View } from '@vkontakte/vkui'

import Main from '../panels/main/Main'
import Category from '../panels/category/Category'
import Admin from '../panels/admin/Admin'
import SoundItem from '../panels/admin/sound-folder/sound-item/SoundItem'
import SoundFolder from '../panels/admin/sound-folder/SoundFolder'
import CategoryFolder from '../panels/admin/category-folder/CategoryFolder'
import AuthPage from '../panels/auth-page/AuthPage'
import Statistic from '../panels/admin/statistic/Statistic'
const MainView = ({ activePanel, id }) => {
  return (
    <>
      <View id={id} activePanel={activePanel}>
        <Main id="main_panel" />
        <Category id="category_panel" />
        <Admin id="admin_panel" />
        <AuthPage id="auth_panel" />
        <SoundFolder id="admin_sounds_panel" />
        <CategoryFolder id="admin_categories_panel" />
        <SoundItem id="admin_sound_item_panel" />
        <Statistic id="admin_statistic_panel" />
      </View>
    </>
  )
}

export default MainView
