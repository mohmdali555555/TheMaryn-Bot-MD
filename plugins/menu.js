import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'


let handler = async (m, { conn, usedPrefix, command }) => {
  let d = new Date(new Date() + 3600000)
  let locale = 'ar'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = moment().tz('Asia/Muscat').locale('ar').format('DD MMMM YYYY')
  //let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)

  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة البيانات`

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
  let user = global.db.data.users[who]
  let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
  let { min, xp, max } = xpRange(user.level, global.multiplier)
  let username = conn.getName(who)
  let math = max - xp
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(850)
  let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
// الوقت باليمن
  const time = moment.tz('Asia/Muscat').format('HH A')
  let wib = moment.tz('Asia/Muscat').format('hh:mm:ss A')
  
  let str = `
❆╼━━❆ •﹝📜﹞• ❆━━╾❆

*↵ اهلا بك/ي "${name}"*

『بـوت⤜الرعب الملكي』
المطور الاساسي الرعب الملكي(https://wa.me/967700244383)
استخدم البوت فيما يرضي الله ولا تنسو ان تدعو اخواننا في غزه😔💖
◈🕊╎(اهلا بكم ف بوت الرعب الملكي قبل استخدام اي امر اكتب (.) وملاحضه (بقية الاوامر لم اضيفها في قائمة الاوامر╎🕊◈
❋ ─━─⊰🍷⊱─━─ ❋
⌬⚔»┊اوامـر الـجـروبات』↯
❋ ─━─⊰🍷⊱─━─ ❋
↞〔ضـيـف〕↠
↞〔الاشباح〕↠
↞〔طـرد〕↠
↞〔مـنـشـني〕↠
↞〔تـرقـية〕↠
↞〔اعـفـاء〕↠
↞〔انـذار〕↠
↞〔حـذف - انـذار〕↠
↞〔حـذف〕↠
↞〔مـنـشـن〕↠
↞〔عـمـلات〕↠
↞〔مـخـفـي〕↠
↞〔المـشـرفـيـن〕↠
↞〔المـنـشـن〕↠
↞〔الـبـروفايـل〕↠
↞〔الـقـروب〕↠
↞〔دعـوة〕↠
↞〔رستر〕↠
↞〔لـفـل〕↠
↞〔التـرحـيـب〕↠
↞〔الـمـغادرة〕↠
↞〔فتـح القـروب〕↠
↞〔اغـلاق القـروب〕↠
↞〔خـط〕↠
↞〔تـوب〕↠
↞〔ليـنـك〕↠
↞〔يـومـي〕↠
↞〔الـمـاس〕↠
↞〔تـرتـيـب_البـنـك〕↠
↞〔شـراء〕↠
↞〔هـجـوم〕↠
↞〔فزوره〕↠
↞〔ابلاغ〕↠
↞〔سمسم〕↠
↞〔الملكي〕↠
❋ ─━─⊰🍷⊱─━─ ❋
ء⌬🕋»┊القـسـم الاسلامـي』↯*
↞〔سـورة〕↠
↞〔حـديـث〕↠
↞〔قـرآن〕↠
↞〔الله〕↠
↞〔آيـات〕↠
↞〔تلاوة〕↠
❋ ─━─⊰🍷⊱─━─ ❋
⌬🕹»┊قـسـم التـرفـيه』↯
↞〔اكـس او〕↠
↞〔كـت〕↠
↞〔صـراحـة〕↠
↞〔تحدي〕↠
↞〔ذكـاء〕↠
↞〔غـبـاء〕↠
↞〔جـمـال〕↠
↞〔سـيـارات〕↠
↞〔عين〕↠
↞〔الـحـب〕↠
↞〔لـو〕↠
↞〔هـل〕↠
↞〔رونـالـدو〕↠
↞〔مـيـسـي〕↠
↞〔احـرز〕↠
↞〔تـفـكيـك〕↠
↞〔ميـمـز〕↠
↞〔دمـج〕↠
↞〔زواج〕↠
↞〔طلاق〕↠
↞〔عرس〕↠
↞〔زوجني〕↠
↞〔طلقني〕↠
↞〔عيد〕↠
↞〔كيوت〕↠
↞〔اقتباس〕↠
↞〔عـلـم〕↠
↞〔تـاج〕↠
↞〔حـكـمة〕↠
↞〔ميـمـز〕↠
↞〔سـؤال〕↠
↞〔قط〕↠
↞〔بين〕↠
↞〔بجد〕↠
↞〔نسخ〕↠
↞〔انصح〕↠
↞〔شخصيه〕↠
↞〔كورة〕↠
↞〔اختصار〕↠
↞〔متفجرات〕↠
↞〔خروف〕↠
↞〔فحل〕↠
↞〔مخنوث〕↠
↞〔ملعون〕↠
↞〔لوطي〕↠
↞〔قتل〕↠
↞〔جريمة〕↠
↞〔اكتب-ملصق_باسمك-attp〕↠
❋ ─━─⊰🍷⊱─━─ ❋
⌬⏏»┊قـسـم التـنـزيـلات』↯
❋ ─━─⊰🍷⊱─━─ ❋
↞〔انـسـتغـرام〕↠
↞〔جوجـل〕↠
↞〔ويكيـبـديا〕↠
↞〔انـسـتا〕↠
↞〔اسـم_اغنـية〕↠
↞〔فـيـس〕↠
↞〔بـيـن〕↠
↞〔مـيـديافايـر〕↠
↞〔شـغـل〕↠
"↞〔تـيكـتـوك〕↠*
" ↞〔تويـتـر〕↠*
↞〔بحـث〕↠
↞〔اغنـية〕↠
↞〔فيـديـو〕↠
↞〔تطبـيـق〕↠
↞〔صـورة〕↠
↞〔صـورة²〕↠
↞〔تحميل〕↠
❋ ─━─⊰🍷⊱─━─ ❋
⌬♻»┊قـسـم التـحـويـلات』↯
❋ ─━─⊰🍷⊱─━─ ❋
↞〔مـلـصـق〕↠
↞〔سـرقة〕↠
↞〔لفيـديو〕↠
↞〔لصـورة〕↠
↞〔دائـري〕↠
↞〔تـخـيل〕↠
↞〔مكـس〕↠
↞〔لرابط〕↠
↞〔جـواهـر〕↠
↞〔سـتـك〕↠
↞〔تيـلجـراف〕↠
↞〔لكـرتـون〕↠
↞〔باركـود〕↠
↞〔لريك〕↠
↞〔جوده hd〕↠
↞〔اكتب〕↠
❋ ─━─⊰🍷⊱─━─ ❋
⌬♠»┊قـسـم المـطـور』↯
❋ ─━─⊰🍷⊱─━─ ❋
↞〔ضـيـف_بريـمـيام〕↠
↞〔حـذف_بريـمـيام〕↠
↞〔الحـالة〕↠
↞〔ريـستـارت〕↠
↞〔بـان〕↠
↞〔الـغاء_البـان〕↠
#↞〔اطـفاء〕↠*
↞〔الحـالة〕↠
↞〔تفـعيـل〕↠
↞〔المـبنـديـن〕↠
↞〔إعـادة〕↠
↞〔ادخـل〕↠
↞〔ضـيف_اكـس بي〕↠
↞〔ضيـف_جـواهـر〕↠
↞〔بريم2〕↠
↞〔تعطيل〕↠
↞〔تفعيل〕↠
↞〔حظر〕↠
↞〔فك_الحظر〕↠
↞〔ادخل〕↠
↞〔انشر〕↠
↞〔الجروبات〕↠
❋ ─━─⊰🍷⊱─━─ ❋
⌬🔊»┊قـسـم الصـوتـيات』↯
❋ ─━─⊰🍷⊱─━─ ❋
↞〔عمـيق〕↠
↞〔منـفـوخ〕↠
↞〔تخـيـن〕↠
↞〔صـاخـب〕↠
↞〔سـريـع〕↠
↞〔تخـييـن²〕↠
↞〔روبـوت〕↠
↞〔بـطيـئ〕↠
↞〔نـاعـم〕↠
↞〔سـنـجـاب〕↠
❋ ─━─⊰🍷⊱─━─ ❋
『تـوقـيـع ┊ ˼‏📜˹』↶
「🍷 بوت┊الرعب الملكي」
المطور https://wa.me/967700244383
اي مشكله تواجهك تعال للمطور يحلها لك
❋ ─━─⊰🍷⊱─━─ ❋
*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*
*❲ معلومات البوت ❳ ⬳ ⌝🤖⌞*
*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*

❒┇اسم البوت: *${botname}*
❒┇اسم المالك: *${ownername}*
❒┇نظام التشغيل: *لينكس*
❒┇وقت التشغيل: *${uptime}*

*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*
*❲ معلومات المستخدم ❳ ⬳ ⌝👤⌞*
*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*

❒┇الإسم: *${name}*
❒┇الحساب: *${taguser}*

*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*
*❲  التقویم ❳ ⬳ ⌝📅⌞*
*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*

*❍┇بتوقيت اليمن-🇾🇪-*
❒┇الوقت: *${wib}*
❒┇التاریخ: *${date}*

*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*
*❲ لعرض الاوامر اکتب/ي ❳*
*⬳ ⌝ /المهام ⌞*
*• ∙ ∙━━╍━﹝🌀﹞━╍━━∙ ∙ •*

*بــــــ الملكي ــــــوت*

❆╼━━❆ •﹝📜﹞• ❆━━╾❆`

  conn.sendFile(m.chat, pp, 'darkman.png', str, m, false, { mentions: [who] })
  m.react(done)
}

handler.help = ['main']
handler.tags = ['group']
handler.command = ['الأوامر', 'الاوامر', 'اوامر', 'أوامر','menu']

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const time = moment.tz('Asia/Muscat').format('HH A')
  let res = "صباح الخير ☀️"
  if (time >= 4) {
    res = "صباح الخير 🌄"
  }
  if (time >= 10) {
    res = "مساء الخير ☀️"
  }
  if (time >= 15) {
    res = "مساء الخير 🌇"
  }
  if (time >= 18) {
    res = "تصبح على خير 🌙"
  }
  return res
}
