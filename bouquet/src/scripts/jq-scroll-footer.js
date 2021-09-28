var startPos = 0, winScrollTop = 0
window.$(window).scroll(function(eo){
    console.log(eo)
    winScrollTop = window.$(window).scrollTop()
  if(winScrollTop >= startPos && winScrollTop >= 10) {
      console.log('フッターを表示する')
        window.$('footer').removeClass('hide')
  } else {
      console.log('フッターを隠す')
      window.$('footer').addClass('hide')
  }
  startPos = winScrollTop;
})