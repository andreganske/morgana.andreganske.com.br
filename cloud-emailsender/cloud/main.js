Parse.Cloud.define("sendConfirmationEmail", function(request, response) {

	var sendgrid = require("sendgrid"),
		email = request.params.email,
		text = request.params.name + ", queremos agradecer por ter escolhido " + request.params.gift + " para nos presentear.",
		subject = "Obrigado pelo presente " + request.params.name + "!";

	sendgrid.initialize("aganske", "qK0OylGG9PJfvC9lvh");

	var sendmail = sendgrid.Email({
		from: "andre.g.ganske@gmail.com", 
		fromName: "Morgana e Andre",
		replyto: "andre.g.ganske@gmail.com"
	});

	sendmail.addTo(email);
	sendmail.addToName(request.params.name);
	sendmail.setSubject(subject);
	sendmail.setText(text);

	sendmail.addFilter('templates', 'enable', '1');
	sendmail.addFilter('templates', 'template_id', 'c00614aa-e61a-4371-a92b-bd48a2914f90');	

	sendgrid.send(sendmail).then(function(httpResponse) {
		console.log(httpResponse);
		response.success("Email enviado com sucesso!");
	},function(httpResponse) {
		console.error(httpResponse);
		response.error("Uh oh, ocorreu algum problema " + httpResponse.getMessage);
	});
});