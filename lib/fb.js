window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '1513311375571983', // Facebook App ID
    channelUrl : '//andreganske.com.br/channel.html', // Channel File
    cookie     : true, // enable cookies to allow Parse to access the session
    xfbml      : true  // parse XFBML
  });
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "http://connect.facebook.net/pt_BR/all.js"
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));