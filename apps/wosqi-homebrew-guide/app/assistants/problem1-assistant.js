function Problem1Assistant(params) {
	this.os = params.os || "Windows";
}

Problem1Assistant.prototype.setup = function() {
	var menuModel = {
    	visible: true,
    	items: [
			{label: "Help", command:"about"}
		]
  	};
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, menuModel);
	this.controller.get("mac1").hide();
	this.controller.get("mac2").hide();
	this.controller.get("windows").hide();
	this.controller.get("ubuntu").hide();
	if(this.os=="Windows") {
		this.controller.get("windows").show();
	} else if(this.os=="Mac") {
		this.controller.get("mac1").show();
		this.controller.get("mac2").show();
	} else if(this.os=="Ubuntu") {
		this.controller.get("ubuntu").show();
	}
};

Problem1Assistant.prototype.activate = function(event) {
	this.notSolved = this.notSolved.bindAsEventListener(this);
	this.controller.listen("notSolved", Mojo.Event.tap, this.notSolved);
};

Problem1Assistant.prototype.notSolved = function(event) {
	this.controller.stageController.pushScene("other");
};

Problem1Assistant.prototype.deactivate = function(event) {
	this.controller.stopListening("notSolved", Mojo.Event.tap, this.notSolved);
};

Problem1Assistant.prototype.cleanup = function(event) {

};
