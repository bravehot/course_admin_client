// 获取cookie
const getCookie = (name) => {
  let strCookie = document.cookie;
  let arrCookie = strCookie.split("; ");
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split("=");
    if (arr[0] == name) return arr[1];
  }
  return "";
}
// 删除cookie
const deleteCookie = (name) => {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = `${name}=v; expires=${date.toGMTString()}`
}
export {
  getCookie,
  deleteCookie
}