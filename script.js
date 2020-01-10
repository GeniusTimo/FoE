const data = [{cost:70,reward:10},{cost:110,reward:15},{cost:200,reward:25},{cost:290,reward:35},{cost:400,reward:45},{cost:510,reward:60},{cost:620,reward:70},{cost:740,reward:85},{cost:860,reward:95},{cost:970,reward:110},{cost:995,reward:120},{cost:1020,reward:135},{cost:1045,reward:150},{cost:1071,reward:165},{cost:1098,reward:180},{cost:1125,reward:195},{cost:1154,reward:210},{cost:1182,reward:225},{cost:1212,reward:240},{cost:1242,reward:255},{cost:1273,reward:270},{cost:1305,reward:290},{cost:1338,reward:305},{cost:1371,reward:320},{cost:1405,reward:335},{cost:1440,reward:355},{cost:1476,reward:370},{cost:1513,reward:385},{cost:1551,reward:405},{cost:1590,reward:420},{cost:1630,reward:435},{cost:1670,reward:455},{cost:1712,reward:470},{cost:1755,reward:490},{cost:1799,reward:505},{cost:1844,reward:525},{cost:1890,reward:540},{cost:1937,reward:560},{cost:1986,reward:575},{cost:2035,reward:595},{cost:2086,reward:615},{cost:2138,reward:630},{cost:2192,reward:650},{cost:2246,reward:670},{cost:2303,reward:685},{cost:2360,reward:705},{cost:2419,reward:725},{cost:2480,reward:740},{cost:2541,reward:760},{cost:2605,reward:780},{cost:2670,reward:800},{cost:2737,reward:815},{cost:2805,reward:835},{cost:2875,reward:855},{cost:2947,reward:875},{cost:3021,reward:895},{cost:3096,reward:915},{cost:3174,reward:930},{cost:3253,reward:950},{cost:3334,reward:970},{cost:3418,reward:990},{cost:3503,reward:1010},{cost:3591,reward:1030},{cost:3681,reward:1050},{cost:3773,reward:1070},{cost:3867,reward:1090},{cost:3964,reward:1110},{cost:4063,reward:1130},{cost:4164,reward:1150},{cost:4268,reward:1170},{cost:4375,reward:1190},{cost:4484,reward:1210},{cost:4596,reward:1230},{cost:4711,reward:1250},{cost:4829,reward:1270},{cost:4950,reward:1290},{cost:5074,reward:1310},{cost:5200,reward:1335},{cost:5330,reward:1355},{cost:5464,reward:1375},{cost:5600,reward:1395},{cost:5740,reward:1415},{cost:5884,reward:1435},{cost:6031,reward:1455},{cost:6182,reward:1480},{cost:6336,reward:1500},{cost:6494,reward:1520},{cost:6657,reward:1540},{cost:6823,reward:1560},{cost:6994,reward:1585},{cost:7169,reward:1605},{cost:7348,reward:1625},{cost:7531,reward:1645},{cost:7720,reward:1670},{cost:7913,reward:1690},{cost:8111,reward:1710},{cost:8313,reward:1735},{cost:8521,reward:1755},{cost:8734,reward:1775},{cost:8952,reward:1800},{cost:9176,reward:1820}]

function copy() {
    var text = document.getElementById('clipboard')
    text.select()
    text.setSelectionRange(0, 100)
    document.execCommand('copy')
}

function create(level, bonus) {
    var table = reward(level, bonus)
    document.write('<div class="container" style="text-align:center"><div class="table-responsive"><table class="table table-hover table-bordered"><thead><tr><th colspan="4">Als Eigentümer musst du nur ' + (data[level].cost - table.summe) + ' von insgesamt ' + data[level].cost + ' FPs einzahlen, um deine Arche von Stufe ' + level + ' auf Stufe ' + (level + 1) + ' zu bringen<div class="progress"><div class="progress-bar" role="progressbar" style="width: ' + (table.summe/data[level].cost*100) + '%" aria-valuemin="0" aria-valuemax="100"></div></div></th></td><tr><th scope="col">Platz</th><th scope="col">Grundbelohnung</th><th scope="col">Mäzenbelohnung inklusive Bonus</th><th scope="col">Eigenbeteiligung zur Platzsicherung</th></tr></thead><tbody>')
    for (i = 0; i < 5; i++) {
        document.write('<tr><th>' + (i + 1) + '</th><td>' + table.nreward[i] + '</td><td>' + table.breward[i] + '</td><td>' + table.sreward[i] + '</td></tr>')
    }
    document.write('</tbody></table></div><br><div class="input-group"><input type="text" class="form-control" id="clipboard" value="Arche')
    for (i = 4; i >= 0; i--) {
        if (table.breward[i] > 0) {
            document.write(' P' + (i + 1) + '(' + table.breward[i] + ')')
        }
    }
    document.write('" readonly><div class="input-group-append"><button class="btn btn-outline-secondary" type="button" onclick="copy()">Kopieren</button></div></div><br><br></div>')
}

function reward(level, bonus) {
    var nreward = [data[level].reward]
    for (i = 1; i < 5; i++) {
        nreward[i] = round(nreward[i - 1] / (i + 1), 5)
    }
    var breward = []
    var summe = 0
    for (i = 0; i < 5; i++) {
        breward[i] = round(nreward[i] * (bonus * 0.01 + 1), 1)
        summe += breward[i]
    }
    var sreward = []
    for (i = 0; i < 5; i++) {
        sreward[i] = data[level].cost - summe - breward[i]
        for (j = 4; j > i; j--) {
            sreward[i] += breward[j]
        }
        if (sreward[i] < 0) {
            sreward[i] = 0
        }
        if (sreward.find(e => e > sreward[i])) {
            sreward[i] = sreward.find(e => e > sreward[i])
        }
    }
    return {breward, nreward, sreward, summe}
}

function round(value, factor) {
    return Math.round(value / factor) * factor
}