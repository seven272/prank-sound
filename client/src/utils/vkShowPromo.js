import bridge from '@vkontakte/vk-bridge'

const showPromo = () => {
  bridge
    .send('VKWebAppShowBannerAd', {
      banner_location: 'bottom',
      layout_type: 'resize',// экран игры или мини-приложения станет меньше на размер баннера.
      height_type: 'compact',//баннер с уменьшенной высотой
      // banner_width: '650',
      // banner_height: '70',
      // banner_align: 'center',
      // orientation: 'horizontal',
     
    })
    .then((data) => {
      if (data.result) {
        // Баннерная реклама отобразилась
        console.log('Показывается реклама')
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error)
      console.log('Ошибка при показе рекламы')
    })
}

export { showPromo }
