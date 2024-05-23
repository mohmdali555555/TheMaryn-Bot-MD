//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
	
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.settings[conn.user.jid] || {}
    let type = (args[0] || '').toLowerCase()
    let isAll = false, isUser = false
    switch (type) {
      case 'welcome':
      case 'bv':
      case 'bienvenida':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!isAdmin) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.welcome = isEnable
        break
        
        case 'detect':
        case 'detector':
          if (!m.isGroup) {
           if (!isOwner) {
             global.dfail('group', m, conn)
            throw false
          }
         } else if (!isAdmin) {
           global.dfail('admin', m, conn)
           throw false
         }
         chat.detect = isEnable
       break
        case 'autosticker':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.autosticker = isEnable
        break

      case 'public':
      case 'publico':
        isAll = true
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
        global.opts['self'] = !isEnable
        break
      case 'antilink':
      case 'antilinkwa':
      case 'antilinkwha':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.antiLink = isEnable
        break
      
      
      case 'onlypv':
      case 'onlydm':
      case 'onlymd':
      case 'solopv':
        isAll = true
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
        global.opts['pconly'] = isEnable
        break
        
      case 'gponly':
      case 'onlygp':
      case 'grouponly':
      case 'sologp':
      case 'sologrupo':
        isAll = true
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
        global.opts['gconly'] = isEnable
        break
        
      default:
       if (!/[01]/.test(command)) return m.reply(`
  ≡ List of options
  
  ┌─⊷ *ADMIN*
  ▢ welcome
  ▢ antilink
  ▢ autosticker
  ▢ detect
  └───────────── 
  ┌─⊷ *OWNER*
  ▢ public
  ▢ onlydm
  ▢ grouponly
  └─────────────
  *📌 Example :*
  *${usedPrefix}on* welcome
  *${usedPrefix}off* welcome
  `)
        throw false
    }

    m.reply(`
    ✅ *${type}* الآن *${isEnable ? 'مُفعل' : 'مُعطل'}* ${isAll ? 'لهذا البوت' : isUser ? '' : 'لهذا البوت'}
  `.trim())  
  }
  handler.help = ['en', 'dis'].map(v => v + 'able <option>')
  handler.tags = ['nable']
  handler.command = /^((en|dis)able|(turn)?o(n|ff)|[01])$/i
  handler.rowner = true

  export default handler
