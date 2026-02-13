import React from 'react'
import { Dropdown, Space } from 'antd'
import { CaretRightOutlined, MenuOutlined } from '@ant-design/icons'
import { PiPlaylist } from "react-icons/pi";
import { MdMusicNote } from "react-icons/md";
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './DropdownMenu.module.css'

const DropdownMenu = () => {
  const routeNavigator = useRouteNavigator()

  const handleMenuClick = (payload) => {
    const { key } = payload
    if (key === 'main') {
      routeNavigator.push('/')
    } else if (key === 'admin') {
      routeNavigator.push('/admin')
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
      marginRight: '8px',
    },
    itemContent: {
      backgroundColor: 'transparent',
    },
  }

  const items = [
    {
      label: 'Главная', 
      key: 'main',
      icon: <MdMusicNote />,
    },
    {
      label: 'Админ',
      key: 'admin',
      icon: <CaretRightOutlined />,
    },
    {
      label: '404',
      key: '3',
      icon: <CaretRightOutlined />,
    },
  ]

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
        <PiPlaylist className={styles.icon} />
      </Space>
      {/* </> */}
    </Dropdown>
  )
}

export default DropdownMenu
