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
    console.log(key)
    routeNavigator.replace(`/category/${key}`)
    
    // switch (key) {
    //   case 'fart':
    //     routeNavigator.push(`/category/fart`)
    //     break
    //   case 'burp':
    //     routeNavigator.push(`/category/burp`)
    //     break
    //   case 'sneez':
    //     routeNavigator.push(`/category/sneez`)
    //     break
    //   case 'snore':
    //     routeNavigator.push(`/category/snore`)
    //     break
    //   case 'cough':
    //     routeNavigator.push(`/category/cough`)
    //     break
    //   default:
    //     routeNavigator.push(`/`)
    //     break
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
