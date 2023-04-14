const url = "";
const method = "POST";
const headers = {"Field": "chrome"};

const myRequest = {
    url: url,
    method: method, 
    headers: headers
};

$task.fetch(myRequest).then(response => {
    // console.log(response.body);
    var bodyJson = JSON.parse(response.body);
    var resetDay = bodyJson.bw_reset_day_of_month;
    var limit = bodyJson.monthly_bw_limit_b;
    var counter = bodyJson.bw_counter_b;
    var allowance = ((limit - counter) / 1000000000);
    allowance = allowance.toFixed(3);
    var nowDate = new Date();
    var nowDay = nowDate.getDate();
    var nextDay = 0;
    if ( nowDay <= resetDay ) {
        nextDay = resetDay - nowDay;
    } else {
        var nextDate = new Date();
        nextDate.setMonth(nowDate.getMonth() + 1);
        nextDate.setDate(resetDay);
        var nowTime = nowDate.getTime();
        var nextTime = nextDate.getTime();
        nextDay = (nextTime - nowTime) / (1000 * 60 * 60 * 24);
        nextDay = nextDay.toFixed(0);
    }
    $notify("本月剩余:                   " + allowance + "   GB", "距离下次重置还有:   " + nextDay + "              天"); // Success!
    $done();
}, reason => {
    $notify("error:", reason.error); // Error!
    $done();
});
