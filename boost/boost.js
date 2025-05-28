const axios = require('axios');


class TelegramNotifier {
  constructor(botToken, chatId) {
    this.botToken = botToken;
    this.chatId = chatId;
    this.apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
  }

  async sendMessage(text) {
    try {
      await axios.post(this.apiUrl, {
        chat_id: this.chatId,
        text: text,
        parse_mode: 'HTML'
      });
    } catch (error) {
      console.error('Telegram send error:', error.message);
    }
  }
}


class SocialMediaBooster {
  constructor(apiToken, channelLink, posts, telegramBotToken, telegramChatId) {
    this.apiToken = apiToken;
    this.channelLink = channelLink;
    this.posts = posts;
    this.isRunning = false;
    this.taskInterval = null;
    this.apiUrl = 'https://easyliker.ru/api';
    this.notifier = new TelegramNotifier(telegramBotToken, telegramChatId);
  }

  // Генерация случайного числа
  getRandomCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Задержка для правдоподобия
  async randomDelay() {
    const delay = this.getRandomCount(1000, 5000);
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Общий метод для API запросов
  async makeApiRequest(method, params = {}) {
    try {
      const requestData = {
        api_token: this.apiToken,
        method: method,
        version: 2.0,
        ...params
      };

      const response = await axios.post(this.apiUrl, requestData, {
        headers: { 'Content-Type': 'application/json' }
      });

      return response.data;
    } catch (error) {
      console.error(`API Error in ${method}:`, error.response?.data || error.message);
      throw error;
    }
  }

  // Проверка баланса
  async checkBalance() {
    return this.makeApiRequest('getBalance');
  }

  // Получение списка сервисов
  async getServices() {
    return this.makeApiRequest('getServices');
  }

  // Создание задачи на накрутку
  async createTask(website, type, quality, link, count) {
    return this.makeApiRequest('createTask', {
      website,
      type,
      quality,
      link,
      count
    });
  }

  // Добавление просмотров к посту
  async boostPostViews(postLink) {
    await this.randomDelay();
    const viewsCount = this.getRandomCount(10, 30);
    
    try {
      const result = await this.createTask(
        'telegram', // или другая соцсеть
        'post_views',
        'emergency_Medium', // качество
        postLink,
        viewsCount.toString()
      );
      
      console.log(`[post_views] Added ${viewsCount} views to ${postLink}`);
      return result;
    } catch (error) {
      console.error('Failed to boost views:', error);
      return null;
    }
  }

  // Добавление подписчиков
  async boostSubscribers() {
    await this.randomDelay();
    const subsCount = this.getRandomCount(10, 18);
    
    try {
      const result = await this.createTask(
        'telegram', // или другая соцсеть
        'subs',
        'real_low_quality', // качество
        this.channelLink,
        subsCount.toString()
      );
      
      console.log(`[Subs] Added ${subsCount} subscribers`);
      return result;
    } catch (error) {
      console.error('Failed to boost subscribers:', error);
      return null;
    }
  }

// Основной цикл задач с уведомлениями
async runTasks() {
  if (!this.isRunning) return;
  // const services = await this.getServices()
  // console.log(services.response.telegram.post_views)
  let reportMessage = '<b>🔹 Начало нового цикла накрутки</b>\n';
  
  try {
    // 1. Проверка баланса
    const balance = await this.checkBalance();
    const balanceValue = balance?.response || 0;
    reportMessage += `💰 Баланс: <b>${balanceValue.toFixed(2)} RUB</b>\n\n`;

    // 2. Добавление подписчиков
    reportMessage += '<b>👥 Подписчики:</b>\n';
    const subsResult = await this.boostSubscribers();
    if (subsResult?.response?.[0]) {
      const task = subsResult.response[0];
      reportMessage += `▪️ Задача <a href="https://easyliker.ru/task/${task.id}">#${task.id}</a>\n`;
      reportMessage += `▪️ Статус: ${task.status}\n`;
      reportMessage += `▪️ Заказано: ${task.count}\n`;
      reportMessage += `▪️ Выполнено: ${task.done || 0}\n`;
      reportMessage += `▪️ Стоимость: ${task.sum.toFixed(2)} RUB\n\n`;
    } else {
      reportMessage += '❌ Не удалось создать задачу\n\n';
    }

    // 3. Добавление просмотров
    reportMessage += '<b>👀 Просмотры постов:</b>\n';
    let totalViewsOrdered = 0;
    let totalViewsDone = 0;
    let totalCost = 0;

    for (const post of this.posts) {
      try {
        const viewsResult = await this.boostPostViews(post);
        if (viewsResult?.response?.[0]) {
          const task = viewsResult.response[0];
          reportMessage += `▪️ <a href="${post}">Пост</a>: `;
          reportMessage += `${task.done || 0}/${task.count} (${task.sum.toFixed(2)} RUB)\n`;
          
          totalViewsOrdered += parseInt(task.count);
          totalViewsDone += parseInt(task.done || 0);
          totalCost += parseFloat(task.sum);
          
          await this.randomDelay();
        }
      } catch (postError) {
        reportMessage += `▪️ Ошибка для поста ${post}: ${postError.message}\n`;
      }
    }

    // 4. Итоговая статистика
    reportMessage += `\n<b>📊 Итого за цикл:</b>\n`;
    reportMessage += `▪️ Всего просмотров: ${totalViewsDone}/${totalViewsOrdered}\n`;
    reportMessage += `▪️ Общая стоимость: ${totalCost.toFixed(2)} RUB\n`;
    reportMessage += `▪️ Новый баланс: <b>${(balanceValue - totalCost).toFixed(2)} RUB</b>\n\n`;
    reportMessage += `⏳ Следующий цикл через 60 минут`;

  } catch (error) {
    reportMessage += `\n❌ <b>Критическая ошибка:</b> ${error.message}`;
    console.error('Critical error:', error);
  }

  // Отправляем отчет в Telegram
  await this.notifier.sendMessage(reportMessage);
  console.log('--- Boosting cycle completed ---');
}


  // Запуск автоматического выполнения
  start(intervalMinutes = 60) {
    if (this.isRunning) {
      console.log('Booster is already running');
      return;
    }

    this.isRunning = true;
    console.log('Starting social media booster...');

    // Запускаем сразу первую итерацию
    this.runTasks();

    // Затем каждые N минут (по умолчанию 60)
    this.taskInterval = setInterval(
      () => this.runTasks(),
      intervalMinutes * 60 * 1000
    );
  }

  // Остановка
  stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    clearInterval(this.taskInterval);
    console.log('Booster stopped');
  }
}

// использование
(async () => {
  const API_TOKEN = 'd5X9729gT0eVsjB9fR6t216Y6j1T6WmN';
  const CHANNEL_LINK = 'https://t.me/BIFScryptoSpace';
  const POST_LINKS = [
    'https://t.me/BIFScryptoSpace/3',
    'https://t.me/BIFScryptoSpace/4',
    'https://t.me/BIFScryptoSpace/5',
    'https://t.me/BIFScryptoSpace/6',
    'https://t.me/BIFScryptoSpace/8',
    'https://t.me/BIFScryptoSpace/9',
    'https://t.me/BIFScryptoSpace/11',
    'https://t.me/BIFScryptoSpace/14',
    'https://t.me/BIFScryptoSpace/16'
  ];

  // Настройки Telegram бота
  const TELEGRAM_BOT_TOKEN = '7704706584:AAHZ7lX43e2ugEInh7ZsEPfb9xIP66r7pbE'; 
  const TELEGRAM_CHAT_ID = '1112303359'; 

  const booster = new SocialMediaBooster(
    API_TOKEN,
    CHANNEL_LINK,
    POST_LINKS,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID
  );

  booster.start(60);
})();