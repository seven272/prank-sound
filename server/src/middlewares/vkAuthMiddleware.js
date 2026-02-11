import crypto from 'crypto'

// Middleware для проверки подписи VK
const vkAuthMiddleware = (req, res, next) => {
  const data = req.body
  const secretKey = process.env.VK_SECRET_KEY

  if (!data.sig) {
    return res.status(400).json({ error: 'Missing signature' })
  }

  // 1. Фильтруем параметры уведомления
  const filteredParams = Object.keys(data)
    .filter((key) => key.startsWith('notification_'))
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('')

  // 2. Считаем MD5
  const hash = crypto
    .createHash('md5')
    .update(filteredParams + secretKey)
    .digest('hex')

  // 3. Сверяем
  if (hash !== data.sig) {
    console.error('Критическая ошибка: Неверная подпись платежа!')
    return res.status(403).json({ error: 'Invalid signature' })
  }

  next() // Если всё ок, идем дальше
}

export default vkAuthMiddleware
