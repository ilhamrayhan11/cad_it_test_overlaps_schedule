//Javascript Test CAD IT
//Ilham Rayhan

var a = 4 //number of files
var c = 0

for (let b = 0; b < a; b++)  {
    c = b+1
    let data = require('./input/schedule_'+c+'.json')
    var x = data.length
    var count = 0
    var temp = 0
    const y = []

    function convertTimeToNumber(time) {
        const hours = Number(time.split(':')[0]);
        const minutes = Number(time.split(':')[1]) / 60;
        return hours + minutes;
    }

    function sorter(a, b){
        return a - b;
    }

    for (let i = 0; i < x; i++) {
        y[i] = new Object();
        
    }

    for (let i = 0; i < x; i++) {
        y[i].id = data[i].id;
        y[i].start = data[i].start.split(",");
        y[i].end = data[i].end.split(",");
        y[i].overlaps = [data[i].id];
    }

    for (let i = 0; i < x; i++) {
        count = 0;
        for (let j = 0; j < x; j++) {
            if(y[i].id != y[j].id){
                if (y[i].start[0] == y[j].start[0]) {
                    if (y[i].end[0] == y[j].end[0]) {
                        temp = y[i].overlaps[count] - 1;
                        var start_hour_1 = convertTimeToNumber(y[i].start[1]);
                        var start_hour_2 = convertTimeToNumber(y[j].start[1]);
                        var end_hour_1 = convertTimeToNumber(y[i].end[1]);
                        var end_hour_2 = convertTimeToNumber(y[j].end[1]);
                        if(count>x-1){
                            count = 0;
                        }
                        if(j == 0){
                            if (end_hour_1 > start_hour_2 && start_hour_1 < end_hour_2) {
                                y[i].overlaps.push(y[j].id);
                                count = count+1;
                                temp = y[i].overlaps[count] - 1 ;
                            }
                        }
                        else {
                            var start_hour_3 = convertTimeToNumber(y[temp].start[1]);
                            var end_hour_3 = convertTimeToNumber(y[temp].end[1]);
                                if (end_hour_2 > start_hour_3 && start_hour_2 < end_hour_3) {
                                    if (end_hour_1 > start_hour_2 && start_hour_1 < end_hour_2) {
                                        y[i].overlaps.push(y[j].id);
                                        count = count+1;
                                        temp = y[i].overlaps[count] - 1;
                                    }
                                }
                        }
                    }
                }
            }
        }
        
    }

    for (let i = 0; i < x; i++) {
        y[i].start = y[i].start[0]+","+y[i].start[1];
        y[i].end = y[i].end[0]+","+y[i].end[1];
        y[i].overlaps.sort(sorter);
    }

    var json = JSON.stringify(y, null, 4);

    var fs = require('fs');
    fs.writeFileSync('output/overlaps_schedule_'+c+'.json', json)
}
