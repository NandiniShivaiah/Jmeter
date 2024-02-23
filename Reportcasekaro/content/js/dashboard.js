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

    var data = {"OkPercent": 88.23529411764706, "KoPercent": 11.764705882352942};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8823529411764706, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "home/apps/sa/verify_cart.js-1,248"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,080"], "isController": false}, {"data": [1.0, 500, 1500, "search/checkouts/internal/preloads.js-1,056"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,007"], "isController": false}, {"data": [0.0, 500, 1500, "home/%3Cscript%20src=-1,212"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/v1/produce-1,041"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,025"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,069"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,024"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,046"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,068"], "isController": false}, {"data": [1.0, 500, 1500, "search/apps/sa/verify_cart.js-1,039"], "isController": false}, {"data": [0.0, 500, 1500, "search/%3Cscript%20src=-1,048"], "isController": false}, {"data": [1.0, 500, 1500, "home/.well-known/shopify/monorail/unstable/produce_batch-1,234"], "isController": false}, {"data": [1.0, 500, 1500, "home/checkouts/internal/preloads.js-1,219"], "isController": false}, {"data": [1.0, 500, 1500, "home/.well-known/shopify/monorail/unstable/produce_batch-1,233"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,020"], "isController": false}, {"data": [1.0, 500, 1500, "home/.well-known/shopify/monorail/unstable/produce_batch-1,210"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,092"], "isController": false}, {"data": [1.0, 500, 1500, "home/.well-known/shopify/monorail/unstable/produce_batch-1,229"], "isController": false}, {"data": [1.0, 500, 1500, "home/.well-known/shopify/monorail/unstable/produce_batch-1,228"], "isController": false}, {"data": [0.0, 500, 1500, "search/.well-known/shopify/monorail/v1/produce-1,187"], "isController": false}, {"data": [1.0, 500, 1500, "home/.well-known/shopify/monorail/v1/produce-1,252"], "isController": false}, {"data": [0.0, 500, 1500, "search/%3Cscript%20src=-998"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/v1/produce-1,103"], "isController": false}, {"data": [1.0, 500, 1500, "home/-1,207"], "isController": false}, {"data": [1.0, 500, 1500, "search/checkouts/internal/preloads.js-1,002"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,019"], "isController": false}, {"data": [1.0, 500, 1500, "search/apps/sa/verify_cart.js-1,101"], "isController": false}, {"data": [1.0, 500, 1500, "search/search-1,043"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,079"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,033"], "isController": false}, {"data": [1.0, 500, 1500, "home/.well-known/shopify/monorail/unstable/produce_batch-1,245"], "isController": false}, {"data": [1.0, 500, 1500, "search/.well-known/shopify/monorail/unstable/produce_batch-1,075"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 34, 4, 11.764705882352942, 304.0, 57, 711, 327.0, 370.5, 578.25, 711.0, 3.2483041941339446, 16.200469332186874, 9.355948307776822], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["home/apps/sa/verify_cart.js-1,248", 1, 0, 0.0, 162.0, 162, 162, 162.0, 162.0, 162.0, 162.0, 6.172839506172839, 8.987991898148147, 7.233796296296296], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,080", 1, 0, 0.0, 336.0, 336, 336, 336.0, 336.0, 336.0, 336.0, 2.976190476190476, 3.255208333333333, 12.68949962797619], "isController": false}, {"data": ["search/checkouts/internal/preloads.js-1,056", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 34.40241228070175, 22.341008771929825], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,007", 1, 0, 0.0, 349.0, 349, 349, 349.0, 349.0, 349.0, 349.0, 2.865329512893983, 3.150743194842407, 5.095473674785101], "isController": false}, {"data": ["home/%3Cscript%20src=-1,212", 1, 1, 100.0, 157.0, 157, 157, 157.0, 157.0, 157.0, 157.0, 6.369426751592357, 159.5528960987261, 7.2464669585987265], "isController": false}, {"data": ["search/.well-known/shopify/monorail/v1/produce-1,041", 1, 0, 0.0, 370.0, 370, 370, 370.0, 370.0, 370.0, 370.0, 2.7027027027027026, 2.956081081081081, 24.237225506756758], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,025", 1, 0, 0.0, 324.0, 324, 324, 324.0, 324.0, 324.0, 324.0, 3.0864197530864197, 3.3878279320987654, 9.729456018518519], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,069", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 3.34480122324159, 6.907611811926605], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,024", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 3.34480122324159, 7.131594036697248], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,046", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 3.3507740825688073, 5.492044151376146], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,068", 1, 0, 0.0, 323.0, 323, 323, 323.0, 323.0, 323.0, 323.0, 3.0959752321981426, 3.398316563467492, 4.840484713622291], "isController": false}, {"data": ["search/apps/sa/verify_cart.js-1,039", 1, 0, 0.0, 156.0, 156, 156, 156.0, 156.0, 156.0, 156.0, 6.41025641025641, 9.346203926282051, 7.512019230769231], "isController": false}, {"data": ["search/%3Cscript%20src=-1,048", 1, 1, 100.0, 534.0, 534, 534, 534.0, 534.0, 534.0, 534.0, 1.8726591760299625, 47.374253862359545, 2.2585293773408237], "isController": false}, {"data": ["home/.well-known/shopify/monorail/unstable/produce_batch-1,234", 1, 0, 0.0, 333.0, 333, 333, 333.0, 333.0, 333.0, 333.0, 3.003003003003003, 3.302130255255255, 9.466497747747747], "isController": false}, {"data": ["home/checkouts/internal/preloads.js-1,219", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 75.0, 13.333333333333334, 26.171875, 16.067708333333336], "isController": false}, {"data": ["home/.well-known/shopify/monorail/unstable/produce_batch-1,233", 1, 0, 0.0, 320.0, 320, 320, 320.0, 320.0, 320.0, 320.0, 3.125, 3.411865234375, 7.281494140625], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,020", 1, 0, 0.0, 310.0, 310, 310, 310.0, 310.0, 310.0, 310.0, 3.225806451612903, 3.5219254032258065, 6.864289314516129], "isController": false}, {"data": ["home/.well-known/shopify/monorail/unstable/produce_batch-1,210", 1, 0, 0.0, 317.0, 317, 317, 317.0, 317.0, 317.0, 317.0, 3.1545741324921135, 3.437992902208202, 5.505101537854889], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,092", 1, 0, 0.0, 335.0, 335, 335, 335.0, 335.0, 335.0, 335.0, 2.985074626865672, 3.259095149253731, 18.63339552238806], "isController": false}, {"data": ["home/.well-known/shopify/monorail/unstable/produce_batch-1,229", 1, 0, 0.0, 334.0, 334, 334, 334.0, 334.0, 334.0, 334.0, 2.9940119760479043, 3.263005239520958, 6.365199288922155], "isController": false}, {"data": ["home/.well-known/shopify/monorail/unstable/produce_batch-1,228", 1, 0, 0.0, 360.0, 360, 360, 360.0, 360.0, 360.0, 360.0, 2.7777777777777777, 3.0327690972222223, 4.147677951388889], "isController": false}, {"data": ["search/.well-known/shopify/monorail/v1/produce-1,187", 1, 1, 100.0, 711.0, 711, 711, 711.0, 711.0, 711.0, 711.0, 1.4064697609001406, 1.535579289732771, 11.44679588607595], "isController": false}, {"data": ["home/.well-known/shopify/monorail/v1/produce-1,252", 1, 0, 0.0, 371.0, 371, 371, 371.0, 371.0, 371.0, 371.0, 2.6954177897574128, 2.9533776954177897, 24.50355879380054], "isController": false}, {"data": ["search/%3Cscript%20src=-998", 1, 1, 100.0, 190.0, 190, 190, 190.0, 190.0, 190.0, 190.0, 5.263157894736842, 131.82051809210526, 6.255139802631579], "isController": false}, {"data": ["search/.well-known/shopify/monorail/v1/produce-1,103", 1, 0, 0.0, 361.0, 361, 361, 361.0, 361.0, 361.0, 361.0, 2.770083102493075, 3.046009349030471, 19.83693299861496], "isController": false}, {"data": ["home/-1,207", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 155.70691167091837, 3.457828443877551], "isController": false}, {"data": ["search/checkouts/internal/preloads.js-1,002", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 33.07070974576271, 21.28575211864407], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,019", 1, 0, 0.0, 319.0, 319, 319, 319.0, 319.0, 319.0, 319.0, 3.134796238244514, 3.422560736677116, 4.686887735109718], "isController": false}, {"data": ["search/apps/sa/verify_cart.js-1,101", 1, 0, 0.0, 340.0, 340, 340, 340.0, 340.0, 340.0, 340.0, 2.941176470588235, 4.696116727941176, 3.5989200367647056], "isController": false}, {"data": ["search/search-1,043", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 280.0, 3.571428571428571, 100.38713727678571, 4.711914062499999], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,079", 1, 0, 0.0, 335.0, 335, 335, 335.0, 335.0, 335.0, 335.0, 2.985074626865672, 3.259095149253731, 7.144939365671641], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,033", 1, 0, 0.0, 345.0, 345, 345, 345.0, 345.0, 345.0, 345.0, 2.898550724637681, 3.175951086956522, 13.094429347826088], "isController": false}, {"data": ["home/.well-known/shopify/monorail/unstable/produce_batch-1,245", 1, 0, 0.0, 350.0, 350, 350, 350.0, 350.0, 350.0, 350.0, 2.857142857142857, 3.1361607142857144, 12.907366071428573], "isController": false}, {"data": ["search/.well-known/shopify/monorail/unstable/produce_batch-1,075", 1, 0, 0.0, 346.0, 346, 346, 346.0, 346.0, 346.0, 346.0, 2.890173410404624, 3.1441925578034686, 7.092779082369943], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 3, 75.0, 8.823529411764707], "isController": false}, {"data": ["Response was null", 1, 25.0, 2.9411764705882355], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 34, 4, "404/Not Found", 3, "Response was null", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["home/%3Cscript%20src=-1,212", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["search/%3Cscript%20src=-1,048", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["search/.well-known/shopify/monorail/v1/produce-1,187", 1, 1, "Response was null", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["search/%3Cscript%20src=-998", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
