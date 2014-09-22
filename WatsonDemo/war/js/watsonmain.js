/**
 * This is the first module The very first JS file that will load when the page
 * is loaded
 */

// defining where is jquery
requirejs.config({
	baseUrl : 'js',
	paths : {
		templates : '/templates',
		jquery : '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min'
	},
	shim: {
	    underscore: {
	      exports: '_'
	    },
	    backbone: {
	      deps: ["underscore", "jquery"],
	      exports: "Backbone"
	    }
	  }
});

/**
 * 2 primary methods, require and define $ = the thing in the array there is no
 * need for .js because it is asking for module name, not name of the file
 */
// this app will require the jquery AND your regular js file.
// even in quotes , templates refer to the one the paths                          _ = underscore
require([ 'jquery','TemplateService', 'underscore' ], function($,TemplateService, _) {

	//window.TemplateService = TemplateService;
	// creating new instance.
	var templateService = new TemplateService({
		defaultPath : '/templates/' // setting defualt path goes into templateservice.js
	});
	
	
	var viewport = $('.viewport');
	var templateBase= $('.html-templates');
	
	// deffered obj because we do NOT know when they are actually finished loading.
	var deferredPageTemplate = templateService.getHomePageTemplate();
	
	
	var deferredTopicTemplate = templateService.getTopicTemplate();
	
	
	// sometimes pages are being loaded too slow so,
	// when they are done,                              then....      topicTemplate = resolved version deferredTopicTemplate
	$.when(deferredTopicTemplate, deferredPageTemplate).then(function(topicTemplate,pageTemplate){
		console.log(arguments);
									// by the time this page template is here it has already been resolved
		// _.template converts the string into a function to be used. So we can pass the obj to it and minipulate it from there.
		var pageTemplate = _.template(pageTemplate);		
		var topicTemplate = _.template(topicTemplate);		
		
		// the index.html, has not been broken down.
		 
		var chatWindowTemplate = _.template(templateBase.find('> .chat-window').html());

		// list of topics, was displayed
		var topics = ["Retirement", "Real Esate", "Taxes"];
		
		// we are creating objects here with these name and value pairs.
		var topicsHtml = "";
		for(var i = 0; i < topics.length; i ++){
			topicsHtml = topicsHtml + 
			topicTemplate({
				name : topics[i]
			})
		}
		// we are creating objects here with these name and value pairs.
		var chatWindow = chatWindowTemplate({
			placeholder : "What would you like to know about"
		});
		
		// we are creating objects here with these name and value pairs.
		var pageSteve = pageTemplate({
			topics : topicsHtml,
			chat : chatWindow
			
		});
		
		viewport.html(pageSteve);
		
		
	});	
	
});