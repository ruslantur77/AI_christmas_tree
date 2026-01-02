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

    const prompt = `Поздравь пользователя с новым годом и пожелай ему что-нибудь хорошее. Одно предложение без маркдаунов. Без упоминания года. Разрешается использовать специальные символы и японские эмодзи. НЕ разрешается использовать эмодзи.`;

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