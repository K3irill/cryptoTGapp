import { REQUEST_LINK } from '../../constant'

  export const handleReferral = async (referralCode: string) => {
    try {
      const response = await fetch(`${REQUEST_LINK}/ref/${referralCode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: window.Telegram.WebApp.initDataUnsafe.user?.id,
          username:
            window.Telegram.WebApp.initDataUnsafe.user?.username ||
            window.Telegram.WebApp.initDataUnsafe.user?.first_name ||
            window.Telegram.WebApp.initDataUnsafe.user?.id,
          firstName: window.Telegram.WebApp.initDataUnsafe.user?.first_name,
          lastName: window.Telegram.WebApp.initDataUnsafe.user?.last_name,
        }),
      });

      const result = await response.json();
    } catch (error) {
      console.error('Ошибка при обработке реферальной ссылки:', error);
    }
  };