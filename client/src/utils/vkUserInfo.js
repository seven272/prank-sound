import bridge from '@vkontakte/vk-bridge'

const getUserInfoVk = async () => {
    return await bridge.send('VKWebAppGetUserInfo')
        .then((data) => { 
         if (data.id) {
        // Данные пользователя получены
          console.log(data);      
        }
    })
        .catch((error) => {
         // Ошибка
     console.log(error);
     });
}
export {getUserInfoVk}