 class CheckData {
  constructor(props) {

  }

  // 替换变量
  _setStr(str, index) {
    let new_str = str
    let reduce_reg = /(?<=\[).*?(?=\])/g
    if (((typeof index === 'number') && index) || index === 0 ) {
      new_str = str.replace(reduce_reg, index)
    }
    return new_str
  }

  // 校验数据过程
  _check(str, data, index) {
    if (!str) {
      return this.isBooleanData({errror_count: 1})
    }
    let new_str = this._setStr(str, index)
    let reduction_value = this.reductionValue(new_str)
    let check_esult = this.checkData(reduction_value, data)
    return this.isBooleanData(check_esult)
  }
  
  // 还原取值的字符串脚本
  reductionValue(new_str) {
    let reg = /((\[).*?(\]))|(\.)/g
    let reduction_value = new_str.replace(reg, "?$&").split("?")
    reduction_value[0] = 'dataObj'
    return reduction_value
  }

  // 校验结果
  isBooleanData(checkResult) {
    let check_esult = true;
    check_esult = checkResult.errror_count > 0 ? false : checkResult.data
    return check_esult
  }

  // 顺序检查每一个数据是否通过
  checkData(reduction_value, data) {
    let dataObj = data
    let errror_count = 0;
    if (!dataObj) {
      errror_count ++ 
      console.log('=====缺少参数data=====')
      return errror_count
    }
    let reault = reduction_value.reduce(function(t, next){
      let curry_data = eval(t || '');
      if(curry_data !==0 && !curry_data) {
        errror_count ++
        return false
      }
      return t + next
    })
    let reaultData = eval(reault)
    if (reaultData !== 0 && !reaultData) {
      errror_count ++
    }
    return {errror_count: errror_count, data: reaultData}
  }
}

export default function (str, data, index) {
  let checkData = new CheckData()
  return checkData._check(str, data, index)

}