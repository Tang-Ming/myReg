

/**
 * 获取代码运行场景值
 *
 */
export function getEnvironment() {
  const res = {
    system: '', // 系统
    sVersion: [], // 系统版本号
    app: '', // app 环境
    aVersion: [], // app 版本号
    channel: '', // 渠道
  };
  const ua = navigator.userAgent.toLowerCase();
  // 获取版本号
  if (/version/.test(navigator.userAgent)) {
    [, res.aVersion] = navigator.userAgent.match(/version\/(\S*)\s/);
  }
  if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
    // ios 系统
    res.system = 'ios';
    res.sVersion = ua.match(/os (\d+)_(\d+)_?(\d+)?/);
  } else if (/(android)/i.test(ua)) {
    // android 系统
    res.system = 'android';
    res.sVersion = ua.match(/android (\d+)_(\d+)_?(\d+)?/);
  }
  if (/micromessenger/i.test(ua)) {
    res.app = 'wechat'; // 微信
    res.aVersion = '';
  } else if (/qq/i.test(ua)) {
    res.app = 'qq';
    res.aVersion = '';
  }
  return res;
}


// 获取 url 里的 query
export function getUrlParam(queryName) {
  var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
     var r = window.location.search.substr(1).match(reg);
      if ( r != null ){
        return decodeURI(r[2]);
     }else{
        return null;
    }
}

/**
 * 常用正则表达式校验
 * @param {*} type
 * @param {*} data
 */
export function verify(type, data) {
  const regObj = {
    phoneNum: '^1[3|4|5|6|7|8][0-9]\\d{4,8}$',
    // phoneNum: '^(0?(13|14|15|16|17|18|19)[0-9]{9}$)',
    // idCard: '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
    // idCard: '^((\\d{18})|([0-9x]{18})|([0-9X]{18}))$',
    pwd: '[-_,!|~`()#$%^&*{}:;"L<>?]',
  };
  const reg = new RegExp(regObj[type], 'i');
  return reg.test(data);
}




/**
 * 秒转时分秒
 * @param {String} formatter
 */
export function secondsFormat(dateing) {
  const hours = Math.round((Number(dateing) - 30 * 60) / (60 * 60)); // 取得小时数
  const hoursRepace = hours > 0 ? `${hours}时` : '';
  const min = Math.round((Number(dateing) - 30) / 60) % 60; // 取得分钟
  let minRepace = '';
  if (min > 0 && min < 10 && hours > 0) {
    minRepace = `0${min}分`;
  } else if (min > 0 && min < 10 && hours <= 0) {
    minRepace = `${min}分`;
  } else if (minRepace <= 0 && hours > 0) {
    minRepace = `${min}分`;
  } else if (minRepace <= 0 && hours <= 0) {
    minRepace = '';
  } else {
    minRepace = `${min}分`;
  }
  const sec = Number(dateing) % 60; // 取得秒数
  let secRepace = '';
  if (sec > 0 && sec < 10 && min > 0) {
    secRepace = `0${sec}秒`;
  } else if (sec > 0 && sec < 10 && min <= 0 && hours > 0) {
    secRepace = `0${sec}秒`;
  } else {
    secRepace = `${sec}秒`;
  }
  return `${hoursRepace}${minRepace}${secRepace}`;
}


/**
 *  复制dom 里的文本信息
 * @export
 * @param {*} dom
 */
export function copyText(dom) {
  window.getSelection().removeAllRanges(); // 这段代码必须放在前面否则无效
  const text = dom; // 要复制文字的节点
  const range = document.createRange();
  // 选中需要复制的节点
  range.selectNode(text);
  // 执行选中元素
  window.getSelection().addRange(range);
  // 执行 copy 操作
  const successful = document.execCommand('copy');
  let msg = '';
  try {
    // Now that we've selected the anchor text, execute the copy command
    msg = successful ? '复制成功' : '复制失败';
    console.log(msg);
  } catch (err) {
    console.log(err);
  }
}

// 判断是否空对象
export function checkNullObj(obj) {
  return Object.keys(obj).length === 0;
}


/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345, a:b}
 * */
export function urlParse() {
  const url = window.location.search;
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);
  // ['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substr(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

// 指定数组分段
export function group(array, subGroupLength) {
  let index = 0;
  const newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }

  return newArray;
}

// 禁止冒泡时间
export function stopPropagation(e, func) {
  if (func) {
    func();
  }
  e.stopPropagation();
}

export function replaceParamVal(url, arg, val) {
  const pattern = `${arg}=([^&]*)`;
  const replaceText = `${arg}=${val}`;
  return url.match(pattern) ? url.replace(eval(`/(${arg}=)([^&]*)/gi`), replaceText) : (url.match('[\?]') ? `${url}&${replaceText}` : `${url}?${replaceText}`);
}

// 时间戳转换日期
function addZero(m) { return m < 10 ? `0${m}` : m; }
export function getLocalTime(nS,type) {
  const time = new Date(Number(nS) * 1000);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  if('yyyy-mm-dd hh:mm'===type){
    const _year=new Date().getFullYear()
    if(_year===year){//当前年，不返年
      return `${addZero(month)}-${addZero(date)} ${addZero(hours)}:${addZero(minutes)}`;
    }else{
      return `${addZero(year)}-${addZero(month)}-${addZero(date)} ${addZero(hours)}:${addZero(minutes)}`;
    }
    
  }
  return `${addZero(year)}-${addZero(month)}-${addZero(date)} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}



/**
 * @description: 高度
 * @param {type}
 * @return:
 */
export function clientHeight() {
  return document.documentElement.clientHeight;
}

/**
 * @description: 字符串指定位置插入
 * @param {type}
 * @return:
 */
export const insertStr = (soure, start, newStr) => soure.slice(0, start) + newStr + soure.slice(start);


/**
 * @description: 获取光标位置
 * @param {type}
 * @return:
 */
export function getCursortPosition(textDom) {
  let cursorPos = 0;
  if (document.selection) {
    // IE Support
    textDom.focus();
    const selectRange = document.selection.createRange();
    selectRange.moveStart('character', -textDom.value.length);
    cursorPos = selectRange.text.length;
  } else if (textDom.selectionStart || textDom.selectionStart === '0') {
    // Firefox support
    cursorPos = textDom.selectionStart;
  }
  return cursorPos;
}

/**
 * @description: 设置光标位置
 * @param {type}
 * @return:
 */
// 设置光标位置
export function setCaretPosition(textDom, pos) {
  if (textDom.setSelectionRange) {
    // IE Support
    textDom.focus();
    textDom.setSelectionRange(pos, pos);
  } else if (textDom.createTextRange) {
    // Firefox support
    const range = textDom.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

export function hideWxMenu() {
  var onBridgeReady = function () {
    window.WeixinJSBridge.call('hideOptionMenu');
      };
      if (typeof window.WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
      } else {
          onBridgeReady();
      }
}

export function getFontSize () {
  if (typeof window.WeixinJSBridge == "object" && typeof window.WeixinJSBridge.invoke == "function") {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize);
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }
  function handleFontSize () {
    
    // 设置网页字体为默认大小
    window.WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 2 });
    // 重写设置网页字体大小的事件
    window.WeixinJSBridge.on('menu:setfont', function () {
      window.WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 2 });
    });
  }
}
export function showWxMenu() {
  const onBridgeReady = () => {
    window.WeixinJSBridge.call('showOptionMenu');
  };
  if (typeof window.WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}

/**
 * @description: 设置cookie
 * @param {type}
 * @return:
 */

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * @description: 获取cookie
 * @param {type}
 * @return:
 */
export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
       }
      if (c.indexOf(name)  == 0) {
          return c.substring(name.length, c.length);
       }
  }
  return "";
}


/* @description: 时间转小时
 * @param {type}
 * @return:
 */
export function timeFormatHou (second) {
    let hour = parseInt(parseInt(second) / 3600) >= 10 ? parseInt(parseInt(second) / 3600) : 0 + '' + parseInt(parseInt(second) / 3600)
    let min = (parseInt(second) / 3600 - hour) * 60 >= 10 ? (parseInt(second) / 3600 - hour) * 60 : 0 + '' + (parseInt(second) / 3600 - hour) * 60
    return hour + ':' + min
}

// 将时间毫秒数转换成提示 例如：刚刚，3天前
export function timeago(dateTimeStamp) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime(); //获取当前时间毫秒
  var diffValue = now - dateTimeStamp; //时间差
  if (diffValue < 0) {
    return;
  }
  var minC = diffValue / minute; //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  let result = ''
  console.log('dayC', dayC)
  if (monthC >= 1 && monthC <= 3) {
    result = " " + parseInt(monthC) + "月前"
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt(weekC) + "周前"
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + parseInt(dayC) + "天前"
  } else if (hourC >= 1 && hourC < 23) {
    result = " " + parseInt(hourC) + "小时前"
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}

// 将时间毫秒数转换成提示 例如：刚刚，3天前
export function timeagoTwo (dateTimeStamp) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime(); //获取当前时间毫秒
  var diffValue = now - dateTimeStamp; //时间差
  if (diffValue < 0) {
    return;
  }
  var minC = diffValue / minute; //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour;
  var minCHour = (Math.round((hourC % 1) * 10) / 10) * 60
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  let result = ''
  // if (monthC >= 1 && monthC <= 3) {
  //   result = " " + parseInt(monthC) + "月前"
  // } else if (weekC >= 1 && weekC <= 3) {
  //   result = " " + parseInt(weekC) + "周前"
  // } else
  var datetime = new Date();
  datetime.setTime(dateTimeStamp);
  var Nyear = datetime.getFullYear();
  var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();

  var datetimeTod = new Date();
  var TodYear = datetimeTod.getFullYear();
  var TodMonth = datetimeTod.getMonth() + 1 < 10 ? "0" + (datetimeTod.getMonth() + 1) : datetimeTod.getMonth() + 1;
  var TodDate = datetimeTod.getDate() < 10 ? "0" + datetimeTod.getDate() : datetimeTod.getDate();
  var TodHour = datetimeTod.getHours() < 10 ? "0" + datetimeTod.getHours() : datetimeTod.getHours();
  var TodMinute = datetimeTod.getMinutes() < 10 ? "0" + datetimeTod.getMinutes() : datetimeTod.getMinutes();
  var TodCond = datetimeTod.getSeconds() < 10 ? "0" + datetimeTod.getSeconds() : datetimeTod.getSeconds();
  if (monthC <= 12 && hourC >= 48 && Number(TodYear) === Number(Nyear)) {
    result = Nmonth + "月" + Ndate + '日' +' '+ Nhour + ':' + Nminute
  } else if (Number(Nmonth) === Number(TodMonth) && Number(TodYear) === Number(Nyear) && Number(TodDate) > Number(Ndate) + 1) {
    result = Nmonth + "月" + Ndate + '日' + ' ' + Nhour + ':' + Nminute
  } else if (Number(TodDate) - 1 === Number(Ndate) && Number(Nmonth) === Number(TodMonth) && Number(TodYear) === Number(Nyear)) {
    result =  '昨天 ' + Nhour + ':' + Nminute
  } else if (Number(TodDate) === Number(Ndate) && Number(Nmonth) === Number(TodMonth) && Number(TodYear) === Number(Nyear)) {
    result = Nhour + ':' + Nminute
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    result = Nyear + "年" + Nmonth + "月" + Ndate + '日'
  }
  return result;
}
// encode转码
export function encodeSearchKey(key) {
  const encodeArr = [{
    code: '%',
    encode: '%25'
  }, {
    code: '?',
    encode: '%3F'
  }, {
    code: '#',
    encode: '%23'
  }, {
    code: '&',
    encode: '%26'
  }, {
    code: '=',
    encode: '%3D'
  }];
  return key.replace(/[%?#&=]/g, ($, index, str) => {
    for (const k of encodeArr) {
      if (k.code === $) {
        return k.encode;
      }
    }
  });
}
export function disAbledScroll(){//有弹出层时，滚动时禁止body滚动
  document.body.style.overflow='hidden'
}
export function canScroll(){//取消弹出层时，开放禁止body滚动
  document.body.style.overflow='initial'
}
export function checkCard(idcard) {
  var area = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆'}
  // , 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' 
  var Y, JYM, S, M;
  var idcard_array = idcard.split('');
  //地区检验
  if (area[parseInt(idcard.substr(0, 2))] === null) { return false; }
  //身份号码位数及格式检验
  switch (idcard.length) {
      case 18:
          //18位身份号码检测
          //出生日期的合法性检查
          //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
          //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
          var ereg;
          if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
              ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
          } else {
              ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
          }
          if (ereg.test(idcard)) {//测试出生日期的合法性
              //计算校验位
              S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                  + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                  + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                  + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                  + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                  + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                  + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                  + parseInt(idcard_array[7])
                  + parseInt(idcard_array[8]) * 6
                  + parseInt(idcard_array[9]) * 3;
              Y = S % 11;
              M = 'F';
              JYM = '10X98765432';
              M = JYM.substr(Y, 1);
              if (M == idcard_array[17].toUpperCase()) {
                  return true;
              } else {
                  return false;
              }
          } else {
              return false;
          }
          break;
      default:
          return false;
          break;
  }
}
/* @description: Date  格式化
 * @param {type}
 * @return:
 */
export function format (date,type='yyyy-mm-dd') {
  if(Object.prototype.toString.call(date)==="[object Date]"){
    let _y=new Date(date).getFullYear()
    let _m=new Date(date).getMonth()+1
    let _d=new Date(date).getDate()
    // console.error(`${_y}-${_m>9?_m:'0'+_m}-${_d>9?_d:'0'+_d}`,9999)
    if(type==='yyyy-mm-dd') return `${_y}/${_m>9?_m:'0'+_m}/${_d>9?_d:'0'+_d}`
    
  }
  try{
    // console.log(new Date(date))
  }catch(r){
    throw TypeError('日期类型转换错误')
  }
}