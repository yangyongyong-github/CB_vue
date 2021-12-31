import user from './user'
import lang from './lang'
import rate from './rate'
import bank from './bank'

const content = Object.assign({}, user, lang, rate, bank);
// console.log('content : ', content)
export default content;