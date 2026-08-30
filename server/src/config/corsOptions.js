//кратко
// const corsOptions = {
//   origin: ['http://localhost:5173', 'http://localhost:3000'],
//   optionsSuccessStatus: 200,
//   credentials: true,
// }

//развернуто
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://prank-sound.ru',
      'https://prank-sound.ru',
      'https://185.251.89.77',
      'http://185.251.89.77',
      'https://vk.com',
      'https://vk.ru',
      /vk\.com$/,
      /vk\.me$/,

    ]

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('CORS policy violation'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  optionsSuccessStatus: 200, //предоставляет статус-код для успешного разрешения запросов
  credentials: true, // Разрешает передачу cookies
}

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://prank-sound.ru',
      'https://prank-sound.ru',
      'https://185.251.89.77',
      'http://185.251.89.77',
      'http://185.251.89.77:3000', // Добавили порт, если фронт на нем
      'http://185.251.89.77:5173', // Стандартный порт Vite
      'http://185.251.89.77:3000', // Стандартный порт CRA
      'https://vk.com',
      'https://vk.ru',
      'http://backend', // Внутреннее имя контейнера бэкенда
      'http://backend:5000',
      'http://frontend', // Внутреннее имя контейнера фронтенда
    ]

    const allowedPatterns = [
      /vk\.com$/,
      /vk\.me$/,
      /\.vk\.com$/, // Поддомены vk.com
      /vk\.ru$/, // Сам домен vk.ru
      /\.vk\.ru$/, // Поддомены vk.ru (Критически важно!)
      /\.vkplay-apps\.ru$/, // Новые поддомены VK Play Apps (используются для хостинга мини-приложений)
    ]

    // 1. Разрешаем запросы без origin (например, мобильные приложения или curl)
    if (!origin) {
      return callback(null, true)
    }

    // 2. Проверяем прямое вхождение в список строк
    const isAllowedString = allowedOrigins.includes(origin)

    // 3. Проверяем соответствие регулярным выражениям
    const isAllowedPattern = allowedPatterns.some((pattern) =>
      pattern.test(origin),
    )

    if (isAllowedString || isAllowedPattern) {
      callback(null, true)
    } else {
      console.error(`CORS blocked for origin: ${origin}`) // для отладки
      callback(new Error('CORS policy violation'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'x-vk-user-id',
    'x-vk-app-id',
    'x-vk-sign',
    'x-vk-launch-params',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
}
export default corsOptions
