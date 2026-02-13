import { useSelector } from 'react-redux'
import { Dropdown, Space } from 'antd'
import { BiSolidPlaylist } from 'react-icons/bi'
import { MdMusicNote } from 'react-icons/md'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './DropdownMenu.module.css'

const DropdownMenu = () => {
  const routeNavigator = useRouteNavigator()

  const { categories } = useSelector((state) => state.category)

  console.log('list categories: ', categories)

  const handleMenuClick = (payload) => {
    const { key } = payload
     routeNavigator.push(`/category/${key}`)
    // if (key === 'main') {
    //   routeNavigator.push('/')
    // } else if (key === 'admin') {
    //   routeNavigator.push('/admin')
    // } else {
    //   routeNavigator.push('/')
    // }
  }

  const objectStyles = {
    root: {
      backgroundColor: '#ffffff',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      // marginLeft: '50px',
    },
    item: {
      padding: '8px 12px',
      fontSize: '16px',
    },
    itemTitle: {
      fontWeight: '500',
    },
    itemIcon: {
      color: `#EC2578`,
      marginRight: '8px',
    },
    itemContent: {
      backgroundColor: 'transparent',
    },
  }

  const items = categories.map((category) => {
    return {
      label: category.title,
      key: category.alias,
      icon: <MdMusicNote />,
    }
  })

  // const items = [
  //   {
  //     label: 'Главная',
  //     key: 'main',
  //     icon: <MdMusicNote />,
  //   },
  //   {
  //     label: 'Админ',
  //     key: 'admin',
  //     icon: <MdMusicNote />,
  //   },
  //   {
  //     label: '404',
  //     key: '3',
  //     icon: <MdMusicNote />,
  //   },
  // ]

  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  return (
    <Dropdown
      menu={menuProps}
      className={styles.menu}
      styles={objectStyles}
    >
      {/* <> */}
      <Space align="center" orientation="horizontal">
        <BiSolidPlaylist className={styles.icon} />
      </Space>
      {/* </> */}
    </Dropdown>
  )
}

export default DropdownMenu
