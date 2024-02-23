/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 91.35802469135803, "KoPercent": 8.641975308641975};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9111111111111111, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/v1/produce-2,096"], "isController": false}, {"data": [0.9, 500, 1500, "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083"], "isController": false}, {"data": [1.0, 500, 1500, "track/pages/track-order-1-2,776"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544"], "isController": false}, {"data": [0.0, 500, 1500, "track/%3Cscript%20src=-2,697"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911"], "isController": false}, {"data": [1.0, 500, 1500, "track/checkouts/internal/preloads.js-2,700"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919"], "isController": false}, {"data": [1.0, 500, 1500, "track/apps/sa/verify_cart.js-2,823"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/v1/produce-2,773"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/checkouts/internal/preloads.js-1,998"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,794"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,752"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,796"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/-1,889"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452"], "isController": false}, {"data": [0.0, 500, 1500, "mobile/pages/%3Cscript%20src=-2,044"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457"], "isController": false}, {"data": [1.0, 500, 1500, "track/checkouts/internal/preloads.js-2,786"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/pages/mobile-back-covers-2,040"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064"], "isController": false}, {"data": [1.0, 500, 1500, "track/apps/sa/verify_cart.js-2,771"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,819"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941"], "isController": false}, {"data": [0.0, 500, 1500, "track/pages/%3Cscript%20src=-2,782"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/collections/mouse-pad-2,482"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,778"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,738"], "isController": false}, {"data": [0.0, 500, 1500, "mobile/%3Cscript%20src=-1,993"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/checkouts/internal/preloads.js-2,492"], "isController": false}, {"data": [1.0, 500, 1500, "homepage/checkouts/internal/preloads.js-1,899"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/apps/sa/verify_cart.js-2,540"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029"], "isController": false}, {"data": [0.0, 500, 1500, "homepage/%3Cscript%20src=-1,895"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488"], "isController": false}, {"data": [0.9, 500, 1500, "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071"], "isController": false}, {"data": [0.0, 500, 1500, "mobilepad/collections/%3Cscript%20src=-2,486"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/v1/produce-2,548"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,723"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,800"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,724"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,768"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,801"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,725"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/v1/produce-2,830"], "isController": false}, {"data": [1.0, 500, 1500, "track/.well-known/shopify/monorail/unstable/produce_batch-2,726"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517"], "isController": false}, {"data": [0.0, 500, 1500, "mobilepad/%3Cscript%20src=-2,436"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/checkouts/internal/preloads.js-2,442"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518"], "isController": false}, {"data": [1.0, 500, 1500, "mobile/checkouts/internal/preloads.js-2,051"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511"], "isController": false}, {"data": [1.0, 500, 1500, "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 405, 35, 8.641975308641975, 274.0296296296296, 47, 1098, 340.0, 367.0, 380.7, 408.88, 13.637281971849955, 138.68486382710958, 31.413889403326824], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923", 5, 0, 0.0, 353.6, 337, 361, 357.0, 361.0, 361.0, 361.0, 0.7055171440666008, 0.7722105615916467, 1.6432210826160576], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/v1/produce-2,096", 5, 0, 0.0, 360.4, 343, 384, 364.0, 384.0, 384.0, 384.0, 0.7168458781362007, 0.7829301075268817, 6.486615143369176], "isController": false}, {"data": ["homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924", 5, 0, 0.0, 508.2, 350, 1098, 360.0, 1098.0, 1098.0, 1098.0, 0.638814360546825, 0.6990775121374728, 2.013138614731059], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083", 5, 0, 0.0, 374.0, 348, 407, 376.0, 407.0, 407.0, 407.0, 0.7177720356014929, 0.7859043030433535, 3.3750706556847545], "isController": false}, {"data": ["track/pages/track-order-1-2,776", 5, 0, 0.0, 190.2, 140, 253, 192.0, 253.0, 253.0, 253.0, 0.7271669575334496, 18.206584724040138, 0.9600876236183827], "isController": false}, {"data": ["homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928", 5, 0, 0.0, 350.8, 330, 359, 354.0, 359.0, 359.0, 359.0, 0.7039279177812192, 0.7704711037589751, 1.564589786005913], "isController": false}, {"data": ["mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063", 5, 0, 0.0, 63.0, 60, 66, 62.0, 66.0, 66.0, 66.0, 0.7534659433393611, 13.382997334614226, 1.0669195486738998], "isController": false}, {"data": ["mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545", 5, 0, 0.0, 59.0, 47, 83, 53.0, 83.0, 83.0, 83.0, 0.7374631268436578, 23.82121128318584, 0.9247096238938053], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508", 5, 0, 0.0, 342.2, 322, 357, 342.0, 357.0, 357.0, 357.0, 0.716024631247315, 0.7814737576972648, 1.0845255889302592], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008", 5, 0, 0.0, 358.8, 344, 368, 363.0, 368.0, 368.0, 368.0, 0.7091192738618636, 0.7747682066373563, 1.0581389164657495], "isController": false}, {"data": ["mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544", 5, 0, 0.0, 61.0, 47, 73, 61.0, 73.0, 73.0, 73.0, 0.7432733759476735, 19.24061849635796, 0.9319951315593875], "isController": false}, {"data": ["track/%3Cscript%20src=-2,697", 5, 5, 100.0, 165.4, 129, 225, 149.0, 225.0, 225.0, 225.0, 0.7330303474563847, 18.300560768215806, 0.8704735376044569], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046", 5, 0, 0.0, 353.8, 330, 375, 355.0, 375.0, 375.0, 375.0, 0.7216048491845866, 0.7881277962187906, 1.2571709481887718], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467", 5, 0, 0.0, 346.4, 329, 366, 349.0, 366.0, 366.0, 366.0, 0.7098239636570131, 0.7777563351788757, 2.408133251703578], "isController": false}, {"data": ["homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891", 5, 0, 0.0, 362.4, 348, 403, 355.0, 403.0, 403.0, 403.0, 0.6413545407901488, 0.7022331163417137, 1.1192388324140585], "isController": false}, {"data": ["mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543", 5, 0, 0.0, 67.2, 54, 95, 58.0, 95.0, 95.0, 95.0, 0.7413997627520759, 20.0091053158363, 0.9296457962633452], "isController": false}, {"data": ["homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911", 5, 0, 0.0, 349.6, 342, 354, 351.0, 354.0, 354.0, 354.0, 0.6414368184733803, 0.7023232039769083, 0.9571440025657473], "isController": false}, {"data": ["track/checkouts/internal/preloads.js-2,700", 5, 0, 0.0, 79.4, 67, 96, 77.0, 96.0, 96.0, 96.0, 0.7485029940119761, 1.4671828218562875, 0.9392835422904192], "isController": false}, {"data": ["homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919", 5, 0, 0.0, 355.2, 332, 366, 360.0, 366.0, 366.0, 366.0, 0.6402048655569782, 0.6992237516005122, 1.3604353393085789], "isController": false}, {"data": ["track/apps/sa/verify_cart.js-2,823", 5, 0, 0.0, 173.4, 144, 190, 187.0, 190.0, 190.0, 190.0, 0.7371369600471768, 1.0738876142562288, 0.8631125147427392], "isController": false}, {"data": ["track/.well-known/shopify/monorail/v1/produce-2,773", 5, 0, 0.0, 390.6, 361, 423, 390.0, 423.0, 423.0, 423.0, 0.7050197405527354, 0.7733185279187818, 6.277705072617033], "isController": false}, {"data": ["homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874", 5, 0, 0.0, 69.2, 63, 80, 67.0, 80.0, 80.0, 80.0, 0.6639224538573895, 62.54058744688621, 0.41365481011817823], "isController": false}, {"data": ["mobile/checkouts/internal/preloads.js-1,998", 5, 0, 0.0, 74.2, 57, 89, 75.0, 89.0, 89.0, 89.0, 0.7389890629618682, 1.4494000332545078, 0.8898178853827964], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,794", 5, 0, 0.0, 352.4, 333, 367, 357.0, 367.0, 367.0, 367.0, 0.7227522405319456, 0.7905102630818155, 1.0933039263515467], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,752", 5, 0, 0.0, 356.6, 320, 381, 368.0, 381.0, 381.0, 381.0, 0.7109341674960898, 0.775362576425423, 1.2656572142044646], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,796", 5, 0, 0.0, 344.0, 325, 361, 345.0, 361.0, 361.0, 361.0, 0.7211885186787826, 0.7893633708351363, 1.59731988316746], "isController": false}, {"data": ["homepage/-1,889", 5, 0, 0.0, 211.8, 149, 303, 187.0, 303.0, 303.0, 303.0, 0.6534239414532148, 19.860514407997908, 0.44220975725300576], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017", 5, 0, 0.0, 354.4, 339, 364, 359.0, 364.0, 364.0, 364.0, 0.7074136955291453, 0.7745627299094511, 2.2293203080786643], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452", 5, 0, 0.0, 347.2, 334, 360, 344.0, 360.0, 360.0, 360.0, 0.7144898542440697, 0.7803568876821949, 1.5182909402686482], "isController": false}, {"data": ["mobile/pages/%3Cscript%20src=-2,044", 5, 5, 100.0, 185.2, 150, 210, 202.0, 210.0, 210.0, 210.0, 0.7356186552890981, 18.38400098388995, 0.8577428461085773], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015", 5, 0, 0.0, 355.2, 342, 367, 359.0, 367.0, 367.0, 367.0, 0.7084159818645508, 0.7737230801926892, 1.6499727702606972], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456", 5, 0, 0.0, 349.6, 327, 368, 353.0, 368.0, 368.0, 368.0, 0.7124536905101168, 0.7800811306640069, 1.6593770037760045], "isController": false}, {"data": ["mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088", 5, 0, 0.0, 66.4, 54, 85, 61.0, 85.0, 85.0, 85.0, 0.749512816669165, 2.023391826562734, 0.9368910208364563], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457", 5, 0, 0.0, 346.4, 325, 367, 345.0, 367.0, 367.0, 367.0, 0.7106310403638431, 0.7775302906480955, 2.239459343021603], "isController": false}, {"data": ["track/checkouts/internal/preloads.js-2,786", 5, 0, 0.0, 71.0, 64, 85, 68.0, 85.0, 85.0, 85.0, 0.7559721802237678, 1.4824141971575446, 0.9242941109767161], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012", 5, 0, 0.0, 350.0, 343, 356, 350.0, 356.0, 356.0, 356.0, 0.708918190840777, 0.7751023500638027, 1.506451155536651], "isController": false}, {"data": ["mobile/pages/mobile-back-covers-2,040", 5, 0, 0.0, 182.8, 131, 268, 155.0, 268.0, 268.0, 268.0, 0.7284382284382285, 19.09945116732226, 0.9653229257721445], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064", 5, 0, 0.0, 345.0, 331, 357, 347.0, 357.0, 357.0, 357.0, 0.7218131947452, 0.7889192651941678, 1.0954079146816804], "isController": false}, {"data": ["track/apps/sa/verify_cart.js-2,771", 5, 0, 0.0, 167.2, 157, 182, 161.0, 182.0, 182.0, 182.0, 0.7267441860465116, 1.0581792787063953, 0.8509436319040697], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,819", 5, 0, 0.0, 363.6, 348, 373, 369.0, 373.0, 373.0, 373.0, 0.713063320022818, 0.7826984098687964, 3.3250755401454652], "isController": false}, {"data": ["homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941", 5, 0, 0.0, 349.4, 340, 356, 353.0, 356.0, 356.0, 356.0, 0.702543206407194, 0.7689554938878741, 2.539172272376001], "isController": false}, {"data": ["track/pages/%3Cscript%20src=-2,782", 5, 5, 100.0, 184.0, 137, 219, 199.0, 219.0, 219.0, 219.0, 0.7396449704142012, 18.46454326923077, 0.8588260447485208], "isController": false}, {"data": ["mobilepad/collections/mouse-pad-2,482", 5, 0, 0.0, 207.2, 153, 277, 201.0, 277.0, 277.0, 277.0, 0.7215007215007215, 24.63727678571429, 0.9540156024531025], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451", 5, 0, 0.0, 347.0, 335, 357, 345.0, 357.0, 357.0, 357.0, 0.7141836880445651, 0.7791855627767461, 1.0656959720039993], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,778", 5, 0, 0.0, 346.4, 337, 355, 350.0, 355.0, 355.0, 355.0, 0.724952878062926, 0.7929172103813252, 1.263711804045237], "isController": false}, {"data": ["homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876", 5, 0, 0.0, 83.2, 66, 103, 82.0, 103.0, 103.0, 103.0, 0.6623393826996954, 99.40420502715591, 0.4055535087428798], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,738", 5, 0, 0.0, 351.8, 345, 362, 350.0, 362.0, 362.0, 362.0, 0.7129616426636247, 0.780080297305005, 1.6208737344930844], "isController": false}, {"data": ["mobile/%3Cscript%20src=-1,993", 5, 5, 100.0, 173.6, 149, 213, 155.0, 213.0, 213.0, 213.0, 0.7221259387637204, 18.058084876877526, 0.8208540944540728], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529", 5, 0, 0.0, 356.4, 340, 365, 360.0, 365.0, 365.0, 365.0, 0.7070135746606334, 0.7738484516402715, 3.4273587740384617], "isController": false}, {"data": ["mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542", 5, 0, 0.0, 57.6, 51, 66, 58.0, 66.0, 66.0, 66.0, 0.7419498441905327, 19.48516795889598, 0.9556951606321413], "isController": false}, {"data": ["mobilepad/checkouts/internal/preloads.js-2,492", 5, 0, 0.0, 69.4, 65, 79, 69.0, 79.0, 79.0, 79.0, 0.745489786789921, 1.4625868961532726, 0.9129337818696884], "isController": false}, {"data": ["homepage/checkouts/internal/preloads.js-1,899", 5, 0, 0.0, 98.4, 78, 124, 91.0, 124.0, 124.0, 124.0, 0.6640988179041042, 1.3051098253420108, 0.7996424242927348], "isController": false}, {"data": ["mobilepad/apps/sa/verify_cart.js-2,540", 5, 0, 0.0, 180.2, 162, 199, 173.0, 199.0, 199.0, 199.0, 0.7257947452460445, 1.0579308952678181, 0.8498319331543039], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029", 5, 0, 0.0, 370.0, 359, 391, 366.0, 391.0, 391.0, 391.0, 0.70482097547223, 0.7695213384550323, 3.1820189156329293], "isController": false}, {"data": ["homepage/%3Cscript%20src=-1,895", 5, 5, 100.0, 188.2, 148, 217, 202.0, 217.0, 217.0, 217.0, 0.6619009796134498, 16.526322974583003, 0.7523952541699761], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488", 5, 0, 0.0, 344.6, 339, 355, 341.0, 355.0, 355.0, 355.0, 0.7164350193437455, 0.7819216578306347, 1.2481641352629316], "isController": false}, {"data": ["homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875", 5, 0, 0.0, 303.6, 183, 620, 224.0, 620.0, 620.0, 620.0, 0.6178178672927221, 51.287933051711356, 0.38915285586309156], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067", 5, 0, 0.0, 348.0, 329, 366, 348.0, 366.0, 366.0, 366.0, 0.7213966238638003, 0.7895911484634252, 1.6400501370653586], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525", 5, 0, 0.0, 341.6, 323, 359, 337.0, 359.0, 359.0, 359.0, 0.7099247479767145, 0.7742616782621042, 1.9349609097685645], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071", 5, 0, 0.0, 347.8, 318, 365, 348.0, 365.0, 365.0, 365.0, 0.7213966238638003, 0.7895911484634252, 1.7471324484201414], "isController": false}, {"data": ["mobilepad/collections/%3Cscript%20src=-2,486", 5, 5, 100.0, 227.0, 210, 239, 230.0, 239.0, 239.0, 239.0, 0.7285443683520326, 18.22470812691243, 0.8516285243333819], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072", 5, 0, 0.0, 350.4, 334, 362, 351.0, 362.0, 362.0, 362.0, 0.720876585928489, 0.7870508037773933, 2.403391273788927], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/v1/produce-2,548", 5, 0, 0.0, 384.2, 335, 405, 400.0, 405.0, 405.0, 405.0, 0.7072135785007072, 0.7724098302687411, 4.865546543493635], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,723", 5, 0, 0.0, 352.4, 339, 382, 341.0, 382.0, 382.0, 382.0, 0.7169486664754804, 0.7836024878118727, 1.1076296780900488], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,800", 5, 0, 0.0, 346.4, 331, 368, 346.0, 368.0, 368.0, 368.0, 0.7189072609633358, 0.786866462976276, 1.730572654565061], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,724", 5, 0, 0.0, 341.4, 309, 371, 349.0, 371.0, 371.0, 371.0, 0.7187005893344833, 0.7869209968377174, 1.5651389787264627], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,768", 5, 0, 0.0, 348.0, 330, 364, 353.0, 364.0, 364.0, 364.0, 0.7084159818645508, 0.773999805185605, 2.5562471220600735], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,801", 5, 0, 0.0, 347.0, 322, 380, 349.0, 380.0, 380.0, 380.0, 0.7176690110521028, 0.7827077651786997, 2.2924759132338166], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,725", 5, 0, 0.0, 348.6, 330, 362, 349.0, 362.0, 362.0, 362.0, 0.7159221076746849, 0.7849974047823597, 1.7052090045103092], "isController": false}, {"data": ["track/.well-known/shopify/monorail/v1/produce-2,830", 5, 0, 0.0, 391.6, 378, 406, 393.0, 406.0, 406.0, 406.0, 0.7117437722419929, 0.7776356761565836, 6.308385231316725], "isController": false}, {"data": ["track/.well-known/shopify/monorail/unstable/produce_batch-2,726", 5, 0, 0.0, 352.0, 338, 365, 355.0, 365.0, 365.0, 365.0, 0.7135721421435707, 0.7776821392892822, 2.284963920008563], "isController": false}, {"data": ["mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990", 5, 0, 0.0, 352.4, 339, 361, 357.0, 361.0, 361.0, 361.0, 0.7115411982353779, 0.7782481855699445, 1.2438073680091077], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438", 5, 0, 0.0, 349.8, 326, 390, 342.0, 390.0, 390.0, 390.0, 0.715000715000715, 0.7811941405691405, 1.2477600368225368], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516", 5, 0, 0.0, 346.4, 328, 358, 354.0, 358.0, 358.0, 358.0, 0.7108330963889679, 0.7769183608188798, 1.7153013488058004], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517", 5, 0, 0.0, 343.2, 332, 358, 341.0, 358.0, 358.0, 358.0, 0.7134703196347032, 0.7817516588184932, 1.715394459902968], "isController": false}, {"data": ["mobilepad/%3Cscript%20src=-2,436", 5, 5, 100.0, 209.0, 191, 234, 206.0, 234.0, 234.0, 234.0, 0.730887297178775, 18.241633624470108, 0.8308132948399357], "isController": false}, {"data": ["mobilepad/checkouts/internal/preloads.js-2,442", 5, 0, 0.0, 68.6, 55, 76, 72.0, 76.0, 76.0, 76.0, 0.7438262421898244, 1.4617929001785182, 0.895642340449271], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518", 5, 0, 0.0, 349.2, 330, 365, 357.0, 365.0, 365.0, 365.0, 0.71571714858288, 0.7811381691955339, 2.309306112224449], "isController": false}, {"data": ["mobile/checkouts/internal/preloads.js-2,051", 5, 0, 0.0, 71.8, 67, 79, 70.0, 79.0, 79.0, 79.0, 0.751653638003608, 1.4735053837191823, 0.9226842021196633], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511", 5, 0, 0.0, 351.8, 339, 365, 350.0, 365.0, 365.0, 365.0, 0.71571714858288, 0.7816973232178643, 1.5970836762811338], "isController": false}, {"data": ["mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479", 5, 0, 0.0, 360.0, 342, 379, 361.0, 379.0, 379.0, 379.0, 0.7067137809187278, 0.7735203180212014, 1.723995141342756], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 35, 100.0, 8.641975308641975], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 405, 35, "404/Not Found", 35, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["track/%3Cscript%20src=-2,697", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["mobile/pages/%3Cscript%20src=-2,044", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["track/pages/%3Cscript%20src=-2,782", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["mobile/%3Cscript%20src=-1,993", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["homepage/%3Cscript%20src=-1,895", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["mobilepad/collections/%3Cscript%20src=-2,486", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["mobilepad/%3Cscript%20src=-2,436", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
