import Cookies from 'js-cookie';
export default class V {
    constructor(o = {
        inputCheckClass: 'error_border',
        finalCheckClass: 'error_border',
        errorMsgShow: 'verify-msg-show',
        errorMsgHidden: 'verify-msg-hidden'
    }) {
        // 需要验证的表单集合
        this._cfg = {
                // 空白文字
                nonvoid(v, bool) {
                    if (bool) {
                        return v == undefined || v.trim() ? 0 : ['nonvoid']
                    } else {
                        return 0
                    }
                },
                // 正则
                reg(v, reg) {
                    return reg.test(v) ? 0 : ['reg']
                },
                // 区间
                limit(v, interval) {
                    return +v >= interval[0] && +v <= interval[1] ? 0 : ['limit']
                },
                // 等于
                equal(v, target) {
                    return v == target ? 0 : ['equal']
                },
                // 不等于
                unequal(v, target) {
                    return v != target ? 0 : ['unequal']
                },
                len(v, len) {
                    return v.length == len ? 0 : ['len']
                },
                // 小于
                lessthan(v, len) {
                    // 先校验是否为空
                    if (v.length == 0) {
                        return ['nonvoid']
                    } else {
                        return v.length < len ? ['lessthan'] : 0
                    }
                }
            }
            // 常用正则
        this._regList = {
                ImgCode: /^[0-9a-zA-Z]{4}$/,
                SmsCode: /^\d{4}$/,
                MailCode: /^\d{4}$/,
                UserName: /^[\w|\d]{4,16}$/,
                Password: /^[\w!@#$%^&*.]{6,16}$/,
                Phone: /^\s*\+?\s*(\(\s*\d+\s*\)|\d+)(\s*-?\s*(\(\s*\d+\s*\)|\s*\d+\s*))*\s*$/,
                Mobile: /^1[3|5|8]\d{9}$/,
                RealName: /^[\u4e00-\u9fa5 ]{2,10}$/,
                BankNum: /^\d{10,19}$/,
                Money: /^([1-9]\d*|0|\d*(\.\d*))$/,
                Answer: /^\S+$/,
                Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                positive_integer: /^[1-9]*[1-9][0-9]*$/
                    // (?:\(?[0\+]\d{2,3}\)?)[\s-]?(?:(?:\(0{1,3}\))?[0\d]{1,4})[\s-](?:[\d]{7,8}|[\d]{3,4}[\s-][\d]{3,4})
            }
            // 错误信息提醒
        this._ERR_MSG_ZH = {
            nonvoid: '不能为空！',
            reg: '格式错误！',
            limit: '您输入的值不在区间内',
            equal: '两次输入的值不相等',
            unequal: '两次输入的值重复'
        }
        this._ERR_MSG_EN = {
            nonvoid: 'Can not be empty!',
            reg: 'wrong format!',
            limit: 'The value you entered is not in the range!',
            equal: 'The values entered twice are not equal!',
            unequal: 'The values entered twice are repeated!'
        }
        this.inputCheckClass = o.inputCheckClass
        this.finalCheckClass = o.finalCheckClass
        this.errorMsgHidden = o.errorMsgHidden
        this.errorMsgShow = o.errorMsgShow
    }

    cinfig({
        inputCheckClass = 'error_border',
        finalCheckClass = 'error_border'
    } = {}) {
        this.inputCheckClass = o.inputCheckClass
        this.finalCheckClass = o.finalCheckClass
    }

    get ERR_MSG() {
        console.dir(this._ERR_MSG);
        return this._ERR_MSG
    }

    get cfg() {
        return this._cfg
    }

    get regList() {
            return this._regList
        }
        // 添加类
    addClass(el, className) {
        const classArr = el.className.split()
        if (classArr.indexOf(className) == -1) {
            classArr.push(className)
            el.className = classArr.join(' ')
        }
    }

    // 移出类
    removeClass(el, className) {
            const reg = new RegExp('(\\s' + className + '|' + className + '\\s)', 'g')
            el.className = el.className.replace(reg, '')
        }
        // 检查
    check(v, el, vm) {
            let checkValue

            if (v.arg == 'reg') {
                if (!this._regList[v.value.format]) {
                    checkValue = typeof v.value.format == 'stirng' ? new RegExp(v.value.format) : v.value.format
                } else {
                    checkValue = this._regList[v.value.format]
                }
            } else if (v.value.aim) {
                checkValue = vm._cddv.forms[v.value.aim].value || vm.$data[v.value.aim]
            } else {
                checkValue = vm.$data[v.value.format] || v.value.format
            }

            const ves = this.cfg[v.arg](el.value, checkValue)
            if (ves == 0) {
                el._cddv.validated = true
            } else {
                el._cddv.validated = false
            }
            return ves
        }
        // 信息
    msg(v, el, ves) {
        // 错误信息附加信息
        let str = ''
        const assLang = Cookies.get('assLang');
        if (assLang == 'zh') {
            switch (ves[0]) {
                case 'nonvoid':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_ZH[ves]
                    break
                case 'reg':
                    str = '[' + v.value.title + ']格式错误!'
                    el._cddv.msg = str
                    break
                case 'limit':
                    str = +el.value < v.value.format[0] ? '[' + v.value.title + ']应该大于' + v.value.format[0] : '[' + v.value.title + ']应该小于' + v.value.format[1]
                    el._cddv.msg = this._ERR_MSG_ZH[ves] + str
                    break
                case 'equal':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_ZH[ves]
                    break
                case 'unequal':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_ZH[ves]
                    break
                case 'len':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + '长度必须为:' + v.value.format;
                    break
                case 'lessthan':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + '长度不能小于:' + v.value.format;
                    break
                default:
                    el._cddv.msg = '[' + v.value.title + ']验证不通过'
            }
        }

        if (assLang === 'en') {
            switch (ves[0]) {
                case 'nonvoid':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_EN[ves]
                    break
                case 'reg':
                    str = '[' + v.value.title + ']wrong format!'
                    el._cddv.msg = str
                    break
                case 'limit':
                    str = +el.value < v.value.format[0] ? '[' + v.value.title + ']should be greater than' + v.value.format[0] : '[' + v.value.title + ']should be less than' + v.value.format[1]
                    el._cddv.msg = this._ERR_MSG_EN[ves] + str
                    break
                case 'equal':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_EN[ves]
                    break
                case 'unequal':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_EN[ves]
                    break
                case 'len':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + 'The length must be:' + v.value.format;
                    break
                case 'lessthan':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + 'the length must not be less than:' + v.value.format;
                    break
                default:
                    el._cddv.msg = '[' + v.value.title + ']Verification does not pass'
            }
        } else {
            switch (ves[0]) {
                case 'nonvoid':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_EN[ves]
                    break
                case 'reg':
                    str = '[' + v.value.title + ']wrong format!'
                    el._cddv.msg = str
                    break
                case 'limit':
                    str = +el.value < v.value.format[0] ? '[' + v.value.title + ']should be greater than' + v.value.format[0] : '[' + v.value.title + ']should be less than' + v.value.format[1]
                    el._cddv.msg = this._ERR_MSG_EN[ves] + str
                    break
                case 'equal':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_EN[ves]
                    break
                case 'unequal':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + this._ERR_MSG_EN[ves]
                    break
                case 'len':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + 'The length must be:' + v.value.format;
                    break
                case 'lessthan':
                    str = '[' + v.value.title + ']'
                    el._cddv.msg = str + 'the length must not be less than:' + v.value.format;
                    break
                default:
                    el._cddv.msg = '[' + v.value.title + ']Verification does not pass'
            }
        }
    }
    install(Vue, options) {
        // cddv本身
        const self = this
            // 验证上的指令
        Vue.directive('verify-input', {
                bind(el, binding, vnode) {
                    // 指令值
                    const v = {
                            value: binding.value || '',
                            arg: binding.arg || ''
                        }
                        // 当前实例
                    let vm = vnode.context,
                        verify = vm._cddv

                    // 给el添加_cddv
                    el._cddv = {
                            dirty: false,
                            v_type: v.arg,
                            indeed_value: v.value.format,
                            validated: false,
                            msg: '未进行验证',
                            title: v.value.title,
                            value: v.value
                        }
                        // 初始化
                    verify.forms[v.value.id] = el
                        // 给该元素添加监听事件验证
                    el.onchange = function() {
                        // 查看当前表单是否输入果值
                        if (!el._cddv.dirty) el._cddv.dirty = true
                            // 进行验证
                        let ves = 0
                        ves = self.check(v, el, vm)
                            // 对每个元素设置
                        self.msg(v, el, ves)
                            // 如果验证错误则添加一个类
                        if (el._cddv.validated) {
                            self.removeClass(el, self.inputCheckClass)
                        } else {
                            self.addClass(el, self.inputCheckClass)
                        }
                        // 定义自定义事件
                        vm.$emit('verify-checked')
                    }
                }
            })
            // 输出错误信息方法
        Vue.directive('verify-msg', {
                bind(el, binding, vnode) {
                    const v = {
                        arg: binding.arg
                    }
                    const vm = vnode.context

                    self.addClass(el, self.errorMsgHidden)
                        // 自定义事件，监听目标值的变化
                    vm.$on('verify-checked', () => {
                        const listener = vm._cddv.forms[v.arg];
                        if (listener._cddv.validated) {
                            self.removeClass(el, self.errorMsgShow)
                            self.addClass(el, self.errorMsgHidden)
                        } else if (!listener._cddv.validated && listener._cddv.dirty) {
                            self.removeClass(el, self.errorMsgHidden)
                            self.addClass(el, self.errorMsgShow)
                            el.innerHTML = listener._cddv.msg
                        }
                    })
                }
            })
            // 提交按钮自定认证
        Vue.directive('verify-final-check', {
                bind(el, binding, vnode) {
                    const v = {
                        arg: binding.arg || '',
                        value: binding.value || ''
                    }
                    const vm = vnode.context

                    el.onclick = function() {
                        let validated = true;
                        for (const item in vm._cddv.forms) {
                            const _el = vm._cddv.forms[item];
                            const _v = {};
                            if (_el.alt === v.arg) {
                                _v.arg = _el._cddv.v_type;
                                _v.value = _el._cddv.value;

                                let ves = 0
                                ves = self.check(_v, _el, vm)
                                    // 对每个元素设置
                                _el._cddv.dirty = true;
                                self.msg(_v, _el, ves)
                                    // 如果验证错误则添加一个类
                                if (_el._cddv.validated) {
                                    self.removeClass(_el, self.inputCheckClass)
                                } else {
                                    self.addClass(_el, self.inputCheckClass)
                                    validated = false;
                                }
                            }
                        }
                        vm.$emit('verify-checked');

                        if (!validated) { // 验证未通过
                            self.addClass(el, self.finalCheckClass);
                            // el.onclick = () => { }
                        } else { // 验证通过
                            self.removeClass(el, self.finalCheckClass);
                            vm.$emit(v.arg);
                        }
                    };
                }
            })
            // 实例方法，为每个实例添加一个对象属性
        Vue.prototype._cddv = {
            forms: {}
        }

        Vue.mixin({
            mounted() {

            }
        })
    }
}