// ai.js
import { API_CONFIG } from './config.js';
export async function getAiGreeting(treeHeight) {
    const API_KEY = API_CONFIG.OPENROUTER_KEY; // Сюда вставь свой ключ
    
    const prompt = `Поздравь пользователя с новым годом и пожелай ему что-нибудь хорошее. Одно предложение без маркдаунов. Без упоминания года. Разрешается использовать специальные символы и японские эмодзи. НЕ разрешается использовать эмодзи.`;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'xiaomi/mimo-v2-flash:free',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "ОШИБКА: NO_RESPONSE_FROM_AI (╯°□°）╯";
    } catch (error) {
        console.error("ОШИБКА ЗАПРОСА К AI:", error);
        return "[CONNECTION_FAILED] (╥﹏╥)";
    }
}