var tags = Mock.mock({
	"list|30": [
		{
			"text": "@cword(5,7)",
			"weight": "@integer(1,10)"
		}
	]
});
var CLOUD_DATA_READ = {
	//"createNewCloud": true,
	"cloudId": 0,
	"userId": "anonymous",
	"name": "Word Art",
	"uniqueId": "000000000000",
	"visibility": 0,
	"url": "",
	"linkPattern": "",
	"relativeSize": -1,
	"tagsAmount": -1,
	"shape": {
		name: "heart",
		angle: 0,
		ratio: 2,
		negative: !1
	},
	"angles": [0],
	"fonts": "PT Sans Bold Italic",
	"styleOptions": {
		backgroundColor: "ffffff",
		backgroundColorAlpha: 1,
		animationSpeed: 0.2,
		textColor: "ffffff",
		textAlpha: 1,
		boxColor: "000000",
		boxAlpha: 0.7,
		zoom: !0,
		rotate: !0,
		openLinksInNewWindow: !1
	},
	tags: tags.list
	/*"tags": [{
		text: "Word",
		weight: 1
	}, {
		text: "Art",
		weight: 1
	}]*/
};
var GENERATED_CLOUD_READ = null;