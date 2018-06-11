var LoadingJS = function(){
	this.initConfig();
	this.initHtml();
	this.initCss();
	this.startLoading();
	
	this.onResize();
	var self = this;
	$(window).resize(function(){
		self.onResize();
	});
}

LoadingJS.prototype = {
	
	initHtml : function(){
		this.instance = $("<div class='loading'></div>");
		this.image = $("<img src='" + this.loadingPicture + "'/>");
		this.title = $("<p></p>");
		this.loadingProgress = $("<p></p>");
		
		if(this.loadingPicture) this.instance.append(this.image);
		this.instance.append(this.title);
		this.instance.append(this.loadingProgress);
		$("body").append(this.instance);
	},
	
	initConfig : function(){
		  this.loadingCaption, this.loadingCaptionColor, this.loadingPicture;
		  try{
		  	this.loadingCaption = bookConfig.loadingCaption ? bookConfig.loadingCaption : "Loading";
		  	this.loadingCaptionColor = bookConfig.loadingCaptionColor ? bookConfig.loadingCaptionColor : "#DDDDDD";
		  	this.loadingBackground = bookConfig.loadingBackground ? bookConfig.loadingBackground : "#1F2232";
		  	this.loadingPicture = bookConfig.loadingPicture ? bookConfig.loadingPicture : "";
		  }catch(err){
		  	this.loadingCaption = "Loading";
		  	this.loadingCaptionColor = "#DDDDDD";
		  	this.loadingBackground = "#1F2232";
		  	this.loadingPicture = "";
		  }
	},
	
	startLoading : function(){
		this.title.text($(document).attr("title"));
		this.loadingProgress.text(this.loadingCaption + "...");
		
		var self = this, iIndex = 0;
		this.timer = window.setInterval(function(){
			iIndex ++;
			var iCount = iIndex % 3;
			
			switch(iCount){
				case 0:{self.loadingProgress.text(self.loadingCaption + ".  ");break;}
				case 1:{self.loadingProgress.text(self.loadingCaption + ".. ");break;}
				case 2:{self.loadingProgress.text(self.loadingCaption + "...");break;}
				default:break;
			}
		}, 2000);
	},
	
	destroy : function(){
		window.clearInterval(this.timer);
		this.instance.remove();
		this.image.attr("src", "");
		$("body").css({"background-color" : ""});
	},
	
	initCss : function(){
		$("html").css({
			"margin" : 0,
			"padding" : 0,
			"width" : "100%",
			"height" : "100%"
		});
		$("body").css({
			"margin" : 0,
			"padding" : 0,
			"width" : "100%",
			"height" : "100%",
			"position" : "absolute",
			"background-color" : this.loadingBackground
		});
		this.instance.css({
			"max-width" : "100%",
			"max-height" : "100%",
			"color" : this.loadingCaptionColor,
			"text-align" : "center",
			"vertical-align" : "middle",
			"font-family" : "Tahoma",
		    "position" : "relative",
		    "top": "50%",
		    "-webkit-transform" : "translateY(-50%)",
		    "-moz-transform" : "translateY(-50%)",
		    "-ms-transform" : "translateY(-50%)",
		    "-o-transform" : "translateY(-50%)",
		    "transform" : "translateY(-50%)"
		});
		this.image.css({
			"max-width" : "100%",
			"max-height" : "50%"
		});
		this.title.css({
		  	"font-size" : "24px",
		  	"text-shadow" : "0 0 5px #8c97cb, 0 0 10px #8c97cb, 0 0 15px #8c97cb"
		});
		this.loadingProgress.css({
			"font-size" : "12px"
		});
	},
	
	onResize : function(){
		var windowWidth = $("body").width();
		var windowHeight = $("body").height();
		this.image.css({
			"max-width" : windowWidth + "px",
			"max-height" : windowHeight / 2 + "px"
		});
	}
}

var jsLoadingBar = new LoadingJS();