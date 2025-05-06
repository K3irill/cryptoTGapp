const bot = require('./config/telegramConfig');
const {
  getUserByTelegramId,
  createUser,
  updateUserTokens,
  enableMiningForUser,
  checkAndAddPugoDaily,
  addTransaction,
} = require('./services/userService');
const { getUserTasks } = require('./services/taskService');
const { defineMiningAwardByStatus, formattedUsername } = require('./utils/utils');
const { products, autominingProducts } = require('./storeContent');
const { getLocalizedText, getLocalizedButtons } = require('./localization');

const YOUR_CHAT_IDES = [
  process.env.MY_CHATID,
  process.env.BRO_CHATID,
  process.env.SECOND_ACC_CHATID,
];

// Вспомогательная функция для форматирования времени
function formatRemainingTime(expiryDate, lang) {
  if (!expiryDate) return getLocalizedText(lang, 'common.unknown');

  const now = new Date();
  const expiry = new Date(expiryDate);
  const diff = expiry.getTime() - now.getTime();

  if (diff <= 0) return getLocalizedText(lang, 'mining.expired');

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return getLocalizedText(lang, 'mining.remainingFormat', { days, hours, minutes });
}

module.exports = bot => {
  // Обработка данных из веб-приложения
  bot.on('web_app_data', async msg => {
    const chatId = msg.chat.id;
    const user = await getUserByTelegramId(msg.from.id);
    const lang = user?.lang || 'en';
    
    const command = msg.web_app_data.data;
    if (command === '/automining') {
      bot.sendMessage(chatId, getLocalizedText(lang, 'webApp.autominingActivated'));
    }

    const data = JSON.parse(msg.web_app_data.data);
    if (data.text) {
      bot.sendMessage(chatId, getLocalizedText(lang, 'webApp.messageReceived', { text: data.text }));
    }
  });

  // Команда /start
  bot.onText(/\/start/, async msg => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    const username = msg.from.username || null;

    try {
      let user = await getUserByTelegramId(telegramId);
      const lang = user?.lang || 'en';

      if (!user) {
        // Показываем выбор языка для нового пользователя
        const languageOptions = {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🪆 Русский', callback_data: 'set_language_ru' },
                { text: '🌐 English', callback_data: 'set_language_en' }
              ],
              [
                { text: '🦜 Español', callback_data: 'set_language_es' },
                { text: '🐉 中文', callback_data: 'set_language_cn' }
              ],
              [
                { text: '🗼 Français', callback_data: 'set_language_fr' },
                { text: '🍪 Deutsch', callback_data: 'set_language_de' }
              ],
              [
                { text: '🍷 Português', callback_data: 'set_language_pt' },
                { text: '🌻 Українська', callback_data: 'set_language_ua' }
              ]
            ]
          }
        };
        
        return bot.sendMessage(
          chatId, 
          getLocalizedText('en', 'language.select'), 
          languageOptions
        );
      }

      const welcomeMessage = user.tokens === 0 ? 
        getLocalizedText(lang, 'start.welcomeNewUser') :
        getLocalizedText(lang, 'start.welcomeRegisteredUser', {
          username: formattedUsername(username, telegramId),
          balance: user.tokens ? getLocalizedText(lang, 'start.balance', { balance: user.tokens }) : ''
        });

      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: getLocalizedText(lang, 'start.buttons.moreInfo'),
                callback_data: 'more_info'
              },
              {
                text: getLocalizedText(lang, 'start.buttons.start'),
                url: 'https://t.me/BIFSCryptoBot/bifs'
              }
            ]
          ]
        }
      };

      if (!user) {
        user = await createUser(telegramId, username);
        bot.sendMessage(chatId, welcomeMessage, {
          parse_mode: 'HTML',
          reply_markup: options.reply_markup
        });
      } else {
        if (user.automining) {
          await checkAndAddPugoDaily(telegramId);
        }
        bot.sendMessage(chatId, welcomeMessage, {
          parse_mode: 'HTML',
          reply_markup: options.reply_markup
        });
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, getLocalizedText('en', 'common.error.registration'));
    }
  });

  // Команда /balance
  bot.onText(/\/balance/, async msg => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    
    try {
      const user = await getUserByTelegramId(telegramId);
      const lang = user?.lang || 'en';
      
      if (user?.tokens !== undefined) {
        const message = getLocalizedText(lang, 'balance.success', {
          username: formattedUsername(user.username, user.telegramId),
          balance: user.tokens
        });
        
        bot.sendMessage(chatId, message);
      } else {
        const message = getLocalizedText(lang, 'balance.error', {
          username: formattedUsername(user.username, user.telegramId)
        });
        
        bot.sendMessage(chatId, message);
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, getLocalizedText('en', 'common.error.general'));
    }
  });

  // Команда /earn
  bot.onText(/\/earn/, async msg => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    const image = 'https://i.postimg.cc/brBGYfRb/a6d977c2-f469-4c0c-8ea1-d98f704bbb62.jpg';
    const textPin = 'earnInfo';

    try {
        const user = await getUserByTelegramId(telegramId);
        const lang = user?.lang || 'en';
        const text = getLocalizedText(lang, `infoSections.${textPin}`);

        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: getLocalizedText(lang, 'common.buttons.back'),
                            callback_data: 'more_info'
                        }
                    ],
                    [
                        {
                            text: getLocalizedText(lang, 'infoSections.buttons.attachReport'),
                            callback_data: 'attach_report'
                        }
                    ]
                ]
            },
            parse_mode: 'HTML'  
        };

        bot.sendPhoto(chatId, image, {
            caption: text,
            ...options
        });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, getLocalizedText('en', 'common.error.general'));
    }
});



// Команда /lang
bot.onText(/\/lang/, async msg => {
  const chatId = msg.chat.id;
  const user = await getUserByTelegramId(msg.from.id);
  const lang = user?.lang || 'en';

  const languageOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🪆 Русский', callback_data: 'set_language_ru' },
          { text: '🌐 English', callback_data: 'set_language_en' }
        ],
        [
          { text: '🦜 Español', callback_data: 'set_language_es' },
          { text: '🐉 中文', callback_data: 'set_language_cn' }
        ],
        [
          { text: '🗼 Français', callback_data: 'set_language_fr' },
          { text: '🍪 Deutsch', callback_data: 'set_language_de' }
        ],
        [
          { text: '🍷 Português', callback_data: 'set_language_pt' },
          { text: '🌻 Українська', callback_data: 'set_language_ua' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, getLocalizedText(lang, 'lang.selectOption'), languageOptions);
});


  // Команда /mining
  bot.onText(/\/mining/, async msg => {
    const chatId = msg.chat.id;
    const user = await getUserByTelegramId(msg.from.id);
    const lang = user?.lang || 'en';
    
    const miningButtons = getLocalizedButtons(lang, 'mining');
    
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: miningButtons.remaining,
              callback_data: 'rest_mining'
            }
          ],
          [
            { 
              text: miningButtons.buy, 
              callback_data: 'automining' 
            }
          ]
        ]
      }
    };
    
    bot.sendMessage(chatId, getLocalizedText(lang, 'mining.selectOption'), options);
  });

  // Команда /invite
  bot.onText(/\/invite/, async msg => {
    const chatId = msg.chat.id;
    const user = await getUserByTelegramId(msg.from.id);
    const lang = user?.lang || 'en';
    
    const inviteButtons = getLocalizedButtons(lang, 'invite');
    
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: inviteButtons.myCode,
              callback_data: 'my_ref_code'
            }
          ],
          [
            {
              text: inviteButtons.myReferrals,
              callback_data: 'my_ref_people'
            }
          ]
        ]
      }
    };
    
    bot.sendMessage(chatId, getLocalizedText(lang, 'invite.menuTitle'), options);
  });

  // Команда /support
  bot.onText(/\/support/, async msg => {
    const chatId = msg.chat.id;
    const user = msg.from;
    const dbUser = await getUserByTelegramId(user.id);
    const lang = dbUser?.lang || 'en';

    try {
      const supportMessage = getLocalizedText(lang, 'support.message', {
        firstName: user.first_name ? `, ${user.first_name}` : '',
        userId: user.id || getLocalizedText(lang, 'common.unknown')
      });

      const buttons = getLocalizedButtons(lang, 'support');
      
      await bot.sendMessage(chatId, supportMessage, {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: buttons.contact,
                url: 'https://t.me/bifs_manager'
              },
              {
                text: getLocalizedText(lang, 'common.buttons.close'),
                callback_data: 'delete_message'
              }
            ]
          ]
        }
      });

      console.log(`User ${user.id} requested support`);
    } catch (error) {
      console.error('Error in /support command:', error);
      await bot.sendMessage(chatId, getLocalizedText(lang, 'support.error'));
    }
  });

  // Команда /help
  bot.onText(/\/help/, async msg => {
    const chatId = msg.chat.id;
    const user = await getUserByTelegramId(msg.from.id);
    const lang = user?.lang || 'en';
    
    const helpButtons = getLocalizedButtons(lang, 'help');
    
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: helpButtons.moreInfo,
              callback_data: 'more_info'
            }
          ],
          [
            {
              text: helpButtons.support,
              callback_data: 'support'
            }
          ]
          ,
          [
            {
              text: helpButtons.lang,
              callback_data: 'change_lang'
            }
          ]
        ]
      }
    };
    
    bot.sendMessage(chatId, getLocalizedText(lang, 'help.menu'), options);
  });

  // Команда /store
  bot.onText(/\/store/, async msg => {
    const chatId = msg.chat.id;
    const user = await getUserByTelegramId(msg.from.id);
    const lang = user?.lang || 'en';
    
    const storeButtons = getLocalizedButtons(lang, 'store');
    
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: storeButtons.goToStore,
              callback_data: 'pay'
            }
          ]
        ]
      }
    };

    bot.sendMessage(chatId, getLocalizedText(lang, 'store.welcome'), options);
  });

  // Обработка обычных сообщений
  bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    const username = msg.from.username || getLocalizedText('en', 'common.notSpecified');
    const text = msg.text || msg.caption || '';
    const document = msg.document;
    const photo = msg.photo;
    
    const user = await getUserByTelegramId(telegramId);
    const lang = user?.lang || 'en';

    const knownCommands = [
      '/start',
      '/help',
      '/balance',
      '/earn',
      '/invite',
      '/store',
      '/mining',
      '/lang'
    ];

    if (text.toLowerCase().startsWith('bif-отчет')) {
      const reportText = text.replace(/^bif-отчет\s*/i, '').trim();
      
      let fullReportText = getLocalizedText(lang, 'reports.reportText', {
        username,
        telegramId,
        chatId,
        date: new Date().toLocaleString(),
        text: reportText || getLocalizedText(lang, 'reports.noText')
      });

      const checkFileSize = async fileId => {
        const file = await bot.getFile(fileId);
        return file.file_size <= 15 * 1024 * 1024;
      };

      let documentLink = '';
      if (document) {
        const fileId = document.file_id;
        const isValidSize = await checkFileSize(fileId);

        if (isValidSize) {
          const fileLink = await bot.getFileLink(fileId);
          documentLink = getLocalizedText(lang, 'reports.documentLink', { link: fileLink });
        } else {
          bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.reportTooLarge'));
          return;
        }
      }

      let photoLink = '';
      if (photo) {
        const fileId = photo[photo.length - 1].file_id;
        const isValidSize = await checkFileSize(fileId);

        if (isValidSize) {
          const fileLink = await bot.getFileLink(fileId);
          photoLink = getLocalizedText(lang, 'reports.photoLink', { link: fileLink });
        } else {
          bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.reportTooLarge'));
          return;
        }
      }

      if (documentLink || photoLink) {
        fullReportText += `\n\n${documentLink}\n\n${photoLink}`;
      }

      YOUR_CHAT_IDES.forEach(chatId => {
        bot.sendMessage(chatId, fullReportText)
          .then(() => console.log(`Report sent to chatId: ${chatId}`))
          .catch(error => console.error(`Error sending report to chatId: ${chatId}`, error));
      });

      bot.sendMessage(chatId, getLocalizedText(lang, 'reports.success'));
    } else if (!knownCommands.includes(text.toLowerCase())) {
      bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.unknownCommand'));
    }
  });

  // Обработка callback_query
  bot.on('callback_query', async query => {
    const chatId = query.message.chat.id;
    const user = await getUserByTelegramId(query.from.id);
    const lang = user?.lang || 'en';
    
    // Удаление сообщения
    if (query.data === 'delete_message') {
      try {
        await bot.deleteMessage(chatId, query.message.message_id);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
      return;
    }

    // Прикрепление отчета
    if (query.data === 'attach_report') {
      bot.sendMessage(chatId, getLocalizedText(lang, 'reports.instructions'));
      return;
    }

    // Магазин
    if (query.data === 'pay') {
      const storeButtons = getLocalizedButtons(lang, 'store');
      
      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: storeButtons.tokens, callback_data: 'tokens' },
              { text: storeButtons.automining, callback_data: 'automining' }
            ],
            [
              {
                text: getLocalizedText(lang, 'common.buttons.back'),
                callback_data: 'more_info'
              }
            ]
          ]
        }
      };

      const welcomeImageUrl = 'https://i.postimg.cc/qv7mZsN5/a8e6e245-3e60-4a46-8325-30b14cc50bf7.jpg';

      bot.sendPhoto(chatId, welcomeImageUrl, {
        caption: getLocalizedText(lang, 'store.menu'),
        parse_mode: 'HTML',
        reply_markup: options.reply_markup
      });
      return;
    }

    // Покупка токенов
    if (query.data.startsWith('buy_')) {
      const productKey = query.data.split('_')[1];
      const product = products[productKey];

      if (product) {
        bot.sendInvoice(
          chatId,
          getLocalizedText(lang, 'payments.purchase', { product: `${product.pugo} PUGO` }),
          product.description,
          `pugos_${product.stars}_${product.pugo}`,
          `${process.env.PROVIDER_TOKEN}`,
          'XTR',
          [
            {
              amount: product.stars,
              label: getLocalizedText(lang, 'payments.buy', { amount: product.pugo, product: 'PUGO' })
            }
          ],
          {
            flexible: true,
            photo_url: 'https://i.postimg.cc/KcBsK7k6/f4e44cae-b3d4-4dde-bbf1-67330296d6b8-1.png',
            photo_width: 400,
            photo_height: 400
          }
        );
      }
      return;
    }

    // Покупка автомайнинга
    if (query.data.startsWith('mining_')) {
      const productKey = query.data.split('_')[1];
      const product = autominingProducts[productKey];

      if (product) {
        bot.sendInvoice(
          chatId,
          getLocalizedText(lang, 'payments.purchase', { product: `${product.days} дней автомайнинга` }),
          product.description,
          `automining_${product.stars}_${product.days}`,
          `${process.env.PROVIDER_TOKEN}`,
          'XTR',
          [
            {
              amount: product.stars,
              label: getLocalizedText(lang, 'payments.buy', { amount: product.days, product: 'дней' })
            }
          ],
          {
            flexible: true,
            photo_url: 'https://i.postimg.cc/ZR3jdZR8/49978d67-848d-406a-83c5-335292717f6c.jpg',
            photo_width: 400,
            photo_height: 400
          }
        );
      }
      return;
    }

    // Выбор токенов
    if (query.data === 'tokens') {
      const productButtons = Object.keys(products).map(productKey => [
        {
          text: getLocalizedText(lang, 'payments.tokenOption', {
            amount: products[productKey].pugo,
            price: products[productKey].stars
          }),
          callback_data: `buy_${productKey}`
        }
      ]);

      const options = {
        reply_markup: {
          inline_keyboard: [
            ...productButtons,
            [
              {
                text: getLocalizedText(lang, 'common.buttons.back'),
                callback_data: 'more_info'
              }
            ]
          ]
        }
      };

      bot.sendMessage(chatId, getLocalizedText(lang, 'store.selectTokens'), options);
      return;
    }

    // Выбор дней автомайнинга
    if (query.data === 'automining') {
      const options = {
        reply_markup: {
          inline_keyboard: [
            ...Object.keys(autominingProducts).map(productKey => [
              {
                text: getLocalizedText(lang, 'payments.miningOption', {
                  days: autominingProducts[productKey].days,
                  price: autominingProducts[productKey].stars
                }),
                callback_data: `mining_${productKey}`
              }
            ])
          ]
        }
      };
      
      bot.sendMessage(chatId, getLocalizedText(lang, 'store.selectMiningDays'), options);
      return;
    }

    // Меню автомайнинга
    if (query.data === 'mining') {
      try {
        const userData = await getUserByTelegramId(query.from.id);
        const miningButtons = getLocalizedButtons(lang, 'mining');

        const miningStatus = userData?.automining
          ? getLocalizedText(lang, 'mining.activeStatus', {
              dailyReward: defineMiningAwardByStatus(userData.status),
              remainingTime: formatRemainingTime(userData.autominingExpiresAt, lang)
            })
          : getLocalizedText(lang, 'mining.inactiveStatus');

        const options = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: userData?.automining ? miningButtons.extend : miningButtons.activate,
                  callback_data: 'automining'
                }
              ],
              [
                {
                  text: miningButtons.howItWorks,
                  callback_data: 'mining_info'
                }
              ],
              [
                {
                  text: getLocalizedText(lang, 'common.buttons.back'),
                  callback_data: 'more_info'
                }
              ]
            ]
          },
          parse_mode: 'HTML'
        };

        await bot.sendMessage(
          chatId,
          `${getLocalizedText(lang, 'mining.menuTitle')}\n\n${miningStatus}\n\n${getLocalizedText(lang, 'common.selectAction')}`,
          options
        );

        console.log(`User ${query.from.id} opened mining menu`);
      } catch (error) {
        console.error('[Mining Menu Error]', error);
        await bot.sendMessage(
          chatId,
          getLocalizedText(lang, 'common.error.general'),
          {
            reply_to_message_id: query.message.message_id,
            disable_notification: true
          }
        );
      }
      return;
    }

    // Информация о майнинге
    if (query.data === 'mining_info') {
      await bot.editMessageText(getLocalizedText(lang, 'mining.howItWorks'), {
        chat_id: query.message.chat.id,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { 
                text: getLocalizedText(lang, 'mining.buttons.activate'), 
                callback_data: 'automining' 
              }
            ],
            [
              {
                text: getLocalizedText(lang, 'common.buttons.back'),
                callback_data: 'mining'
              }
            ]
          ]
        }
      });
      return;
    }

    if (query.data === 'change_lang') {
      await bot.editMessageText(getLocalizedText(lang, 'lang.info'), {
        chat_id: query.message.chat.id,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🪆 Русский', callback_data: 'set_language_ru' },
              { text: '🌐 English', callback_data: 'set_language_en' }
            ],
            [
              { text: '🦜 Español', callback_data: 'set_language_es' },
              { text: '🐉 中文', callback_data: 'set_language_cn' }
            ],
            [
              { text: '🗼 Français', callback_data: 'set_language_fr' },
              { text: '🍪 Deutsch', callback_data: 'set_language_de' }
            ],
            [
              { text: '🍷 Português', callback_data: 'set_language_pt' },
              { text: '🌻 Українська', callback_data: 'set_language_ua' }
            ]
          ]
        }
      });
      return;
    }




    if (query.data === 'support') {
        const chatId = query.message.chat.id;
        const userId = query.from.id;
        const firstName = query.from.first_name || 'Unknown';  
        const dbUser = await getUserByTelegramId(userId);

        const lang = dbUser?.lang || 'en';

        try {
          const supportMessage = getLocalizedText(lang, 'support.message', {
            firstName: firstName ? `, ${firstName}` : '',
            userId: userId || getLocalizedText(lang, 'common.unknown')
          });

          const buttons = getLocalizedButtons(lang, 'support');
          
          await bot.sendMessage(chatId, supportMessage, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: buttons.contact,
                    url: 'https://t.me/bifs_manager'
                  },
                  {
                    text: getLocalizedText(lang, 'common.buttons.close'),
                    callback_data: 'delete_message'
                  }
                ]
              ]
            }
          });

          console.log(`User ${dbUser.id} requested support`);
        } catch (error) {
          console.error('Error in /support command:', error);
          await bot.sendMessage(chatId, getLocalizedText(lang, 'support.error'));
      }
    }

    // Основное меню информации
    if (query.data === 'more_info') {
      const infoButtons = getLocalizedButtons(lang, 'moreInfo');
      
      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: infoButtons.howToStart,
                callback_data: 'how_to_start'
              }
            ],
            [
              {
                text: infoButtons.store,
                callback_data: 'pay'
              },
              {
                text: infoButtons.invite,
                callback_data: 'invite_info'
              }
            ],
            [
              {
                text: infoButtons.tasks,
                callback_data: 'tasks'
              },
              {
                text: infoButtons.mining,
                callback_data: 'mining'
              }
            ],
            [
              {
                text: infoButtons.earn,
                callback_data: 'ads_info'
              }
            ],
            [
              {
                text: infoButtons.getTokens,
                callback_data: 'tokens_info'
              },
              {
                text: infoButtons.tokensValue,
                callback_data: 'value_info'
              }
            ],
            [
              {
                text: infoButtons.goals,
                callback_data: 'goals_info'
              },
              {
                text: infoButtons.aboutBot,
                callback_data: 'bot_info'
              }
            ],
            [
              {
                text: infoButtons.commands,
                callback_data: 'commands'
              },
              {
                text: infoButtons.support,
                callback_data: 'support'
              }
            ],
            [
              {
                text: infoButtons.lang,
                callback_data: 'change_lang'
              }
            ],
            [
              {
                text: infoButtons.socials,
                callback_data: 'socials'
              }
            ]
          ]
        }
      };

      bot.sendMessage(chatId, getLocalizedText(lang, 'moreInfo.menu'), options);
      return;
    }

    // Разделы информации
    const infoSections = {
      'how_to_start': {
        image: 'https://i.postimg.cc/YqNKwzq2/c912d4a4-4baa-40ce-aae1-53bc15163b8c.jpg',
        textPin: 'howToStart',
        buttons: [
          {
            text: getLocalizedText(lang, 'common.buttons.back'),
            callback_data: 'more_info'
          },
          {
            text: getLocalizedText(lang, 'infoSections.buttons.startApp'),
            url: 'https://t.me/BIFSCryptoBot/bifs'
          }
        ]
      },
      'tokens_info': {
        image: 'https://i.postimg.cc/mktYywXY/ecaac154-ca2b-4793-b9d7-9142945b94d6.jpg',
        textPin: 'tokensInfo',
      },
      'value_info': {
        image: 'https://i.postimg.cc/9zHhYxmK/f7e51697-4623-4af7-9d26-2bf4fa7b1620.jpg',
        textPin: 'tokensValue',
      },
      'tasks': {
        image: 'https://i.postimg.cc/MTs0B4DZ/d43d5b0f-9edf-4f7e-a27d-1277068f5ddd.jpg',
        textPin: 'tasksInfo',
        buttons: [
          {
            text: getLocalizedText(lang, 'tasks.buttons.available'),
            callback_data: 'available_task'
          },
          {
            text: getLocalizedText(lang, 'tasks.buttons.completed'),
            callback_data: 'completed_task'
          },
          {
            text: getLocalizedText(lang, 'common.buttons.back'),
            callback_data: 'more_info'
          }
        ]
      },
      'invite_info': {
        image: 'https://i.postimg.cc/pr2Q5v86/6d794a94-4b25-4d3e-9145-81011089652c.jpg',
        textPin: 'inviteInfo',
        buttons: [
          {
            text: getLocalizedText(lang, 'invite.buttons.myCode'),
            callback_data: 'my_ref_code'
          },
          {
            text: getLocalizedText(lang, 'invite.buttons.myReferrals'),
            callback_data: 'my_ref_people'
          },
          {
            text: getLocalizedText(lang, 'common.buttons.back'),
            callback_data: 'more_info'
          }
        ]
      },
      'ads_info': {
        image: 'https://i.postimg.cc/brBGYfRb/a6d977c2-f469-4c0c-8ea1-d98f704bbb62.jpg',
        textPin: 'earnInfo',
        buttons: [
          {
            text: getLocalizedText(lang, 'common.buttons.back'),
            callback_data: 'more_info'
          },
          {
            text: getLocalizedText(lang, 'infoSections.buttons.attachReport'),
            callback_data: 'attach_report'
          }
        ]
      },
      'goals_info': {
        image: 'https://i.postimg.cc/k5QtJWCh/3.png',
        textPin: 'goals',
      },
      'bot_info': {
        image: 'https://i.postimg.cc/d3NS9vy4/0167d904-9aa7-4d73-aee9-6e7511a1a2c9-1.png',
   
        textPin: 'aboutBot',
      },
      'commands': {      textPin: 'commands',},
      'socials': {
        textPin: 'socials',
        buttons: [
          [
            {
              text: getLocalizedText(lang, 'socials.buttons.telegramChannel'),
              url: 'https://t.me/BIFScryptoSpace'
            },
            {
              text: getLocalizedText(lang, 'socials.buttons.website'),
              url: 'https://bifscoin.ru/'
            }
          ],
          [
            {
              text: getLocalizedText(lang, 'common.buttons.back'),
              callback_data: 'more_info'
            }
          ]
        ]
      }
    };

    if (infoSections[query.data]) {
      const section = infoSections[query.data]; 
  const textPin = section.textPin || '0';
  const text = getLocalizedText(lang, `infoSections.${textPin}`);
      
      if (section.image) {
        const options = {
          parse_mode: 'HTML',
          reply_markup: section.buttons ? {
            inline_keyboard: Array.isArray(section.buttons[0]) ? 
              section.buttons : 
              [section.buttons]
          } : {}
        };

        bot.sendPhoto(chatId, section.image, {
          caption: text,
          ...options
        });
      } else {
        const options = {
          
          parse_mode: 'HTML',
          reply_markup: section.buttons ? {
            inline_keyboard: Array.isArray(section.buttons[0]) ? 
              section.buttons : 
              [section.buttons]
          } : {}
        };

        bot.sendMessage(chatId, text, options);
      }
      return;
    }

    // Завершенные задания
    if (query.data === 'completed_task') {
      try {
        const user = await getUserByTelegramId(query.from.id);
        if (user) {
          const tasks = await getUserTasks(query.from.id);
          const completedTasks = tasks.filter(task => task.UserTask.status === 'completed');

          if (completedTasks.length > 0) {
            const tasksList = completedTasks
              .map((task, index) => 
                `${index + 1}. **${task.reward}**: ${task.description} [Ссылка](${task.link})`
              )
              .join('\n');

            bot.sendMessage(
              chatId,
              getLocalizedText(lang, 'tasks.completed', { tasks: tasksList }),
              {
                parse_mode: 'Markdown',
                reply_markup: {
                  inline_keyboard: [[
                    {
                      text: getLocalizedText(lang, 'common.buttons.back'),
                      callback_data: 'tasks'
                    }
                  ]]
                }
              }
            );
          } else {
            bot.sendMessage(
              chatId,
              getLocalizedText(lang, 'tasks.noneCompleted'),
              {
                reply_markup: {
                  inline_keyboard: [[
                    {
                      text: getLocalizedText(lang, 'common.buttons.back'),
                      callback_data: 'tasks'
                    }
                  ]]
                }
              }
            );
          }
        } else {
          bot.sendMessage(
            chatId,
            getLocalizedText(lang, 'common.error.referralCheck', {
              username: query.from.username
            })
          );
        }
      } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.general'));
      }
      return;
    }

    // Доступные задания
    if (query.data === 'available_task') {
      try {
        const user = await getUserByTelegramId(query.from.id);
        if (user) {
          const tasks = await getUserTasks(query.from.id);
          const availableTasks = tasks.filter(task => task.UserTask.status === 'available');

          if (availableTasks.length > 0) {
            const tasksList = availableTasks
              .map((task, index) => 
                `${index + 1}. **${task.reward}**: ${task.description} [Ссылка](${task.link})`
              )
              .join('\n');

            bot.sendMessage(
              chatId,
              getLocalizedText(lang, 'tasks.available', { tasks: tasksList }),
              {
                parse_mode: 'Markdown',
                reply_markup: {
                  inline_keyboard: [[
                    {
                      text: getLocalizedText(lang, 'common.buttons.back'),
                      callback_data: 'tasks'
                    }
                  ]]
                }
              }
            );
          } else {
            bot.sendMessage(
              chatId,
              getLocalizedText(lang, 'tasks.noneAvailable'),
              {
                reply_markup: {
                  inline_keyboard: [[
                    {
                      text: getLocalizedText(lang, 'common.buttons.back'),
                      callback_data: 'tasks'
                    }
                  ]]
                }
              }
            );
          }
        } else {
          bot.sendMessage(
            chatId,
            getLocalizedText(lang, 'common.error.referralCheck', {
              username: query.from.username
            })
          );
        }
      } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.general'));
      }
      return;
    }

    // Реферальный код
    if (query.data === 'my_ref_code') {
      try {
        const user = await getUserByTelegramId(query.from.id);
        if (user?.referralCode) {
          const botUsername = 'BIFSCryptoBot';
          const referralLink = `https://t.me/${botUsername}/bifs?startapp=${user.referralCode}`;
          
          bot.sendMessage(
            chatId,
            getLocalizedText(lang, 'invite.referralCode', {
              code: user.referralCode,
              link: referralLink
            })
          );
        } else {
          bot.sendMessage(
            chatId,
            getLocalizedText(lang, 'common.error.referralCheck', {
              username: formattedUsername(user.username, user.telegramId)
            })
          );
        }
      } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.general'));
      }
      return;
    }

    // Остаток майнинга
    if (query.data === 'rest_mining') {
      try {
        const user = await getUserByTelegramId(query.from.id);
        if (user?.autominingExpiresAt) {
          const now = new Date();
          const expiry = new Date(user.autominingExpiresAt);
          const diffTime = expiry.getTime() - now.getTime();

          if (diffTime <= 0) {
            bot.sendMessage(chatId, getLocalizedText(lang, 'mining.expired'));
          } else {
            const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

            const pluralize = (num, words) => {
              const cases = [2, 0, 1, 1, 1, 2];
              return words[
                num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]
              ];
            };

            const daysText = pluralize(days, ['день', 'дня', 'дней']);
            const hoursText = pluralize(hours, ['час', 'часа', 'часов']);
            const minutesText = pluralize(minutes, ['минута', 'минуты', 'минут']);

            const endDate = expiry.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            bot.sendMessage(
              chatId,
              getLocalizedText(lang, 'mining.remainingTime', {
                days,
                daysText,
                hours,
                hoursText,
                minutes,
                minutesText,
                endDate
              })
            );
          }
        } else {
          bot.sendMessage(
            chatId,
            getLocalizedText(lang, 'mining.notConnected', {
              username: user?.username || getLocalizedText(lang, 'common.user')
            })
          );
        }
      } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.miningCheck'));
      }
      return;
    }

       // Мои рефералы
      if (query.data === 'my_ref_people') {
        try {
          const user = await getUserByTelegramId(query.from.id);
  
          if (user?.referrals?.length > 0) {
            let referrals = [];
            for (let refId of user.referrals) {
              const refUser = await getUserByTelegramId(refId);
              referrals.push(refUser);
            }
  
            const referralNames = referrals.map(ref => '@' + ref.username).join(', ');
            bot.sendMessage(
              chatId,
              getLocalizedText(lang, 'invite.referralsList', {
                count: referrals.length,
                names: referralNames
              })
            );
          } else {
            bot.sendMessage(
              chatId,
              getLocalizedText(lang, 'invite.noReferrals', {
                username: user.username
              })
            );
          }
        } catch (error) {
          console.error(error);
          bot.sendMessage(chatId, getLocalizedText(lang, 'common.error.general'));
        }
        return;
      }
  
      // Установка языка
      if (query.data.startsWith('set_language_')) {
        const lang = query.data.split('_')[2];
        
        try {
          let user = await getUserByTelegramId(query.from.id);
          
          if (!user) {
            user = await createUser(query.from.id, query.from.username || null);
          }
          
          user.lang = lang;
          await user.save();
  
          // Отправляем подтверждение смены языка
          bot.answerCallbackQuery(query.id, { 
            text: getLocalizedText(lang, 'language.set')
          });
  
          // Отправляем приветственное сообщение на новом языке
          const welcomeMessage = getLocalizedText(lang, 'start.welcomeRegisteredUser', {
            username: formattedUsername(user.username, user.telegramId),
            balance: user.tokens ? getLocalizedText(lang, 'start.balance', { balance: user.tokens }) : ''
          });
  
          const options = {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: getLocalizedText(lang, 'start.buttons.moreInfo'),
                    callback_data: 'more_info'
                  },
                  {
                    text: getLocalizedText(lang, 'start.buttons.start'),
                    url: 'https://t.me/BIFSCryptoBot/bifs'
                  }
                ]
              ]
            },
            parse_mode: 'HTML'
          };
  
          await bot.editMessageText(welcomeMessage, {
            chat_id: chatId,
            message_id: query.message.message_id,
            parse_mode: 'HTML',
            reply_markup: options.reply_markup
          });
  
        } catch (error) {
          console.error('Error setting language:', error);
          bot.answerCallbackQuery(query.id, {
            text: getLocalizedText('en', 'common.error.general')
          });
        }
        return;
      }
  
      // Обработка предварительного чекаута
      bot.on('pre_checkout_query', async query => {
        const { id, currency, total_amount } = query;
        if (currency === 'XTR' && total_amount === 1) {
          bot.answerPreCheckoutQuery(id, true);
        } else {
          bot.answerPreCheckoutQuery(id, false, getLocalizedText('en', 'payments.invalidAmount'));
        }
      });
  
      // Успешный платеж
      bot.on('successful_payment', async msg => {
        const userId = msg.chat.id;
        const { total_amount, currency, invoice_payload: payload } = msg.successful_payment;
        const user = await getUserByTelegramId(userId);
        const lang = user?.lang || 'en';
        console.log({ total_amount, currency, payload });
  
        if (payload) {
          const [type, stars, value] = payload.split('_');
          console.log({ type, stars, value });
  
          if (type === 'pugos') {
            await updateUserTokens(userId, parseInt(value));
            await addTransaction(
              userId,
              parseInt(stars),
              getLocalizedText(lang, 'payments.tokensPurchase'),
              parseInt(value)
            );
  
            bot.sendMessage(
              userId,
              getLocalizedText(lang, 'payments.success', {
                amount: total_amount,
                currency,
                message: getLocalizedText(lang, 'payments.tokensPurchased', { amount: value })
              })
            );
          } else if (type === 'automining') {
            await enableMiningForUser(userId, parseInt(value));
            await addTransaction(
              userId,
              parseInt(stars),
              getLocalizedText(lang, 'payments.miningActivated', { days: value }),
              parseInt(value)
            );
  
            bot.sendMessage(
              userId,
              getLocalizedText(lang, 'payments.success', {
                amount: total_amount,
                currency,
                message: getLocalizedText(lang, 'payments.miningActivated', { days: value })
              })
            );
          }
        }
      })
    })
}
    