//ai.js
// import { API_CONFIG } from './config.js'; 

export async function getAiGreeting(treeHeight) {
    let rawKey = '%%API_KEY%%';
    let finalKey = '';

    if (rawKey !== '%%' + 'API_KEY' + '%%') {
        finalKey = atob(rawKey);
    } 
    else if (typeof API_CONFIG !== 'undefined' && API_CONFIG.OPENROUTER_KEY) {
        finalKey = API_CONFIG.OPENROUTER_KEY;
    }
    else {
        const fallbackEncoded = 'WkdWM2JXVnpkR2x2Ym1S...'; 
        finalKey = atob(fallbackEncoded);
    }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}
let randnumber = getRandomInt(1, 4)

let prompt = ``

if (randnumber === 1) {
    prompt = `Пользователь создал елку на сайте, упомяни, какая она красивая. Затем поздравь пользователя с новым годом и пожелай ему что-нибудь хорошее. Одно предложение без маркдаунов. Без упоминания года. Разрешается использовать специальные символы и японские эмодзи.`;
}
if (randnumber === 2) {
    prompt = `Поздравь пользователя с новым годом и пожелай ему что-нибудь хорошее. Одно предложение без маркдаунов. Без упоминания года. Разрешается использовать специальные символы и японские эмодзи. НЕ разрешается использовать эмодзи.;`;
}
else if  (randnumber === 3){
    prompt = `Поздравь пользователя с новым годом в стиле киберпанка. Одно предложение, без года, без эмодзи, только символы.`;
}
else {
    prompt = `Краткое новогоднее пожелание программисту. Одно предложение. Без года. Можно использовать каомодзи.`;
}
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${finalKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'xiaomi/mimo-v2-flash:free',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "SYSTEM_ERROR (╯°□°）╯";
    } catch (error) {
        console.error("AI Error:", error);
        return "[CONNECTION_FAILED] (╥﹏╥)";
    }
}