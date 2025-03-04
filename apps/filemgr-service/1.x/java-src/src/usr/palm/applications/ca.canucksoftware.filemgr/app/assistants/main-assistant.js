function MainAssistant() {
	this.icon = Mojo.Controller.appInfo.icon;
	this.name = Mojo.Controller.appInfo.title;
	this.id = Mojo.Controller.appInfo.id;
	this.version = Mojo.Controller.appInfo.version;
	this.copyright = "&copy; Copyright " + Mojo.Controller.appInfo.vendor;
	if(Mojo.Controller.appInfo.copyright) {
		this.copyright = Mojo.Controller.appInfo.copyright;
	}
	this.serviceOn = false;
}

MainAssistant.prototype.setup = function() {
	this.controller.get("icon").style.background = "url(" + this.icon +
			") no-repeat !important";
	this.controller.get("title").innerHTML = this.name +
			"&nbsp;&nbsp;" + this.version;
	this.controller.get("footer").innerHTML = this.copyright;
	
	this.controller.get("status").innerHTML = "Checking if installation was" +
			" successful...";

	//Wait for a known system service to come online to get a base time to
	//check for the custom service.
	this.baseRequest = this.controller.serviceRequest("palm://com.palm.bus/signal/", {
		method: "registerServerStatus",
		parameters: {serviceName:"com.palm.applicationManager"},
		onSuccess: this.baseStatusSuccess.bind(this),
		onComplete: this.baseStatusComplete.bind(this)
	});
};

MainAssistant.prototype.baseStatusSuccess = function(response) {
	if(response.connected) {
		this.controller.window.setTimeout(this.statusTimeout.bind(this), 30000);
		this.statusRequest = this.controller.serviceRequest("palm://com.palm.bus/signal/", {
			method: "registerServerStatus",
			parameters: {serviceName:this.id},
			onSuccess: this.statusSuccess.bind(this),
			onComplete: this.statusComplete.bind(this)
		});
	}
};

MainAssistant.prototype.statusSuccess = function(response) {
	this.serviceOn |= response.connected;
	if(this.serviceOn) {
		this.controller.get("status").innerHTML = "Installation of " + this.name +
				" service was successful. Congratulations and enjoy!";
	}
};

MainAssistant.prototype.statusTimeout = function(response) {
	if(!this.serviceOn) {
		this.controller.get("status").innerHTML = "Installation of " + this.name +
				" service was unsuccessful. Try reinstalling or contact the developer.";
	}
};

MainAssistant.prototype.statusComplete = function() {
	delete this.statusRequest;
};

MainAssistant.prototype.baseStatusComplete = function() {
	delete this.baseRequest;
};

MainAssistant.prototype.activate = function(event) {

};

MainAssistant.prototype.deactivate = function(event) {

};

MainAssistant.prototype.cleanup = function(event) {

};
