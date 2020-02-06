export const setCookie = (cname,cvalue,exdays) => {
  var d = new Date();
  var tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + exdays, 3, 0, 0); // clear at 3 am
  d.setTime(tomorrow.getTime());
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const checkCookie = () => {
  
}