import bridge from "@vkontakte/vk-bridge";

//поделиться приложением
const shareApp = async (url) => {
   return await bridge.send('VKWebAppShare', {
        link: `${url}`
        })
        .then((data) => { 
          if (data.result) {
            // Запись размещена 
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
}
//пост в истории
const sharePostOnWall = async (text, url) => {
    return await bridge.send('VKWebAppShowWallPostBox', {
        message: `${text}`,
        attachments:  `${url}`
        })
        .then((data) => { 
          if (data.post_id) {
            // Запись размещена
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
}

//рекомендовать приложение друзьям 
const recommendApp = async () => {
  return await bridge.send('VKWebAppRecommend')
  .then((data) => { 
    if (data.result) {
      // Мини-приложение порекомендовано
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}

//добавить в избранное
const addFavoriteApp = async () => {
  return await bridge.send('VKWebAppAddToFavorites')
  .then((data) => { 
    if (data.result) {
      // Мини-приложение или игра добавлены в избранное
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}



export {shareApp, sharePostOnWall, recommendApp, addFavoriteApp}