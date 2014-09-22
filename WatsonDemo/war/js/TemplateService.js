
define(['jquery','util/getTemplate'],function($,getTemplate){
	// constructor
	var TemplateService = function(args){
		console.log('this is a template service constructor',args,arguments)
		this.defaultPath = args.defaultPath;
	};
	
	// defining methods
	// .prototype is something so that we can use/create the TemplateService and all of its methods for other classes to use. Remember, this is NOT java, js needs prototype to define that it is a function.
	
	TemplateService.prototype.getHomePageTemplate = function(){
		console.log('gettinghomepagetemplate',this,arguments)
		// we are calling a global function. gettemplate will not work normally.
		return getTemplate.call(this,'home-page.html');
		
	}
	// using this method to attach a function on a function called byName (does not require 'this' keyword)
	TemplateService.prototype.getTopicTemplate = function(){
		// byName is a function that is attached to the prev function
		return getTemplate.byName(this.defaultPath,'topic.html');
	}
	
	//returning that constructor, modules always return something so we can use it later on.
	return TemplateService;
});