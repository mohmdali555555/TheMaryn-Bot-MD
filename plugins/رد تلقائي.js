let handler = m => m;

handler.all = async function (m) {
    let chat = global.db.data.chats[m.chat];
    let responses;
    
    if (/^السلام عليكم+/i.test(m.text)) {
        responses = ['وعليكم السلام ورحمة الله وبركاته'];
    } else if (/^سكس|انيك|بنيك|كسمك|قحبه|كسختك|طيز|زب|كسك|كس|شهوه|شهوة|طيزمك|فيديو$/i.test(m.text)) {
        responses = ['*ههههههههههههههههههههههههههههههه*','انيك عارك كذا بلطجهه هههههه🤣','ما تبطل انحراف يا فتال','بركب طيزك يبن الكلب ليه تنحرف يلحجي','تخيل اصرعك اير بين العيون وانا مسخى عليك اخاف تموت يفتال','توب يزنوه',];
    } else if (/^ضع النص$/i.test(m.text)) {
        responses = ['ضع الرد'];
    } else if (/^ضع النص$/i.test(m.text)) {
        responses = ['ضع الرد'];
    }

    if (responses) {
        let randomIndex = Math.floor(Math.random() * responses.length);
        conn.reply(m.chat, responses[randomIndex], m);
    }

    return !0;
};

export default handler;
