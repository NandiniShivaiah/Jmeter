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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 5.0, "series": [{"data": [[300.0, 5.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/v1/produce-2,096", "isController": false}, {"data": [[300.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924", "isController": false}, {"data": [[300.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083", "isController": false}, {"data": [[200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "track/pages/track-order-1-2,776", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544", "isController": false}, {"data": [[200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "track/%3Cscript%20src=-2,697", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467", "isController": false}, {"data": [[300.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,700", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,823", "isController": false}, {"data": [[300.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,773", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-1,998", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,794", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,752", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,796", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "homepage/-1,889", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452", "isController": false}, {"data": [[200.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "mobile/pages/%3Cscript%20src=-2,044", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,786", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012", "isController": false}, {"data": [[200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "mobile/pages/mobile-back-covers-2,040", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,771", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,819", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941", "isController": false}, {"data": [[200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "track/pages/%3Cscript%20src=-2,782", "isController": false}, {"data": [[200.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "mobilepad/collections/mouse-pad-2,482", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,778", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,738", "isController": false}, {"data": [[200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "mobile/%3Cscript%20src=-1,993", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,492", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "homepage/checkouts/internal/preloads.js-1,899", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "mobilepad/apps/sa/verify_cart.js-2,540", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029", "isController": false}, {"data": [[100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "homepage/%3Cscript%20src=-1,895", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488", "isController": false}, {"data": [[600.0, 1.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "mobilepad/collections/%3Cscript%20src=-2,486", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072", "isController": false}, {"data": [[300.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/v1/produce-2,548", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,723", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,800", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,724", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,768", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,801", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,725", "isController": false}, {"data": [[300.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,830", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,726", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517", "isController": false}, {"data": [[100.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "mobilepad/%3Cscript%20src=-2,436", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,442", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-2,051", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 368.0, "series": [{"data": [[0.0, 368.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 35.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 4.3481481481481445, "minX": 1.70695266E12, "maxY": 4.3481481481481445, "series": [{"data": [[1.70695266E12, 4.3481481481481445]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70695266E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 57.6, "minX": 1.0, "maxY": 1098.0, "series": [{"data": [[2.0, 337.0], [4.0, 361.0], [5.0, 358.0], [3.0, 354.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923", "isController": false}, {"data": [[3.8, 353.6]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923-Aggregated", "isController": false}, {"data": [[5.0, 360.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/v1/produce-2,096", "isController": false}, {"data": [[5.0, 360.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/v1/produce-2,096-Aggregated", "isController": false}, {"data": [[2.0, 1098.0], [4.0, 357.0], [5.0, 355.0], [3.0, 376.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924", "isController": false}, {"data": [[3.8, 508.2]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924-Aggregated", "isController": false}, {"data": [[5.0, 374.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083", "isController": false}, {"data": [[5.0, 374.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083-Aggregated", "isController": false}, {"data": [[2.0, 154.0], [5.0, 222.5], [3.0, 176.0]], "isOverall": false, "label": "track/pages/track-order-1-2,776", "isController": false}, {"data": [[3.6, 190.2]], "isOverall": false, "label": "track/pages/track-order-1-2,776-Aggregated", "isController": false}, {"data": [[4.0, 353.0], [5.0, 356.0], [3.0, 344.5]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928", "isController": false}, {"data": [[4.0, 350.8]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928-Aggregated", "isController": false}, {"data": [[4.0, 66.0], [5.0, 62.25]], "isOverall": false, "label": "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063", "isController": false}, {"data": [[4.8, 63.0]], "isOverall": false, "label": "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063-Aggregated", "isController": false}, {"data": [[5.0, 59.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545", "isController": false}, {"data": [[5.0, 59.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545-Aggregated", "isController": false}, {"data": [[5.0, 342.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508", "isController": false}, {"data": [[5.0, 342.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508-Aggregated", "isController": false}, {"data": [[4.0, 355.0], [5.0, 365.0], [3.0, 344.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008", "isController": false}, {"data": [[4.4, 358.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008-Aggregated", "isController": false}, {"data": [[5.0, 61.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544", "isController": false}, {"data": [[5.0, 61.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544-Aggregated", "isController": false}, {"data": [[5.0, 174.5], [3.0, 129.0]], "isOverall": false, "label": "track/%3Cscript%20src=-2,697", "isController": false}, {"data": [[4.6, 165.4]], "isOverall": false, "label": "track/%3Cscript%20src=-2,697-Aggregated", "isController": false}, {"data": [[4.0, 355.0], [5.0, 353.5]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046", "isController": false}, {"data": [[4.8, 353.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046-Aggregated", "isController": false}, {"data": [[5.0, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467", "isController": false}, {"data": [[5.0, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467-Aggregated", "isController": false}, {"data": [[1.0, 348.0], [2.0, 403.0], [4.0, 355.0], [5.0, 348.0], [3.0, 358.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891", "isController": false}, {"data": [[3.0, 362.4]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891-Aggregated", "isController": false}, {"data": [[5.0, 67.2]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543", "isController": false}, {"data": [[5.0, 67.2]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543-Aggregated", "isController": false}, {"data": [[2.0, 347.0], [4.0, 351.0], [5.0, 349.0], [3.0, 354.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911", "isController": false}, {"data": [[3.2, 349.6]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911-Aggregated", "isController": false}, {"data": [[5.0, 78.25], [3.0, 84.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,700", "isController": false}, {"data": [[4.6, 79.4]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,700-Aggregated", "isController": false}, {"data": [[2.0, 332.0], [4.0, 363.0], [5.0, 362.0], [3.0, 356.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919", "isController": false}, {"data": [[3.6, 355.2]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919-Aggregated", "isController": false}, {"data": [[2.0, 188.0], [1.0, 144.0], [5.0, 172.5], [3.0, 190.0]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,823", "isController": false}, {"data": [[3.2, 173.4]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,823-Aggregated", "isController": false}, {"data": [[5.0, 365.5], [3.0, 407.3333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,773", "isController": false}, {"data": [[3.8, 390.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,773-Aggregated", "isController": false}, {"data": [[1.0, 65.0], [2.0, 63.0], [4.0, 71.0], [5.0, 67.0], [3.0, 80.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874", "isController": false}, {"data": [[3.0, 69.2]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874-Aggregated", "isController": false}, {"data": [[4.0, 75.0], [5.0, 73.0], [3.0, 75.0]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-1,998", "isController": false}, {"data": [[4.0, 74.2]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-1,998-Aggregated", "isController": false}, {"data": [[2.0, 357.0], [5.0, 337.0], [3.0, 365.5]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,794", "isController": false}, {"data": [[3.6, 352.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,794-Aggregated", "isController": false}, {"data": [[5.0, 346.6666666666667], [3.0, 371.5]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,752", "isController": false}, {"data": [[4.2, 356.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,752-Aggregated", "isController": false}, {"data": [[2.0, 348.0], [5.0, 333.0], [3.0, 353.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,796", "isController": false}, {"data": [[3.6, 344.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,796-Aggregated", "isController": false}, {"data": [[1.0, 303.0], [2.0, 267.0], [4.0, 149.0], [5.0, 187.0], [3.0, 153.0]], "isOverall": false, "label": "homepage/-1,889", "isController": false}, {"data": [[3.0, 211.8]], "isOverall": false, "label": "homepage/-1,889-Aggregated", "isController": false}, {"data": [[4.0, 349.0], [5.0, 358.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017", "isController": false}, {"data": [[4.6, 354.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017-Aggregated", "isController": false}, {"data": [[5.0, 347.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452", "isController": false}, {"data": [[5.0, 347.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452-Aggregated", "isController": false}, {"data": [[4.0, 210.0], [5.0, 179.0]], "isOverall": false, "label": "mobile/pages/%3Cscript%20src=-2,044", "isController": false}, {"data": [[4.8, 185.2]], "isOverall": false, "label": "mobile/pages/%3Cscript%20src=-2,044-Aggregated", "isController": false}, {"data": [[4.0, 350.5], [5.0, 358.3333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015", "isController": false}, {"data": [[4.6, 355.2]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015-Aggregated", "isController": false}, {"data": [[5.0, 349.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456", "isController": false}, {"data": [[5.0, 349.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456-Aggregated", "isController": false}, {"data": [[5.0, 66.4]], "isOverall": false, "label": "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088", "isController": false}, {"data": [[5.0, 66.4]], "isOverall": false, "label": "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088-Aggregated", "isController": false}, {"data": [[5.0, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457", "isController": false}, {"data": [[5.0, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457-Aggregated", "isController": false}, {"data": [[2.0, 64.0], [5.0, 67.5], [3.0, 78.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,786", "isController": false}, {"data": [[3.6, 71.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,786-Aggregated", "isController": false}, {"data": [[4.0, 355.0], [5.0, 350.6666666666667], [3.0, 343.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012", "isController": false}, {"data": [[4.4, 350.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012-Aggregated", "isController": false}, {"data": [[4.0, 268.0], [5.0, 161.5]], "isOverall": false, "label": "mobile/pages/mobile-back-covers-2,040", "isController": false}, {"data": [[4.8, 182.8]], "isOverall": false, "label": "mobile/pages/mobile-back-covers-2,040-Aggregated", "isController": false}, {"data": [[5.0, 345.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064", "isController": false}, {"data": [[5.0, 345.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064-Aggregated", "isController": false}, {"data": [[5.0, 172.66666666666666], [3.0, 159.0]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,771", "isController": false}, {"data": [[4.2, 167.2]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,771-Aggregated", "isController": false}, {"data": [[2.0, 369.0], [1.0, 370.0], [5.0, 360.5], [3.0, 358.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,819", "isController": false}, {"data": [[3.2, 363.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,819-Aggregated", "isController": false}, {"data": [[4.0, 356.0], [5.0, 348.5], [3.0, 347.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941", "isController": false}, {"data": [[4.0, 349.4]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941-Aggregated", "isController": false}, {"data": [[2.0, 137.0], [5.0, 204.5], [3.0, 187.0]], "isOverall": false, "label": "track/pages/%3Cscript%20src=-2,782", "isController": false}, {"data": [[3.6, 184.0]], "isOverall": false, "label": "track/pages/%3Cscript%20src=-2,782-Aggregated", "isController": false}, {"data": [[5.0, 207.2]], "isOverall": false, "label": "mobilepad/collections/mouse-pad-2,482", "isController": false}, {"data": [[5.0, 207.2]], "isOverall": false, "label": "mobilepad/collections/mouse-pad-2,482-Aggregated", "isController": false}, {"data": [[5.0, 347.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451", "isController": false}, {"data": [[5.0, 347.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451-Aggregated", "isController": false}, {"data": [[2.0, 350.0], [5.0, 338.0], [3.0, 353.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,778", "isController": false}, {"data": [[3.6, 346.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,778-Aggregated", "isController": false}, {"data": [[1.0, 85.0], [2.0, 82.0], [4.0, 66.0], [5.0, 103.0], [3.0, 80.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876", "isController": false}, {"data": [[3.0, 83.2]], "isOverall": false, "label": "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876-Aggregated", "isController": false}, {"data": [[5.0, 353.3333333333333], [3.0, 349.5]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,738", "isController": false}, {"data": [[4.2, 351.8]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,738-Aggregated", "isController": false}, {"data": [[4.0, 201.0], [5.0, 152.0], [3.0, 181.5]], "isOverall": false, "label": "mobile/%3Cscript%20src=-1,993", "isController": false}, {"data": [[4.0, 173.6]], "isOverall": false, "label": "mobile/%3Cscript%20src=-1,993-Aggregated", "isController": false}, {"data": [[5.0, 356.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529", "isController": false}, {"data": [[5.0, 356.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529-Aggregated", "isController": false}, {"data": [[5.0, 57.6]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542", "isController": false}, {"data": [[5.0, 57.6]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542-Aggregated", "isController": false}, {"data": [[5.0, 69.4]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,492", "isController": false}, {"data": [[5.0, 69.4]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,492-Aggregated", "isController": false}, {"data": [[1.0, 78.0], [2.0, 91.0], [4.0, 86.0], [5.0, 124.0], [3.0, 113.0]], "isOverall": false, "label": "homepage/checkouts/internal/preloads.js-1,899", "isController": false}, {"data": [[3.0, 98.4]], "isOverall": false, "label": "homepage/checkouts/internal/preloads.js-1,899-Aggregated", "isController": false}, {"data": [[5.0, 180.2]], "isOverall": false, "label": "mobilepad/apps/sa/verify_cart.js-2,540", "isController": false}, {"data": [[5.0, 180.2]], "isOverall": false, "label": "mobilepad/apps/sa/verify_cart.js-2,540-Aggregated", "isController": false}, {"data": [[4.0, 360.0], [5.0, 376.6666666666667]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029", "isController": false}, {"data": [[4.6, 370.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029-Aggregated", "isController": false}, {"data": [[1.0, 148.0], [2.0, 202.0], [4.0, 170.0], [5.0, 217.0], [3.0, 204.0]], "isOverall": false, "label": "homepage/%3Cscript%20src=-1,895", "isController": false}, {"data": [[3.0, 188.2]], "isOverall": false, "label": "homepage/%3Cscript%20src=-1,895-Aggregated", "isController": false}, {"data": [[5.0, 344.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488", "isController": false}, {"data": [[5.0, 344.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488-Aggregated", "isController": false}, {"data": [[1.0, 620.0], [2.0, 224.0], [4.0, 203.0], [5.0, 183.0], [3.0, 288.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875", "isController": false}, {"data": [[3.0, 303.6]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875-Aggregated", "isController": false}, {"data": [[5.0, 348.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067", "isController": false}, {"data": [[5.0, 348.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067-Aggregated", "isController": false}, {"data": [[5.0, 341.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525", "isController": false}, {"data": [[5.0, 341.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525-Aggregated", "isController": false}, {"data": [[5.0, 347.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071", "isController": false}, {"data": [[5.0, 347.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071-Aggregated", "isController": false}, {"data": [[5.0, 227.0]], "isOverall": false, "label": "mobilepad/collections/%3Cscript%20src=-2,486", "isController": false}, {"data": [[5.0, 227.0]], "isOverall": false, "label": "mobilepad/collections/%3Cscript%20src=-2,486-Aggregated", "isController": false}, {"data": [[5.0, 350.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072", "isController": false}, {"data": [[5.0, 350.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072-Aggregated", "isController": false}, {"data": [[4.0, 404.0], [5.0, 379.25]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/v1/produce-2,548", "isController": false}, {"data": [[4.8, 384.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/v1/produce-2,548-Aggregated", "isController": false}, {"data": [[5.0, 355.25], [3.0, 341.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,723", "isController": false}, {"data": [[4.6, 352.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,723-Aggregated", "isController": false}, {"data": [[2.0, 350.0], [1.0, 346.0], [5.0, 334.0], [3.0, 368.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,800", "isController": false}, {"data": [[3.2, 346.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,800-Aggregated", "isController": false}, {"data": [[5.0, 339.5], [3.0, 349.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,724", "isController": false}, {"data": [[4.6, 341.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,724-Aggregated", "isController": false}, {"data": [[5.0, 337.6666666666667], [3.0, 363.5]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,768", "isController": false}, {"data": [[4.2, 348.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,768-Aggregated", "isController": false}, {"data": [[2.0, 359.0], [1.0, 349.0], [5.0, 323.5], [3.0, 380.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,801", "isController": false}, {"data": [[3.2, 347.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,801-Aggregated", "isController": false}, {"data": [[4.0, 362.0], [5.0, 344.0], [3.0, 349.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,725", "isController": false}, {"data": [[4.4, 348.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,725-Aggregated", "isController": false}, {"data": [[4.0, 378.0], [2.0, 393.0], [1.0, 400.0], [5.0, 381.0], [3.0, 406.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,830", "isController": false}, {"data": [[3.0, 391.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,830-Aggregated", "isController": false}, {"data": [[5.0, 346.6666666666667], [3.0, 360.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,726", "isController": false}, {"data": [[4.2, 352.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,726-Aggregated", "isController": false}, {"data": [[4.0, 361.0], [5.0, 354.0], [3.0, 339.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990", "isController": false}, {"data": [[4.4, 352.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990-Aggregated", "isController": false}, {"data": [[5.0, 349.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438", "isController": false}, {"data": [[5.0, 349.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438-Aggregated", "isController": false}, {"data": [[5.0, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516", "isController": false}, {"data": [[5.0, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516-Aggregated", "isController": false}, {"data": [[5.0, 343.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517", "isController": false}, {"data": [[5.0, 343.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517-Aggregated", "isController": false}, {"data": [[5.0, 209.0]], "isOverall": false, "label": "mobilepad/%3Cscript%20src=-2,436", "isController": false}, {"data": [[5.0, 209.0]], "isOverall": false, "label": "mobilepad/%3Cscript%20src=-2,436-Aggregated", "isController": false}, {"data": [[5.0, 68.6]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,442", "isController": false}, {"data": [[5.0, 68.6]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,442-Aggregated", "isController": false}, {"data": [[5.0, 349.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518", "isController": false}, {"data": [[5.0, 349.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518-Aggregated", "isController": false}, {"data": [[4.0, 67.0], [5.0, 73.0]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-2,051", "isController": false}, {"data": [[4.8, 71.8]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-2,051-Aggregated", "isController": false}, {"data": [[5.0, 351.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511", "isController": false}, {"data": [[5.0, 351.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511-Aggregated", "isController": false}, {"data": [[5.0, 360.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479", "isController": false}, {"data": [[5.0, 360.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 15922.0, "minX": 1.70695266E12, "maxY": 70291.85, "series": [{"data": [[1.70695266E12, 70291.85]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70695266E12, 15922.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70695266E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 57.6, "minX": 1.70695266E12, "maxY": 508.2, "series": [{"data": [[1.70695266E12, 353.6]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923", "isController": false}, {"data": [[1.70695266E12, 360.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/v1/produce-2,096", "isController": false}, {"data": [[1.70695266E12, 508.2]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924", "isController": false}, {"data": [[1.70695266E12, 374.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083", "isController": false}, {"data": [[1.70695266E12, 190.2]], "isOverall": false, "label": "track/pages/track-order-1-2,776", "isController": false}, {"data": [[1.70695266E12, 350.8]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928", "isController": false}, {"data": [[1.70695266E12, 63.0]], "isOverall": false, "label": "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063", "isController": false}, {"data": [[1.70695266E12, 59.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545", "isController": false}, {"data": [[1.70695266E12, 342.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508", "isController": false}, {"data": [[1.70695266E12, 358.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008", "isController": false}, {"data": [[1.70695266E12, 61.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544", "isController": false}, {"data": [[1.70695266E12, 165.4]], "isOverall": false, "label": "track/%3Cscript%20src=-2,697", "isController": false}, {"data": [[1.70695266E12, 353.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467", "isController": false}, {"data": [[1.70695266E12, 362.4]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891", "isController": false}, {"data": [[1.70695266E12, 67.2]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543", "isController": false}, {"data": [[1.70695266E12, 349.6]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911", "isController": false}, {"data": [[1.70695266E12, 79.4]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,700", "isController": false}, {"data": [[1.70695266E12, 355.2]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919", "isController": false}, {"data": [[1.70695266E12, 173.4]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,823", "isController": false}, {"data": [[1.70695266E12, 390.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,773", "isController": false}, {"data": [[1.70695266E12, 69.2]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874", "isController": false}, {"data": [[1.70695266E12, 74.2]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-1,998", "isController": false}, {"data": [[1.70695266E12, 352.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,794", "isController": false}, {"data": [[1.70695266E12, 356.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,752", "isController": false}, {"data": [[1.70695266E12, 344.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,796", "isController": false}, {"data": [[1.70695266E12, 211.8]], "isOverall": false, "label": "homepage/-1,889", "isController": false}, {"data": [[1.70695266E12, 354.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017", "isController": false}, {"data": [[1.70695266E12, 347.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452", "isController": false}, {"data": [[1.70695266E12, 185.2]], "isOverall": false, "label": "mobile/pages/%3Cscript%20src=-2,044", "isController": false}, {"data": [[1.70695266E12, 355.2]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015", "isController": false}, {"data": [[1.70695266E12, 349.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456", "isController": false}, {"data": [[1.70695266E12, 66.4]], "isOverall": false, "label": "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457", "isController": false}, {"data": [[1.70695266E12, 71.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,786", "isController": false}, {"data": [[1.70695266E12, 350.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012", "isController": false}, {"data": [[1.70695266E12, 182.8]], "isOverall": false, "label": "mobile/pages/mobile-back-covers-2,040", "isController": false}, {"data": [[1.70695266E12, 345.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064", "isController": false}, {"data": [[1.70695266E12, 167.2]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,771", "isController": false}, {"data": [[1.70695266E12, 363.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,819", "isController": false}, {"data": [[1.70695266E12, 349.4]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941", "isController": false}, {"data": [[1.70695266E12, 184.0]], "isOverall": false, "label": "track/pages/%3Cscript%20src=-2,782", "isController": false}, {"data": [[1.70695266E12, 207.2]], "isOverall": false, "label": "mobilepad/collections/mouse-pad-2,482", "isController": false}, {"data": [[1.70695266E12, 347.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,778", "isController": false}, {"data": [[1.70695266E12, 83.2]], "isOverall": false, "label": "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876", "isController": false}, {"data": [[1.70695266E12, 351.8]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,738", "isController": false}, {"data": [[1.70695266E12, 173.6]], "isOverall": false, "label": "mobile/%3Cscript%20src=-1,993", "isController": false}, {"data": [[1.70695266E12, 356.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529", "isController": false}, {"data": [[1.70695266E12, 57.6]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542", "isController": false}, {"data": [[1.70695266E12, 69.4]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,492", "isController": false}, {"data": [[1.70695266E12, 98.4]], "isOverall": false, "label": "homepage/checkouts/internal/preloads.js-1,899", "isController": false}, {"data": [[1.70695266E12, 180.2]], "isOverall": false, "label": "mobilepad/apps/sa/verify_cart.js-2,540", "isController": false}, {"data": [[1.70695266E12, 370.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029", "isController": false}, {"data": [[1.70695266E12, 188.2]], "isOverall": false, "label": "homepage/%3Cscript%20src=-1,895", "isController": false}, {"data": [[1.70695266E12, 344.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488", "isController": false}, {"data": [[1.70695266E12, 303.6]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875", "isController": false}, {"data": [[1.70695266E12, 348.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067", "isController": false}, {"data": [[1.70695266E12, 341.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525", "isController": false}, {"data": [[1.70695266E12, 347.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071", "isController": false}, {"data": [[1.70695266E12, 227.0]], "isOverall": false, "label": "mobilepad/collections/%3Cscript%20src=-2,486", "isController": false}, {"data": [[1.70695266E12, 350.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072", "isController": false}, {"data": [[1.70695266E12, 384.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/v1/produce-2,548", "isController": false}, {"data": [[1.70695266E12, 352.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,723", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,800", "isController": false}, {"data": [[1.70695266E12, 341.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,724", "isController": false}, {"data": [[1.70695266E12, 348.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,768", "isController": false}, {"data": [[1.70695266E12, 347.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,801", "isController": false}, {"data": [[1.70695266E12, 348.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,725", "isController": false}, {"data": [[1.70695266E12, 391.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,830", "isController": false}, {"data": [[1.70695266E12, 352.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,726", "isController": false}, {"data": [[1.70695266E12, 352.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990", "isController": false}, {"data": [[1.70695266E12, 349.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516", "isController": false}, {"data": [[1.70695266E12, 343.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517", "isController": false}, {"data": [[1.70695266E12, 209.0]], "isOverall": false, "label": "mobilepad/%3Cscript%20src=-2,436", "isController": false}, {"data": [[1.70695266E12, 68.6]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,442", "isController": false}, {"data": [[1.70695266E12, 349.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518", "isController": false}, {"data": [[1.70695266E12, 71.8]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-2,051", "isController": false}, {"data": [[1.70695266E12, 351.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511", "isController": false}, {"data": [[1.70695266E12, 360.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70695266E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 57.2, "minX": 1.70695266E12, "maxY": 508.2, "series": [{"data": [[1.70695266E12, 353.6]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923", "isController": false}, {"data": [[1.70695266E12, 360.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/v1/produce-2,096", "isController": false}, {"data": [[1.70695266E12, 508.2]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924", "isController": false}, {"data": [[1.70695266E12, 374.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083", "isController": false}, {"data": [[1.70695266E12, 190.2]], "isOverall": false, "label": "track/pages/track-order-1-2,776", "isController": false}, {"data": [[1.70695266E12, 350.8]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928", "isController": false}, {"data": [[1.70695266E12, 62.8]], "isOverall": false, "label": "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063", "isController": false}, {"data": [[1.70695266E12, 58.2]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545", "isController": false}, {"data": [[1.70695266E12, 342.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508", "isController": false}, {"data": [[1.70695266E12, 358.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008", "isController": false}, {"data": [[1.70695266E12, 60.8]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544", "isController": false}, {"data": [[1.70695266E12, 165.2]], "isOverall": false, "label": "track/%3Cscript%20src=-2,697", "isController": false}, {"data": [[1.70695266E12, 353.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467", "isController": false}, {"data": [[1.70695266E12, 362.4]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891", "isController": false}, {"data": [[1.70695266E12, 66.8]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543", "isController": false}, {"data": [[1.70695266E12, 349.6]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911", "isController": false}, {"data": [[1.70695266E12, 79.2]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,700", "isController": false}, {"data": [[1.70695266E12, 355.2]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919", "isController": false}, {"data": [[1.70695266E12, 173.4]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,823", "isController": false}, {"data": [[1.70695266E12, 390.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,773", "isController": false}, {"data": [[1.70695266E12, 63.6]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874", "isController": false}, {"data": [[1.70695266E12, 74.2]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-1,998", "isController": false}, {"data": [[1.70695266E12, 352.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,794", "isController": false}, {"data": [[1.70695266E12, 356.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,752", "isController": false}, {"data": [[1.70695266E12, 344.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,796", "isController": false}, {"data": [[1.70695266E12, 211.4]], "isOverall": false, "label": "homepage/-1,889", "isController": false}, {"data": [[1.70695266E12, 354.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017", "isController": false}, {"data": [[1.70695266E12, 347.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452", "isController": false}, {"data": [[1.70695266E12, 184.8]], "isOverall": false, "label": "mobile/pages/%3Cscript%20src=-2,044", "isController": false}, {"data": [[1.70695266E12, 355.2]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015", "isController": false}, {"data": [[1.70695266E12, 349.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456", "isController": false}, {"data": [[1.70695266E12, 66.4]], "isOverall": false, "label": "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457", "isController": false}, {"data": [[1.70695266E12, 70.8]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,786", "isController": false}, {"data": [[1.70695266E12, 350.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012", "isController": false}, {"data": [[1.70695266E12, 182.8]], "isOverall": false, "label": "mobile/pages/mobile-back-covers-2,040", "isController": false}, {"data": [[1.70695266E12, 345.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064", "isController": false}, {"data": [[1.70695266E12, 167.2]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,771", "isController": false}, {"data": [[1.70695266E12, 363.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,819", "isController": false}, {"data": [[1.70695266E12, 349.4]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941", "isController": false}, {"data": [[1.70695266E12, 183.8]], "isOverall": false, "label": "track/pages/%3Cscript%20src=-2,782", "isController": false}, {"data": [[1.70695266E12, 207.2]], "isOverall": false, "label": "mobilepad/collections/mouse-pad-2,482", "isController": false}, {"data": [[1.70695266E12, 347.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,778", "isController": false}, {"data": [[1.70695266E12, 66.4]], "isOverall": false, "label": "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876", "isController": false}, {"data": [[1.70695266E12, 351.8]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,738", "isController": false}, {"data": [[1.70695266E12, 173.0]], "isOverall": false, "label": "mobile/%3Cscript%20src=-1,993", "isController": false}, {"data": [[1.70695266E12, 356.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529", "isController": false}, {"data": [[1.70695266E12, 57.2]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542", "isController": false}, {"data": [[1.70695266E12, 69.2]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,492", "isController": false}, {"data": [[1.70695266E12, 98.4]], "isOverall": false, "label": "homepage/checkouts/internal/preloads.js-1,899", "isController": false}, {"data": [[1.70695266E12, 180.0]], "isOverall": false, "label": "mobilepad/apps/sa/verify_cart.js-2,540", "isController": false}, {"data": [[1.70695266E12, 370.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029", "isController": false}, {"data": [[1.70695266E12, 188.0]], "isOverall": false, "label": "homepage/%3Cscript%20src=-1,895", "isController": false}, {"data": [[1.70695266E12, 344.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488", "isController": false}, {"data": [[1.70695266E12, 286.8]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875", "isController": false}, {"data": [[1.70695266E12, 348.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067", "isController": false}, {"data": [[1.70695266E12, 341.6]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525", "isController": false}, {"data": [[1.70695266E12, 347.8]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071", "isController": false}, {"data": [[1.70695266E12, 226.6]], "isOverall": false, "label": "mobilepad/collections/%3Cscript%20src=-2,486", "isController": false}, {"data": [[1.70695266E12, 350.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072", "isController": false}, {"data": [[1.70695266E12, 384.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/v1/produce-2,548", "isController": false}, {"data": [[1.70695266E12, 352.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,723", "isController": false}, {"data": [[1.70695266E12, 346.2]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,800", "isController": false}, {"data": [[1.70695266E12, 341.4]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,724", "isController": false}, {"data": [[1.70695266E12, 348.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,768", "isController": false}, {"data": [[1.70695266E12, 347.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,801", "isController": false}, {"data": [[1.70695266E12, 348.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,725", "isController": false}, {"data": [[1.70695266E12, 391.6]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,830", "isController": false}, {"data": [[1.70695266E12, 352.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,726", "isController": false}, {"data": [[1.70695266E12, 352.4]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990", "isController": false}, {"data": [[1.70695266E12, 349.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438", "isController": false}, {"data": [[1.70695266E12, 346.4]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516", "isController": false}, {"data": [[1.70695266E12, 343.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517", "isController": false}, {"data": [[1.70695266E12, 208.8]], "isOverall": false, "label": "mobilepad/%3Cscript%20src=-2,436", "isController": false}, {"data": [[1.70695266E12, 68.6]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,442", "isController": false}, {"data": [[1.70695266E12, 349.2]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518", "isController": false}, {"data": [[1.70695266E12, 71.6]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-2,051", "isController": false}, {"data": [[1.70695266E12, 351.8]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511", "isController": false}, {"data": [[1.70695266E12, 360.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70695266E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.70695266E12, "maxY": 214.4, "series": [{"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/v1/produce-2,096", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/pages/track-order-1-2,776", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/%3Cscript%20src=-2,697", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,700", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,823", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,773", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-1,998", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,794", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,752", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,796", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/-1,889", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/pages/%3Cscript%20src=-2,044", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,786", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/pages/mobile-back-covers-2,040", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,771", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,819", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/pages/%3Cscript%20src=-2,782", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/collections/mouse-pad-2,482", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,778", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,738", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/%3Cscript%20src=-1,993", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,492", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/checkouts/internal/preloads.js-1,899", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/apps/sa/verify_cart.js-2,540", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "homepage/%3Cscript%20src=-1,895", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488", "isController": false}, {"data": [[1.70695266E12, 214.4]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/collections/%3Cscript%20src=-2,486", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/v1/produce-2,548", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,723", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,800", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,724", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,768", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,801", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,725", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,830", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,726", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/%3Cscript%20src=-2,436", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,442", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-2,051", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511", "isController": false}, {"data": [[1.70695266E12, 0.0]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70695266E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 47.0, "minX": 1.70695266E12, "maxY": 1098.0, "series": [{"data": [[1.70695266E12, 1098.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.70695266E12, 368.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.70695266E12, 413.0600000000003]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.70695266E12, 381.45]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.70695266E12, 47.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.70695266E12, 343.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70695266E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 85.0, "minX": 1.0, "maxY": 400.0, "series": [{"data": [[8.0, 350.5], [11.0, 339.0], [12.0, 358.0], [13.0, 343.5], [14.0, 354.5], [15.0, 349.0], [16.0, 341.0], [4.0, 347.5], [1.0, 400.0], [17.0, 341.5], [18.0, 345.0], [19.0, 339.0], [5.0, 267.0], [20.0, 338.5], [22.0, 323.0], [6.0, 85.0], [7.0, 357.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[11.0, 208.5], [12.0, 155.0], [13.0, 150.0], [14.0, 190.0], [15.0, 204.0], [16.0, 195.0], [17.0, 227.5], [18.0, 191.0], [19.0, 206.0], [5.0, 202.0], [20.0, 217.5], [22.0, 210.0], [6.0, 148.0], [7.0, 137.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 78.0, "minX": 1.0, "maxY": 400.0, "series": [{"data": [[8.0, 350.5], [11.0, 339.0], [12.0, 358.0], [13.0, 343.5], [14.0, 354.5], [15.0, 349.0], [16.0, 341.0], [4.0, 347.5], [1.0, 400.0], [17.0, 341.5], [18.0, 345.0], [19.0, 339.0], [5.0, 266.0], [20.0, 338.5], [22.0, 323.0], [6.0, 78.0], [7.0, 357.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[11.0, 208.5], [12.0, 155.0], [13.0, 150.0], [14.0, 189.5], [15.0, 204.0], [16.0, 194.0], [17.0, 226.5], [18.0, 191.0], [19.0, 205.5], [5.0, 202.0], [20.0, 217.5], [22.0, 209.0], [6.0, 148.0], [7.0, 137.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 6.75, "minX": 1.70695266E12, "maxY": 6.75, "series": [{"data": [[1.70695266E12, 6.75]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70695266E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.5833333333333334, "minX": 1.70695266E12, "maxY": 6.166666666666667, "series": [{"data": [[1.70695266E12, 6.166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.70695266E12, 0.5833333333333334]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70695266E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.70695266E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/pages/mobile-back-covers-2,040-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,924-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/checkouts/internal/preloads.js-1,899-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,438-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-1,990-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,451-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_soft_Style.png-1,874-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,511-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,517-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0006_284b2ae1-aa24-4a0b-83f4-e2ec42489889_360x.jpg-2,542-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,029-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,046-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/v1/produce-2,096-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,794-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,823-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,928-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/%3Cscript%20src=-1,993-failure", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/wpm@cc636c01w77d84d94p0e8bf2ddmd75d25ae/web-pixel-shopify-custom-pixel@0575/sandbox/modern/pages/mobile-back-covers-2,063-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,492-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/pages/%3Cscript%20src=-2,044-failure", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,726-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/apps/sa/verify_cart.js-2,540-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,067-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,479-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,786-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,724-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-1,998-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,801-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,919-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0022-A_360x.jpg-2,544-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/cdn/shop/files/Banner_2_1728x.jpg-1,876-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/%3Cscript%20src=-2,697-failure", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,738-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/cdn/shop/files/Ckfinalpng_32x32.png-2,088-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,012-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,072-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0013-A_360x.jpg-2,543-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,941-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,796-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,516-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,456-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,017-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,923-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,452-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,830-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/collections/mouse-pad-2,482-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/apps/sa/verify_cart.js-2,771-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,064-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/v1/produce-2,548-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,778-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,015-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,518-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,467-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,819-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/cdn/shop/files/Website_Banner_Pop_Style_1_1296x.png-1,875-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,525-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,891-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,083-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/%3Cscript%20src=-1,895-failure", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,723-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/pages/%3Cscript%20src=-2,782-failure", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,008-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,725-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,508-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,768-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/v1/produce-2,773-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/.well-known/shopify/monorail/unstable/produce_batch-2,071-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobile/checkouts/internal/preloads.js-2,051-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/checkouts/internal/preloads.js-2,442-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,800-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,457-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/pages/track-order-1-2,776-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/cdn/shop/products/MOUSEPAD-0021-A_360x.jpg-2,545-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,488-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/checkouts/internal/preloads.js-2,700-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/%3Cscript%20src=-2,436-failure", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/-1,889-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "homepage/.well-known/shopify/monorail/unstable/produce_batch-1,911-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/.well-known/shopify/monorail/unstable/produce_batch-2,529-success", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "mobilepad/collections/%3Cscript%20src=-2,486-failure", "isController": false}, {"data": [[1.70695266E12, 0.08333333333333333]], "isOverall": false, "label": "track/.well-known/shopify/monorail/unstable/produce_batch-2,752-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70695266E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.5833333333333334, "minX": 1.70695266E12, "maxY": 6.166666666666667, "series": [{"data": [[1.70695266E12, 6.166666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.70695266E12, 0.5833333333333334]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70695266E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
