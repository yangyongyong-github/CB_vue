import user from './user'
import lang from './lang'
import rate from './rate'
import bank from './bank'
import loading from './loading'

const content = Object.assign({}, user, lang, rate, bank,loading);
// console.log('content : ', content)
export default content;