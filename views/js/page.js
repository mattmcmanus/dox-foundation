  var headerHeight = 64;

  $(function(){
    $('pre').addClass('language-javascript');
    $('#nav > ul > li > a[href$="'+location.pathname.substring(location.pathname.lastIndexOf('/')+1, location.pathname.length)+'"]').parent().addClass('active');
  })