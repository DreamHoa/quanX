if ($response.statusCode != 200) {
    $done(Null);
  }

var body = $response.body;
var obj = JSON.parse(body);
var title = obj['city'];
var subtitle = obj['country'] + ' ' + obj['isp'];
var ip = obj['query'];
var description = "国家" + ":" + obj['country'] + '\n' + "地区" + ":" + obj['regionName'] + '\n' + "城市" + ":" + obj['city'] + '\n' + "运营商" + ":" + obj['isp'] + '\n' + "IP" + ":" + obj['query'];
  
  
$done({title, subtitle, ip, description});
