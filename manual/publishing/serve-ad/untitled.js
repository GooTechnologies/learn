var tags = [
{
	details: 'RUN : SEUK_UK_FY15_RuncontGS3_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494057;201;pixel;RUN;SEUKUKFY15RuncontGS3MPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494057;50126;211;0/?ft_width=1&ft_height=1&url=7740215'
},
{
	details: 'RUN : SEUK_UK_FY15_RuncontNote4_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494058;201;pixel;RUN;SEUKUKFY15RuncontNote4MPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494058;50126;211;0/?ft_width=1&ft_height=1&url=7740216'
},
{
	details: 'RUN : SEUK_UK_FY15_RunconiPhone_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494059;201;pixel;RUN;SEUKUKFY15RunconiPhoneMPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494059;50126;211;0/?ft_width=1&ft_height=1&url=7740217'
},
{
	details: 'RUN : SEUK_UK_FY15_RunconAndroid_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494060;201;pixel;RUN;SEUKUKFY15RunconAndroidMPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494060;50126;211;0/?ft_width=1&ft_height=1&url=7740218'
},
{
	details: 'RUN : SEUK_UK_FY15_RunbehGS3_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494061;201;pixel;RUN;SEUKUKFY15RunbehGS3MPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494061;50126;211;0/?ft_width=1&ft_height=1&url=7740219'
},
{
	details: 'RUN : SEUK_UK_FY15_RunbehNote4_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494062;201;pixel;RUN;SEUKUKFY15RunbehNote4MPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494062;50126;211;0/?ft_width=1&ft_height=1&url=7740220'
},
{
	details: 'RUN : SEUK_UK_FY15_RunbehiPhone_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494063;201;pixel;RUN;SEUKUKFY15RunbehiPhoneMPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494063;50126;211;0/?ft_width=1&ft_height=1&url=7740221'
},
{
	details: 'RUN : SEUK_UK_FY15_RunbehAndroid_ MPU_300x250 : 2015-11-04 - 2015-12-31',
	pixel: 'http://servedby.flashtalking.com/imp/1/50210;1494064;201;pixel;RUN;SEUKUKFY15RunbehAndroidMPU300x250/?cachebuster=[CACHEBUSTER]',
	click: 'http://servedby.flashtalking.com/click/1/50210;1494064;50126;211;0/?ft_width=1&ft_height=1&url=7740222'
}
];

tags.forEach(function(tag){
	console.log(tag.details);

	var tracking = '%7B%22imp%22%3A%5B%22https%3A%2F%2Fbs.serving-sys.com%2FBurstingPipe%2FadServer.bs%3Fcn%3Dtf%26c%3D19%26mc%3Dimp%26pli%3D14755603%26PluID%3D0%26ord%3D%5Btimestamp%5D%26rtu%3D-1%22%5D%2C%22close%22%3A%5B%5D%2C%22expand%22%3A%5B%5D%2C%22feature1%22%3A%5B%5D%2C%22feature2%22%3A%5B%5D%2C%22feature3%22%3A%5B%5D%2C%22feature4%22%3A%5B%5D%7D';

	console.log(decodeURIComponent(tracking))

	var exit = '%7B%22default%22%3A%7B%22url%22%3A%22http%3A%2F%2Fbs.serving-sys.com%2FBurstingPipe%2FadServer.bs%3Fcn%3Dtf%26c%3D20%26mc%3Dclick%26pli%3D14890365%26PluID%3D0%26ord%3D%5BTIMESTAMP%5D%22%2C%22tracking%22%3A%5B%5D%7D%7D';

	console.log(
		'<script id="goo1441876962037" src="//c1.goote.ch/srv/whitelist-os/serve.js?elementId=goo1441876962037&sceneId=1c3ec4a07d3d44cfb57bd146947dc5d9.scene&sceneName=SamsungS6%20-%20Mobile%20Browser&zIndex=1000&transparentBackground=true&loadingScreen=thumbnail&iframe=false&mraid=false&loadOn=polite&engineVersion=0.15.6&features=statemachine%2Ctimeline%2Cquad%2Cscript%2Chtml&fallback=thumbnail&tracking=' + tracking + '&exit=' + exit + '&whitelist=%5B%22iphone5-chrome-46-*%22%2C%22iphone5-chrome-45-*%22%2C%22iphone6-chrome-46-*%22%2C%22iphone6-chrome-45-*%22%2C%22iphone5-safari-8-*%22%2C%22iphone5-safari-9-*%22%2C%22iphone6-safari-8-*%22%2C%22iphone6-safari-9-*%22%2C%22nexus5-chrome-46-*%22%2C%22nexus5-chrome-45-*%22%2C%22s4-chrome-46-*%22%2C%22s4-chrome-45-*%22%2C%22s5-chrome-46-*%22%2C%22s5-chrome-45-*%22%2C%22s6-chrome-46-*%22%2C%22s6-chrome-45-*%22%5D&catchTouch=true&exitMacro=%%CLICK_URL_ESC%%" type="text/javascript"></script>'
	);
})
