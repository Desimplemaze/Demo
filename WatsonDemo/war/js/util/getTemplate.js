define(['jquery'],function($){
	// this one does use this keyword
	var getTemplate = function(templateName){
		console.log('getTemplate',this,arguments)
		
		// creating a deffered obj 
		var def = new $.Deferred();
		// when ajax call is done, we are resolving our custom deffered obj
		var templateDef = $.ajax({
			url : this.defaultPath+templateName,
			type : 'GET'
		})
		// mapping response to templateDef
		templateDef.then(function(response){
			def.resolve(response)
		});
		return def;
	};
	
	
	// this one doens't use this keyword
	getTemplate.byName = function(path,templateName){
		console.log('getTemplateByName',this,arguments)
		var def = new $.Deferred();
		var templateDef = $.ajax({
			url : path+templateName,
			type : 'GET'
		})
		templateDef.then(function(response){
			def.resolve(response)
		});
		return def;
	}
	
	return getTemplate;
})