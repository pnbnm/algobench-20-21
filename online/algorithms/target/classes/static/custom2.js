 //JavaScript code



 
 var $$;
 var index = 0;
 
 layui.use(['form', 'layer', 'element', 'upload'], function () {

    globalPar = {
        alertSortStep: 0,
        willPushData:'',
    };

    var
        form = layui.form,
        $ = layui.$,
        layer = layui.layer,
        element = layui.element,
        upload = layui.upload;

        var index = 0;
       $$ = $;

       var uploadInst = upload.render({
        elem: '#test1' //Binding element
        ,url: '/common/upload', //Upload interface
        accept:'file',
        done: function(res){
          var task = res;
          var imgName = getImgName(task.algorithm);
          var s = '<div id="' + task.taskID + '" class="oneTask"><span class="image">' + imgName + '</span><span class="taskName">' + task.taskID + '[queued]</span></div>';
          if ($(".left-side.active #" + task.taskID).length != 0) {
              layer.alert('this task had loaded', {icon: 5,title:'info',btn:'OK'})
              return;
          }

          $('.left-side.active').append(s);
            $("#" + task.taskID).data("task", task);
            $("#" + task.taskID).data("taskSerialize", trans(task, true));
            $("#" + task.taskID).click();
        },
        error: function(){
          //Request exception callback
        }
      });

       $("input[name='ram']").parent().parent().hide();


        // **Category display
       $('#alertNorthWest li').on('click', function() {
           var t = $(this);
           t.parent().children('li').removeClass('selected');
           t.addClass('selected');

           var sort = t.text();

           
           $("#alertNorthEast").empty();
           if ('Sort' == sort) {
                $("#alertNorthEast").append(globalPar.formSort);
           } 
           if ("Graph" == sort) {
                $("#alertNorthEast").append(globalPar.formGraph);
            }
            if ("Hash" == sort) {
                $("#alertNorthEast").append(globalPar.formHash);
            }
            if ("Search" == sort) {
                $("#alertNorthEast").append(globalPar.formSearch);
            }

           form.render();
           
           if ("Graph" == sort) {
               // Changing algorithm options
              /*  $("select[name='algorithm']").empty();
               var str = '<option value="BREADTH-FIRST_SEARCH">Breadth-First Search</option>'
                         + '<option value="DEPTH-FIRST_SEARCH">Depth-First Search</option>';
               $("select[name='algorithm']").append(str);
               form.render(); */
           }

       });


       form.on('select(aihao)', function(data){
        var option = data.value;
        if ("QUICKSORT" != option) {
            $("select[name='pivotPosition']").parent().parent().hide();
            
        } else {
            
            $("select[name='pivotPosition']").parent().parent().show();
        }
        if ("EXTERNAL_MERGESORT" == option) {
            $("input[name='ram']").parent().parent().show();
        } else {
            $("input[name='ram']").parent().parent().hide();
        }
        return false;
      });

      form.on('select(inputFinalSize)', function(data){
        var final = $('select[name="inputFinalSize"]').val();
        var init = $('select[name="inputStartSize"]').val();
        var step = $('select[name="inputStepSize"]').val();
        if (final && init &step) {
            var num = (final-init)/step;
            $('#noOfExe').text(parseInt(num));
        } else {
            $('#noOfExe').text('--');
        }
      });
      form.on('select(inputFinalSize)', function(data){
        var final = $('select[name="inputFinalSize"]').val();
        var init = $('select[name="inputStartSize"]').val();
        var step = $('select[name="inputStepSize"]').val();
        if (final && init &step) {
            var num = (final-init)/step;
            $('#noOfExe').text(parseInt(num));
        } else {
            $('#noOfExe').text('--');
        }
      });
      form.on('select(inputStartSize)', function(data){
        var final = $('select[name="inputFinalSize"]').val();
        var init = $('select[name="inputStartSize"]').val();
        var step = $('select[name="inputStepSize"]').val();
        if (final && init &step) {
            var num = (final-init)/step;
            $('#noOfExe').text(parseInt(num));
        } else {
            $('#noOfExe').text('--');
        }
      });

      form.on('input(hashFunction_a)', function(data){
        alert();
      });

      $('input[name="hashFunction_a"]').on('change',function() {
          alert();
      });
      
// Initialization task after page loading
/* $.post("/common/gett", {}, function(data) {
    console.log(data);
    for (var i=0; i<data.length; i++) {
        var task = data[i];
        var s = '<div id="' + task.taskID + '" class="oneTask"><span class="taskName">' + task.taskID + '</span></div>';
        $('.left-side.archive').append(s);
        $('.left-side.archive #' + task.taskID).data('task', task);
    }
}, 'json'); */
$('li.layui-nav-item').unbind();
$('li.layui-nav-item button').on("mouseover", function() {
    $(this).css("height", "40px");
});
$('li.layui-nav-item button').on("mouseout", function() {
    $(this).css("height", "30px");
});

$("#toclip").on('click', function() {
    var willSave = $('.left-side.active .onC');
    var value = willSave.data('number');
    $('#toclip').attr('data-clipboard-text', value);
    var clipboard = new ClipboardJS('#toclip');
    clipboard.on('success', function (e) {
        layer.alert('copy success', {icon: 6,title:'info',btn:'OK'})
    });
    clipboard.on('error', function (e) {
        layer.alert('unsupport this browser', {icon: 5,title:'info',btn:'OK'})
    });
});


$("#toTabExp").on('click', function() {
    var willSave = $('.left-side.active .onC');
    var value = willSave.data('number');
    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0);
    if (isIE) {
         
         var winSave = window.open();
         winSave.document.open("text","utf-8");
         winSave.document.write(value);
         winSave.document.execCommand("SaveAs",true,"numbers.txt");
         winSave.close();
    } else {
         
         var mimeType =  'text/plain';
         $('#createInvote').attr('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(value));
         document.getElementById('createInvote').click();
    }
    

});


    // Create task window
    $("#createTask").on("click", function () {
        // Select sort category by default
        $('#alertNorthWest li').removeClass('selected');
        $('#alertNorthWest li').first().click();
        layer.open({
            type: 1,
            area: ['800px', '560px'],
            shadeClose: true, //Click mask closure
            content: $("#alertDiv"),
            title: "creating tasks",
            end: function(index, layero){ 
                $('.alert-sort.show').removeClass('show');
                $('.alert-sort.one').addClass('show');
                globalPar.alertSortStep = 0;
              }    
        });


    });

    // delete artive task
    $("#deleteTask").on("click", function () {
        var willR = $('.left-side.active .onC');
        if (!willR.size()) {
            layer.alert('select an active task', {icon: 5,title:'info',btn:'OK'})
            return;
        }
        willR.remove();
        $("#mainDis").hide();
        $("#paintTable").hide();
        $("#compareChart").hide();
        $("#paintChart").hide();
        $('.layui-body').css('background', "url(awb_splash_screen_no_border.jpg) no-repeat center");
    });

    $("#reStartTask").on("click", function () {
        $('#startTask').click();
    });

    $("#stopTask").on("click", function () {
        var willR = $('.left-side.active .onC');
        if (!willR.size()) {
            layer.alert('select an active task', {icon: 5,title:'info',btn:'OK'})
            return;
        }
        websocket.close();
    });

    $("#saveTask").on("click", function () {
        
        var willR = $('.left-side.active .onC');
        var task = willR.data('task');
        var taskSerialize = willR.data('taskSerialize');
        if (!willR.size()) {
            layer.alert('select an active task', {icon: 5,title:'info',btn:'OK'})
            return;
        }
        $.post("/common/save", task, function(data) {
            
            var s = '<div id="' + task.taskID + '" class="oneTask"><span class="taskName">' + task.taskID + '</span></div>';
            $('.left-side.archive').append(s);
            $('.left-side.archive #' + task.taskID).data('task', task);
            $(willR).data('saved', '1');
            var form = $('<form method="POST" action="' + "/common/save" + '">');
                $.each(task, function(k, v) {
                    form.append($('<input type="hidden" name="' + k +
                            '" value="' + v + '">'));
                });
                $('body').append(form);
                form.submit(); //Automatic submission
        });
        /* var href = "/common/save?" + taskSerialize;
        console.log(href);
        $("#downTask").attr("href", href);
        $("#downTask p").click(); */
    });

    //TODO
     $("#printReport").on("click", function () {

         var willR = $('.left-side.active .onC');
         var task = willR.data('task');
         var chartData = willR.data('chartData');
         console.log(chartData);
         var taskSerialize = willR.data('taskSerialize');
         if (!willR.size()) {
             layer.alert('select an active task', {icon: 5,title:'info',btn:'OK'})
             return;
         }

         data = task;
         data.x = chartData.x;
         data.y = chartData.y;

         $.post("/common/print", data, function(data) {

             var s = '<div id="' + task.taskID + '" class="oneTask"><span class="taskName">' + task.taskID + '</span></div>';
             $('.left-side.archive').append(s);
             $('.left-side.archive #' + task.taskID).data('task', task);
             var form = $('<form method="POST" action="' + "/common/print" + '">');
             $.each(task, function(k, v) {
                 form.append($('<input type="hidden" name="' + k +
                     '" value="' + v + '">'));
             });
             $('body').append(form);
             form.submit(); //Automatic submission
         });

     });

    $(".nextBtn").on("click", function () {
        if (globalPar.alertSortStep == 2) {
            return;
        }
        var r = $(".alert-sort.show").removeClass("show");
        var nextPos = globalPar.alertSortStep + 1;
        $(".alert-sort:eq(" + nextPos + ")").addClass("show");
        globalPar.alertSortStep = nextPos;

        fillSeedList();

    });

    $(".backBtn").on("click", function () {
        if (globalPar.alertSortStep == 0) {
            return;
        }
        var r = $(".alert-sort.show").removeClass("show");
        var nextPos = globalPar.alertSortStep - 1;
        $(".alert-sort:eq(" + nextPos + ")").addClass("show");
        globalPar.alertSortStep = nextPos;

        fillSeedList();
    });

    // Start the task
    $('#startTask').on("click", function () {

        var willLoad = $('.left-side.active .onC');
        if (!willLoad.size()) {
            layer.alert('select an active task', {icon: 5,title:'info',btn:'OK'})
            return;
        }

        var thisText = $$('#updateContent textarea');
        thisText.val("");
    
        $('.mainStatus span').text('running');
        var nowTime = 0;
        $('#runTime').text(nowTime++ + 's');
        thisT = setInterval(function() {$('#runTime').text(nowTime++ + 's');}, 1000);
        //var task = $('.activeTasks dd a.onC').parent().data('task');
        var task = $('.oneTask.onC').data('taskSerialize');
      
        var thisUrl = "ws://" + location.host + "/algoWs";
        websocket = new WebSocket(thisUrl);
        //Callback method for connection error
        websocket.onerror = function(){
            alert("websocket connect error");
        };
        //Callback method for successful connection establishment
        websocket.onopen = function(event){
            websocket.send(task);
        }
        //Callback method for receiving message
        websocket.onmessage = function(event){
            //console.log(event.data);
            updateCtx(event.data);
        }
        //Callback method for connection closure
        websocket.onclose = function(){
            $('.mainStatus span').text('COMPLETED');
            $(willLoad).data('completed', 1);
            $(willLoad).data('runTime', $('#runTime').text());
            $(willLoad).data('textarea',$$('#updateContent textarea').val());
            var spanText = $(willLoad).find('span').eq(1).text();
            spanText = spanText.replace(/queued/, "completed");
            $(willLoad).find('span').eq(1).text(spanText);
            clearInterval(thisT);
            layer.alert('Task completed', {icon: 1,title:'info',btn:'OK'})
        }

        



  
    });

// paint chart
$('#seeChartTask').on("click", function () {

    var willLoad = $('.left-side.active .onC');
        if (!willLoad.size()) {
            layer.alert('select a active task', {icon: 5,title:'info',btn:'OK'})
            return;
        }
    var completed = $(willLoad).data('completed');
    if (1!=completed) {
        layer.alert('You have to run a task first.', {icon: 5,title:'info',btn:'OK'})
        return;
    }

    var chartData = willLoad.data('chartData');
    var task = willLoad.data('task');

//console.log(chartData);


    $("#mainDis").hide();
    $("#paintTable").hide();
    $("#compareChart").hide();
    $("#paintChart").show();
    
    myChart = echarts.init(document.getElementById('paintChartfirst'));
    
    var xAxisData = chartData['x'];
    var yAxisData = chartData['y'];
    xAxisData = xAxisData.map(num2e); 
    
    legendData = [task.taskID + '(' + task.algorithm + ')']
    
    // Specify the configuration entries and data for the chart.
        option = {
            legend: {
                data:legendData
            },
            toolbox: {
                show: true,
                feature: {
                    /*dataZoom: {
                        yAxisIndex: 'none'
                    },*/
                    dataView: {readOnly: false,
                        title:'data view',lang:['data view', 'close', 'refresh']},
                    magicType: {type: ['line', 'bar'],
                        title:{line:'switch to line', bar:'switch to bar'}},
                    restore: {title:'restore'},
                    saveAsImage: {title:'save as a image'}
                }
            },
            xAxis: {
                type: 'category',
                name : 'Input Size',
                nameLocation: 'center',
                nameGap: 35,
                data: xAxisData
            },
            yAxis: {
                name : 'Time(ms)',
                nameLocation: 'center',
                nameGap: 35,
                type: 'value'
            },grid:{
                left:0
            },
            series: [{
                data: yAxisData,
                name: legendData[0],
                type: 'line'
            }]
        };
        
        willLoad.data("cloneOp", cloneObj(option));
        // Use just assigned configuration items and data to display charts.
        myChart.setOption(option);
        console.log(myChart.getDataURL({}));

});
// paint table
$('#seeTable').on("click", function () {
    
    var willLoad = $('.left-side.active .onC');
    if (!willLoad.size()) {
        layer.alert('select a active task', {icon: 5,title:'info',btn:'OK'})
        return;
    }

    var completed = $(willLoad).data('completed');
    if (1!=completed) {
        layer.alert('You have to run a task first.', {icon: 5,title:'info',btn:'OK'})
        return;
    }

    $("#mainDis").hide();
    $("#paintChart").hide();
    $("#compareChart").hide();
    $("#paintTable").show();

    var chartData = willLoad.data('chartData');
    

    //console.log(chartData);


    var xAxisData = chartData['x'];
    var yAxisData = chartData['y'];

    var tableInner = '';
    var th1 = "Number of Elements";
    if (chartData['title1']) {
        th1 = chartData['title1']
    }
    var th2 = "Run 1 (ms)";
    tableInner += '<tr><th>' + th1 + '</th><th>' + th2 + '</th></tr>';
    for (var i=0; i<xAxisData.length;i++) {
        if (i % 2 == 1) {
            tableInner += '<tr class="alt"><td>' + xAxisData[i] + '</td><td>' + yAxisData[i] + '</td></tr>'
        } else {
            tableInner += '<tr><td>' + xAxisData[i] + '</td><td>' + yAxisData[i] + '</td></tr>'
        }
        
    }
    $("#paintTable table").append(tableInner);

});

// task overview
$('#taskOverview').on("click", function () {
    
    var willLoad = $('.left-side.active .onC');
    if (!willLoad.size()) {
        layer.alert('select a active task', {icon: 5,title:'info',btn:'OK'})
        return;
    }

    $("#mainDis").hide();
    $("#paintChart").hide();
    $("#paintTable").hide();
    $("#compareChart").hide();
    willLoad.click();

});

// task compare
$('#compareChartTask').on("click", function () {
    
    var willLoad = $('.left-side.active .onC');
    if (!willLoad.size()) {
        layer.alert('select a active task', {icon: 5,title:'info',btn:'OK'})
        return;
    }

    var completed = $(willLoad).data('completed');
    if (1!=completed) {
        layer.alert('You have to run a task first.', {icon: 5,title:'info',btn:'OK'})
        return;
    }

    $("#mainDis").hide();
    $("#paintChart").hide();
    $("#paintTable").hide();
    $("#compareChart").show();
    
    var chartData = willLoad.data('chartData');
    var task = willLoad.data('task');
    var algorithmGroup = task.algorithmGroup


    var myChart = echarts.init(document.getElementById('compareChartfirst'));
    
    var xAxisData = chartData['x'];
    var yAxisData = chartData['y'];
    xAxisData = xAxisData.map(num2e); 
    
    //legendData = [task.taskID + '(' + task.algorithm + ')']
    var legendData = [];
    var seriesData = [];
   /*  seriesData.push({
        data: yAxisData,
        name: legendData[0],
        type: 'line'
    }); */

    var muti = $('.left-side.active div');
    muti.map(function(one) {
        one = muti[one];
        var thisTask = $(one).data('task');
        var thisChartData = $(one).data('chartData');
        if (thisTask.algorithmGroup == algorithmGroup) {
            legendData.push(thisTask.taskID + '(' + thisTask.algorithm + ')');
            seriesData.push({
                data: thisChartData['y'],
                name: thisTask.taskID + '(' + thisTask.algorithm + ')',
                type: 'line'
            }); 
        }
    });
    

    // Specify the configuration entries and data for the chart.
        option = {
            legend: {
                data:legendData
            },
            toolbox: {
                show: true,
                feature: {
                    /*dataZoom: {
                        yAxisIndex: 'none'
                    },*/
                    dataView: {readOnly: false,
                        title:'data view',lang:['data view', 'close', 'refresh']},
                    magicType: {type: ['line', 'bar'],
                        title:{line:'switch to line', bar:'switch to bar'}},
                    restore: {title:'restore'},
                    saveAsImage: {title:'save as a image'}
                }
            },
            xAxis: {
                type: 'category',
                name : 'Input Size',
                nameLocation: 'center',
                nameGap: 35,
                data: xAxisData
            },grid:{
                left:0
            },
            yAxis: {
                name : 'Time(ms)',
                nameLocation: 'center',
                nameGap: 35,
                type: 'value'
            },
            series: seriesData
        };
        
    
        //Use just assigned configuration items and data to display charts.
        myChart.setOption(option);
        
});

$('.layui-body').on('click', '.savePng', function() {
    if ($('#compareChart').css('display') == "block") {
        downloadCanvasIamge('#compareChart canvas', 'compare')
    } else if ($('#paintChart').css('display') == "block") {
        downloadCanvasIamge('#paintChart canvas', 'chart')
    }

    
});

    // Create activity task in pop-up window
    $('.ctBtn').on("click", function () {

        var task = {};

        var now = new Date();
        task.taskID = now.getMilliseconds();
        if(task.taskID<100) {
            task.taskID = "0"+task.taskID;
        }
        task.taskID = 'Task_' + task.taskID;
        task.algorithm = $('select[name="algorithm"]  option:selected').val();
        task.runTitle = task.taskID + "(" + task.algorithm + ")";
        task.algorithmGroup = $('#alertNorthWest li.selected').text().toUpperCase();
        if($('input[name="seedInputType"]').val()=="newSeed"){
            task.rngSeed = $('input[name="rngSeed"]').val();
        }
        else{
            task.rngSeed = $('select[name="rngSeed"] option:selected').val();
        }
        if ("SORT" == task.algorithmGroup) {
            task.pivotPosition = $('select[name="pivotPosition"]  option:selected').val();
            if (task.algorithm == "EXTERNAL_MERGESORT") {
                task.sortRam = $('input[name="ram"]').val();
            }
            task.inputMinValue = 0;
            task.inputMaxValue = 100000000;
            task.inputStartSize = $('select[name="inputStartSize"]  option:selected').val();
            task.inputFinalSize = $('select[name="inputFinalSize"]  option:selected').val();
            task.inputStepSize = $('select[name="inputStepSize"]  option:selected').val();
            task.inputDistribution = $('select[name="inputDistribution"]  option:selected').val();

            var numRuns = (new Number(task.inputFinalSize) - new Number(task.inputStartSize)) / new Number(task.inputStepSize)
            numRuns = parseInt(numRuns);
            numRuns++;
            task.numRuns = numRuns;
            task.numRepeats = $('select[name="numRepeats"]  option:selected').val();
        }
        if ("GRAPH" == task.algorithmGroup) {
            task.dataStructure = $('select[name="dataStructure"]  option:selected').val();
            task.isDirectedGraph = $('input[name="isDirectedGraph"]').prop('checked')?true:false;
            task.allowSelfLoops = $('input[name="allowSelfLoops"]').prop('checked')?true:false;
            task.graphIsDelayed = $('input[name="graphIsDelayed"]').prop('checked')?true:false;
            task.fixedGraphParam = $('input[name="fixedGraphParam"]:checked').val();
            task.fixedGraphSize = $('select[name="fixedGraphSize"]  option:selected').val();
            task.inputStartSize = $('select[name="inputStartSize"]  option:selected').val();
            task.inputFinalSize = $('select[name="inputFinalSize"]  option:selected').val();
            task.inputStepSize = $('select[name="inputStepSize"]  option:selected').val();
            task.numRepeats = $('select[name="numRepeats"]  option:selected').val();
            var numRuns = (new Number(task.inputFinalSize) - new Number(task.inputStartSize)) / new Number(task.inputStepSize)
            numRuns = parseInt(numRuns);
            numRuns++;
            task.numRuns = numRuns;
        }
        if ("HASH" == task.algorithmGroup) {
            task.inputStartSize = $('select[name="inputStartSize"]  option:selected').val();
            task.hashBucketSize = $('input[name="hashBucketSize"]').val();
            task.hashFunction_a = $('input[name="hashFunction_a"]').val();
            task.hashFunction_b = $('input[name="hashFunction_b"]').val();
            task.hashKeyType = "Numbers";
            task.numRuns = 1;
        }

        if ("SEARCH" == task.algorithmGroup) {
            task.inputMinValue = 0;
            task.inputMaxValue = 100000000;
            task.inputDistribution = $('select[name="inputDistribution"]  option:selected').val();
            task.searchKeyType = $('select[name="searchKeyType"]  option:selected').val();
            task.inputStartSize = $('select[name="inputStartSize"]  option:selected').val();
            task.inputFinalSize = $('select[name="inputFinalSize"]  option:selected').val();
            task.inputStepSize = $('select[name="inputStepSize"]  option:selected').val();
            task.numRepeats = $('select[name="numRepeats"]  option:selected').val();
            var numRuns = (new Number(task.inputFinalSize) - new Number(task.inputStartSize)) / new Number(task.inputStepSize)
            numRuns = parseInt(numRuns);
            numRuns++;
            task.numRuns = numRuns;
        }
        var imgName = getImgName(task.algorithm);

        seeds.add(task.rngSeed, task.taskID);

        var s = '<div id="' + task.taskID + '" class="oneTask"><span class="image">' + imgName + '</span><span class="taskName">' 
            + task.taskID + '[queued]</span></div>';
        $('.left-side.active').append(s);

        globalPar.willPushData = $("form").serialize();
        $("#" + task.taskID).data("task", task);
        $("#" + task.taskID).data("taskSerialize", trans(task, true));
        
        layer.closeAll();
        $("#" + task.taskID).click();
        //$("#mainDis").show();
        doReset();
        globalPar.alertSortStep = 0;
     });

     // Closing task in pop up window
    $('.clBtn').on("click", function () {
        layer.closeAll();
        globalPar.alertSortStep = 0;
        doReset();
    });
      // Help task in Windows
      $('.hpBtn').on("click", function () {
        layer.open({
            type: 2,
            title: 'help',
            shadeClose: true,
            shade: 0.8,
            area: ['780px', '90%'],
            content: 'newtask_help.html' //iframe的url
          }); 
    });

     // Click on task list event
     $('.left-side.active').on("click", ".oneTask" ,function () {
        $('.left-side.active .oneTask.onC').removeClass("onC");
        
        $(this).addClass("onC");
        /* if ($(this).data('saved') == '1') {
            $('#saveTask').addClass('layui-btn-disabled')
        } else {
            $('#saveTask').removeClass('layui-btn-disabled')
        }
        $('#deleteTask').removeClass('layui-btn-disabled') */
        var task = $(this).data('task');

        $('.mainSettings P').hide();
        var group = task.algorithmGroup;
        var algorithm = task.algorithm;

        $('#settings #inputStartSize').parent().show();
        $('#settings #inputFinalSize').parent().show();
        $('#settings #inputStepSize').parent().show();
        $('#settings #inputMinValue').parent().show();
        $('#settings #inputMaxValue').parent().show();
        $('#settings #inputDistribution').parent().show();
        $('#settings #rngSeed').parent().show();
        
        $('#settings #currentInputSize').parent().show();
        $('#settings #memUsage').parent().show();
        $('#settings #scheduledTasks').parent().show();
        $('#settings #completedNum').parent().show();
        $('#settings #percentage').parent().show();
        
        $('#currentInputSize').text(task.inputStartSize);
        $('#scheduledTasks').text(task.numRuns);
        $('#inputStartSize').text(task.inputStartSize);
        $('#inputFinalSize').text(task.inputFinalSize);
        $('#inputStepSize').text(task.inputStepSize);
        $('#inputMinValue').text(task.inputMinValue);
        $('#inputMaxValue').text(task.inputMaxValue);
        $('#inputDistribution').text(task.inputDistribution);
        $('#rngSeed').text(task.rngSeed);

        switch (group) {
            case "GRAPH":

                $('#settings #inputStartSize').parent().hide();
                $('#settings #inputMinValue').parent().hide();
                $('#settings #inputMaxValue').parent().hide();
                $('#settings #inputDistribution').parent().hide();
                $('#settings #currentEdges').parent().hide();

                $('#settings #startSize').parent().show();
                $('#settings #directedEdges').parent().show();
                $('#settings #selfLoop').parent().show();
                $('#settings #fixedParameter').parent().show();
                $('#settings #size').parent().show();
                $('#settings #graphRepresentation').parent().show();
                $('#settings #selfLoop').parent().show();
                $('#settings #variedParameter').parent().show();
                

                $('#settings #startSize').text(task.inputStartSize);
                $('#settings #directedEdges').text(task.isDirectedGraph);
                $('#settings #selfLoop').text(task.allowSelfLoops);
                $('#settings #fixedParameter').text(task.fixedGraphParam);
                $('#settings #size').text(task.fixedGraphSize);
                $('#settings #graphRepresentation').text("Adjacency List");
                $('#settings #selfLoop').text(task.allowSelfLoops);
                $('#settings #variedParameter').text("EDGES");
                break;
            case "HASH":

                $('#settings #currentInputSize').parent().hide();
                $('#settings #memUsage').parent().hide();
                $('#settings #scheduledTasks').parent().hide();
                $('#settings #completedNum').parent().hide();
                $('#settings #percentage').parent().hide();


                $('#settings #inputStartSize').parent().hide();
                $('#settings #inputFinalSize').parent().hide();
                $('#settings #inputStepSize').parent().hide();
                $('#settings #inputMinValue').parent().hide();
                $('#settings #inputMaxValue').parent().hide();
                $('#settings #inputDistribution').parent().hide();

                $('#settings #bucketMemoryFootprint').parent().show();
                $('#settings #maxBucketSize').parent().show();
                $('#settings #minBucketSize').parent().show();
                $('#settings #averageBucketSize').parent().show();
                $('#settings #standardDeviation').parent().show();
                $('#settings #range').parent().show();


                $('#settings #bucketArraySize').parent().show();
                $('#settings #hashFunction').parent().show();
                $('#settings #hashKeyType').parent().show();
                $('#settings #totalNoEleme').parent().show();

                $('#settings #bucketArraySize').text(task.hashBucketSize);
                $('#settings #hashFunction').text(
                    "|"+task.hashFunction_a+"K+"+task.hashFunction_b+"| mod "+task.hashBucketSize
                );
                $('#settings #hashKeyType').text(task.hashKeyType);
                $('#settings #totalNoEleme').text($('#formHash select[name="inputStartSize"]').val());

                break;
            case "SORT":
                $('#settings hr').hide();
                if (algorithm == 'QUICKSORT') {
                    $('#settings #recursion').parent().show();
                    $('#settings #pivotPosition').parent().show();
                    $('#settings #pivotPosition').text(task.pivotPosition);
                } else if (algorithm == 'EXTERNAL_MERGESORT') {
                    $('#settings #customRam').parent().show();
                    $('#settings #treeHeight').parent().show();
                    $('#settings #customRam').text(task.sortRam + "KB");
                } else if (algorithm == 'INTERNAL_MERGESORT') {
                    $('#settings #treeHeight').parent().show();
                } else if (algorithm == 'HEAPSORT') {
                    $('#settings #treeHeight').parent().show();
                } else if (algorithm == 'INSERTSORT') {
                    $('#settings #treeHeight').parent().show();
                }
               
                break;
            case "SEARCH":
                if (algorithm == 'LINEAR_SEARCH') {
                    $('#settings #recursion').parent().show();
                } else {
                    $('#settings #treeHeight').parent().show();
                }
                break;
        }

        

        $("#settings .mainTask .mainTaskName").text(task.algorithm);
        willLoad = $('.left-side.active .onC');
        var completed = $(willLoad).data('completed');
        if (1 == completed) {
            $("#settings .mainStatus span").text("COMPLETED");
            $('#runTime').text($(willLoad).data('runTime'));
            $$('#updateContent textarea').val($(willLoad).data('textarea'));
            var spanText = $(this).find('span').eq(1).text();
            if (spanText.indexOf('que')) {
                spanText = spanText.replace(/queued/, "completed");
                $(this).find('span').eq(1).text(spanText);
            }
            
        } else {
            $("#settings .mainStatus span").text("QUEUED");
            $('#runTime').text('--s');
            $$('#updateContent textarea').val("");
            var spanText = $(this).find('span').eq(1).text();
            if (spanText.indexOf('comp')) {
                spanText = spanText.replace(/completed/, "queued");
                $(this).find('span').eq(1).text(spanText);
            }
        }
        
        $("#mainDis").show();
        $('.layui-body').css('background', "");
     });

    // Click on archive task list event
    $('.left-side.archive').on("click", ".oneTask" ,function () {
        $('#delArchiveTask').removeAttr('disabled');
        $('.left-side.archive .oneTask.onC').removeClass("onC");
        $(this).addClass("onC");
        var hadLoad = $(this).data('hadLoad');
        if (hadLoad == '1') {
            
        } else {
            $('#loadArchiveTask').removeAttr('disabled');
        }
    });

     // Load archive task
     $("#loadArchiveTask").on("click", function () {
        
        var willLoad = $('.left-side.archive .onC');
        if (!willLoad.size()) {
            alert("Select an active task");
            return;
        }
        willLoad.data('hadLoad', '1');
        $('#loadArchiveTask').prop('disabled',"true");
        var task = willLoad.data('task');
        var s = '<div id="' + task.taskID + '" class="oneTask"><span class="image">QS</span><span class="taskName">' + task.taskID + '</span></div>';
        $('.left-side.active').append(s);
        $('.left-side.active #' + task.taskID).data('task', task);

    });
    // Delete archive task
    $("#delArchiveTask").on("click", function () {

        var willDel = $('.left-side.archive .onC');
        if (!willDel.size()) {
            alert("Select an active task");
            return;
        }
        var task = $(willDel).data('task');
        willDel.remove();
        $.post('/common/del', {taskID: task.taskID}, function(data) {
            console.log(data);
        });
        $('#loadArchiveTask').prop('disabled',"true");
        $('#delArchiveTask').prop('disabled',"true");
    });

function repaint() {
    var selectVal = $('#selectVal').val();
    var constantVal = $('#constantVal').val();

    var willLoad = $('.left-side.active .onC');
    var cloneOp = willLoad.data("cloneOp");
    cloneOp = cloneObj(cloneOp);
    var chartData = willLoad.data('chartData');
    var xAxisData = chartData['x'];
    var yAxisData;
    var cons = constantVal * 0.00001;
    var isNone1=false;
    var option = cloneOp;
    if ("N" == selectVal) {
        
        yAxisData = xAxisData.map(function(x) {
            return x * cons;
        })
    } else if ("NONE" == selectVal) {
        
        isNone1 = true;
    } else if ("1" == selectVal) {
        yAxisData = xAxisData.map(function(x) {
            return 1 * cons;
        })
    } else if ("logN" == selectVal) {
        yAxisData = xAxisData.map(function(x) {
            return math.log(x, 10) * cons;
        })
    } else if ("NlogN" == selectVal) {
        yAxisData = xAxisData.map(function(x) {
            return x * math.log(x, 10) * cons;
        })
    } else {
        yAxisData = xAxisData.map(function(x) {
            return x * x * cons;
        })
    }
    //var option = myChart.getOption();
    
    if (!isNone1) {
        option.legend.data.push("standard1");
        option.series.push({
            data: yAxisData,
            name: "standard1",
            type: 'line'
        });
    }

    myChart.dispose();
    myChart = echarts.init(document.getElementById('paintChartfirst'));
    var anotherInput = $('#anotherInput').prop("checked");
    if (!anotherInput) {
        myChart.setOption(option);
        return;
    }
    var selectVal2 = $('#selectVal2').val();
    var constantVal2 = $('#constantVal2').val();
    var yAxisData2;
    var cons2 = constantVal2 * 0.00001;
    var option2;
    var isNone2=false;
    if ("N" == selectVal2) {
        
        yAxisData2 = xAxisData.map(function(x) {
            return x * cons2;
        })
    } else if ("NONE" == selectVal2) {
        option2 = option;
        isNone2 = true;
    } else if ("1" == selectVal2) {
        yAxisData2 = xAxisData.map(function(x) {
            return 1 * cons2;
        })
    } else if ("logN" == selectVal2) {
        yAxisData2 = xAxisData.map(function(x) {
            return math.log(x, 10) * cons2;
        })
    } else if ("NlogN" == selectVal2) {
        yAxisData2 = xAxisData.map(function(x) {
            return x * math.log(x, 10) * cons2;
        })
    } else {
        yAxisData2 = xAxisData.map(function(x) {
            return x * x * cons2;
        })
    }
    if (!isNone2) {
        option.legend.data.push("standard2");
        option.series.push({
            data: yAxisData2,
            name: "standard2",
            type: 'line'
        });
    }
    myChart.setOption(option);
}



    $("#selectVal, #constantVal,#selectVal2, #constantVal2").on("change", function () {
       
        repaint();
       
    });

    $("#anotherInput").change(function() { 
        var anotherInput = $('#anotherInput').prop("checked");
       if (anotherInput) {
        $('#selectVal2').show();
        $('#constantVal2').show();
        $('#constant2').show();
       } else {
        $('#selectVal2').hide();
        $('#constantVal2').hide();
        $('#constant2').hide();
       }
       repaint();
    });

    
 $(function(){
    
    globalPar.formSort = $("#formSort");
    globalPar.formGraph = $("#formGraph");
    globalPar.formHash = $("#formHash");
    globalPar.formSearch = $("#formSearch");
    $("#alertNorthEast").empty();
  });

});
function updateCtx(data, obj) {

    result = data;
    if (result.indexOf('Number') != -1 
        &&
        result.indexOf('Run') != -1 ) {
        //console.log(result);

        $$('.left-side.active .onC').data('number', result);

        var lines = result.split("\n");
        lines.pop();
        var firstLine = lines.shift();
        var coordinateX = []; 
        var coordinateY = []; 
        lines.map(function(one) {
            var xy = one.split("\t");
            coordinateX.push(parseInt(xy[0]));
            coordinateY.push(parseInt(xy[1]));
        });
        // console.log(coordinateX);
        // console.log(coordinateY);
        var title1 = firstLine.split("\t")[0];
        $$('.left-side.active .onC').data("chartData", {x: coordinateX, y:coordinateY,title1:title1});
        return;
    }

    var parts = result.split("\t");
    var pF = parts[0].toUpperCase();
    switch (pF) {
        case "[NUMCOMPLETEDRUNS]":
           result = 's';
           var pS = parts[1];
           pS = new Number(pS);
           $$('#completedNum').text(pS);
           pS = pS * 100 / $$('#scheduledTasks').text();
           $$('#percentage').text(pS + "%");
           break;
       case "[MAXRECURSION]":
           result = 's';
           var pS = parts[1];
           $$('#recursion').text(pS).
           break;
       case "[TREEHEIGHT]":
           result = 's';
           var pS = parts[1];
           $$('#settings #treeHeight').text(pS).
           break;
       case "[STATUS]":
           result = 's';
           var pS = parts[1];
           $$('#live span').text(pS);
           break;
       case "[TERMINATE]":
           result = 's';
           var pS = parts[1];
           $$('.mainStatus span').text(pS);
           break;
       case "[CURRENTMEMUSAGE]":
           result = 's';
           var pS = parts[1];
           pS = new Number(pS);
           pS /=  1024;
           pS = pS.toFixed(2);
           if (pS > 1024) {
               pS /= 1024;
               pS = pS.toFixed(2);
               pS = pS + "MB";
           } else {
               pS = pS + "KB";
           }
           $$('#memUsage').text(pS);
           break;
       case "[CURRENTINPUTSIZE]":
           result = 's';
           var pS = parts[1];
           $$('#settings #currentInputSize').text(pS);    
           $$('#settings #currentEdges').text(pS);    
           break;
       case "[NUMRUNS]":
           result = 's';  
           var pS = parts[1];
           $$('#settings #scheduledTasks').text(pS);   
           break;
       case "[MINBUCKETSIZE]":
           result = 's';   
           var pS = parts[1];
           $$('#settings #minBucketSize').text(pS);  
           break;
       case "[MAXBUCKETSIZE]":
           result = 's';  
           var pS = parts[1];
           $$('#settings #maxBucketSize').text(pS);  
           break;
       case "[AVERAGE]":
           result = 's'; 
           var pS = parts[1];
           $$('#settings #averageBucketSize').text(pS);   
           break;
       case "[STDDEVIATION]":
           result = 's';
           var pS = parts[1];
           $$('#settings #standardDeviation').text(pS);    
           break;
       case "[ERROR]":
           result = 's';  
           break;
       case "[UPDATE]":
           var pS = parts[1].toUpperCase();
           result = pS;
           break;
       default:
           
           break;
    }

    var thisText = $$('#updateContent textarea');
    var str = thisText.val(); //First get the original value.
    if (result == 's') {
       
    } else {
       document.getElementById('yang').value = str + result + "\r\n"; //拼接新值
       thisText.get(0).scrollTop = thisText.get(0).scrollHeight;   
       if (result.indexOf('TaskRunner exiting') != -1) {
            setTimeout("websocket.close()", 500);
       }
    }
   
 }
 

 function trans(strr, type) {

    if (true) {
        var result = "";
        for (var key in strr) {
            result = result + key + "=" + strr[key] + "&";
        }
        result = result.substring(0, result.length - 1);
        return result;
    }

    var result = {};
    var keyValue = strr.split("&");
    for (var i=0; i<keyValue.length; i++) {
        var o = keyValue[i];
        var oo = o.split("=");
        result[oo[0]] = oo[1];
    }
    result['runTitle'] = 'ybq';
    return result;
 }

 function num2e(num){
    var p = Math.floor(Math.log(num)/Math.LN10);
    var n = num * Math.pow(10, -p);
  n = n.toFixed(1);
    return n + 'E' + p;
}

// Download pictures of Canvas elements.
function downloadCanvasIamge(selector, name) {
    // Get canvas elements through selectors
    var canvas = document.querySelector(selector)
    // Using toDataURL method to transform images to Base64 encoded URL strings
    var url = canvas.toDataURL('image/png')
    // Generate an A element
    var a = document.createElement('a')
    // Create a click event
    var event = new MouseEvent('click')
    
    // Set the download property of a to the name of the image we want to download, and use the'download picture name'as the default name if the name does not exist
    a.download = name || 'Name'
    // Set the generated URL to the a.href attribute.
    a.href = url
    
    // Trigger events for triggering a
    a.dispatchEvent(event)
}

function getImgName(code) {
    var imgName = '';
    switch (code) {
        case "QUICKSORT":
            imgName = "QS";
            break;
        case "HEAPSORT":
            imgName = "HS";
            break;
        case "INSERTSORT":
            imgName = "IS";
            break;
        case "EXTERNAL_MERGESORT":
            imgName = "EMS";
            break;
        case "INTERNAL_MERGESORT":
            imgName = "IMS";
            break;
        case "BREADTH-FIRST_SEARCH":
            imgName = "BFS";
            break;
        case "DEPTH-FIRST_SEARCH":
            imgName = "DFS";
            break;
        case "HASHING":
            imgName = "Ha";
            break;
        case "LINEAR_SEARCH":
            imgName = "BS";
            break;
        case "BINARY_SEARCH":
            imgName = "LS";
            break;
    }
    return imgName;
}

function cloneObj(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //Serialized object
        newobj = JSON.parse(str); //reduction
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};

function doReset() {
    for (var i=0; i<$$('form').size();i++) {
        $$('form')[i].reset();
    }
    $$("input[name='ram']").parent().parent().hide();
    $$("select[name='pivotPosition']").parent().parent().show();
}


function gcd(a, b) {
    if (a % b === 0) {
        return b;
    }
    arguments.callee(b, a % b) == 1? true:false;
}
function yyyy() {
    var a = $$("input[name='hashFunction_a']").val();
    var b = $$("input[name='hashFunction_b']").val();
    var n = $$("input[name='hashBucketSize']").val();
    if (a && b && n) {
        if (gcd(a, n)) {
            $$('#coprime').text("Notice:Contant a and N are coprime. It is likely to be a good hash function.");
        } else {
            $$('#coprime').text("Notice:Contant a and N are not coprime. It is a bad hash function.");
        }
    } else {

    }
  };
  function yyyy() {
    var a = $$("input[name='hashFunction_a']").val();
    var b = $$("input[name='hashFunction_b']").val();
    var n = $$("input[name='hashBucketSize']").val();
    if (a && b && n) {
        if (gcd(a, n)) {
            $$('#coprime').text("Notice:Contant a and N are coprime. It is likely to be a good hash function.");
        } else {
            $$('#coprime').text("Notice:Contant a and N are not coprime. It is a bad hash function.");
        }
    } else {

    }
  };
  function yyyy() {
    var a = $$("input[name='hashFunction_a']").val();
    var b = $$("input[name='hashFunction_b']").val();
    var n = $$("input[name='hashBucketSize']").val();
    if (a && b && n) {
        if (gcd(a, n)) {
            $$('#coprime').text("Notice:Contant a and N are coprime. It is likely to be a good hash function.");
        } else {
            $$('#coprime').text("Notice:Contant a and N are not coprime. It is a bad hash function.");
        }
    } else {

    }
  };

  var seeds = {
      //list of seeds being used by tasks
      //each member is an obj {value, tasks: [taskid1, taskid2...]}
      seeds: [{value: "example", tasks: ["example"]}],

      //add a new seed entry or add a new taskid to the list of users
      add: function (seed, taskId) {
          console.log("Adding seed " + seed + " with task ID " + taskId);
          for (let i=0; i<this.seeds.length; i++){
              if (this.seeds[i].value === seed) {
                  this.seeds[i].tasks.push(taskId);
                  return;
              }
          }
          this.seeds.push({value: seed, tasks: [taskId]});
      },

      //get the list of seeds with an example user task for each
      get: function () {
          return this.seeds.map( x => {return {value: x.value, taskId: x.tasks[0]}});
      }

  };

  function fillSeedList(){
      let seedList = document.getElementById('seedList');
      //clear seed list
      for (let i = seedList.options.length; i>0; i--){
          seedList.options.remove(i);
      }
      //fill seed list
      seeds.get().forEach(x => {
          let o = new Option(x.value + " - used in " + x.taskId, x.value);
          console.log(o);
          seedList.options.add(o);
      });
  }