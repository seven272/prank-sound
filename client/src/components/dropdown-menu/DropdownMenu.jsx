import { useSelector } from 'react-redux'
import { Dropdown, Space } from 'antd'
import { BiSolidPlaylist } from 'react-icons/bi'
import { MdMusicNote } from 'react-icons/md'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './DropdownMenu.module.css'

const DropdownMenu = () => {
  const routeNavigator = useRouteNavigator()

  const { categories } = useSelector((state) => state.category)

  const handleMenuClick = (payload) => {
    const { key } = payload
    const categories = ['fart', 'burp', 'sneez', 'snore', 'cough']

    if (categories.includes(key)) {
      // Используем replace, чтобы не плодить историю при переходах между категориями
      routeNavigator.replace(`/category/${key}`)
    } else {
      routeNavigator.push('/')
    }
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
      marginRight: '5px',
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
