globalPar = {
    alertSortStep: 0,
    willPushData:'',
};
$$ = $;

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

// Create activity task in pop-up window
$('.ctBtn').on("click", function () {

    var task = {};

    var now = new Date();
    task.taskID = now.getMilliseconds();
    if(task.taskID<100) {
        task.taskID = "0"+task.taskID;
    }
    task.taskID = 'Task_' + task.taskID;


    task.algorithm = $('.tab-pane.active').find('select[name="algorithm"]  option:selected').val();
    task.runTitle = task.taskID + "(" + task.algorithm + ")";

    task.algorithmGroup = $('.nav-link.active').text().toUpperCase();
    console.log(task.algorithmGroup);

    if($('input[name="seedInputType"]').val()=="newSeed"){
        task.rngSeed = $('.tab-pane.active').find('input[name="rngSeed"]').val();
    }
    else{
        task.rngSeed = $('.tab-pane.active').find('select[name="rngSeed"] option:selected').val();
    }
    if ("SORT" == task.algorithmGroup) {
        task.pivotPosition = $('.tab-pane.active').find('select[name="pivotPosition"]  option:selected').val();
        if (task.algorithm == "EXTERNAL_MERGESORT") {
            task.sortRam = $('.tab-pane.active').find('input[name="ram"]').val();
        }
        task.inputMinValue = 0;
        task.inputMaxValue = 100000000;
        task.inputStartSize = $('.tab-pane.active').find('select[name="inputStartSize"]  option:selected').val();
        task.inputFinalSize = $('.tab-pane.active').find('select[name="inputFinalSize"]  option:selected').val();
        task.inputStepSize = $('.tab-pane.active').find('select[name="inputStepSize"]  option:selected').val();
        task.inputDistribution = $('.tab-pane.active').find('select[name="inputDistribution"]  option:selected').val();

        var numRuns = (new Number(task.inputFinalSize) - new Number(task.inputStartSize)) / new Number(task.inputStepSize)
        numRuns = parseInt(numRuns);
        numRuns++;
        task.numRuns = numRuns;
        task.numRepeats = $('.tab-pane.active').find('select[name="numRepeats"]  option:selected').val();
    }
    if ("GRAPH" == task.algorithmGroup) {
        task.dataStructure = $('.tab-pane.active').find('select[name="dataStructure"]  option:selected').val();
        task.isDirectedGraph = $('.tab-pane.active').find('input[name="isDirectedGraph"]').prop('checked')?true:false;
        task.allowSelfLoops = $('.tab-pane.active').find('input[name="allowSelfLoops"]').prop('checked')?true:false;
        task.graphIsDelayed = $('.tab-pane.active').find('input[name="graphIsDelayed"]').prop('checked')?true:false;
        task.fixedGraphParam = $('.tab-pane.active').find('input[name="fixedGraphParam"]:checked').val();
        task.fixedGraphSize = $('.tab-pane.active').find('select[name="fixedGraphSize"]  option:selected').val();
        task.inputStartSize = $('.tab-pane.active').find('select[name="inputStartSize"]  option:selected').val();
        task.inputFinalSize = $('.tab-pane.active').find('select[name="inputFinalSize"]  option:selected').val();
        task.inputStepSize = $('.tab-pane.active').find('select[name="inputStepSize"]  option:selected').val();
        task.numRepeats = $('.tab-pane.active').find('select[name="numRepeats"]  option:selected').val();
        var numRuns = (new Number(task.inputFinalSize) - new Number(task.inputStartSize)) / new Number(task.inputStepSize)
        numRuns = parseInt(numRuns);
        numRuns++;
        task.numRuns = numRuns;
    }
    if ("HASH" == task.algorithmGroup) {
        task.inputStartSize = $('.tab-pane.active').find('select[name="inputStartSize"]  option:selected').val();
        task.hashBucketSize = $('.tab-pane.active').find('input[name="hashBucketSize"]').val();
        task.hashFunction_a = $('.tab-pane.active').find('input[name="hashFunction_a"]').val();
        task.hashFunction_b = $('.tab-pane.active').find('input[name="hashFunction_b"]').val();
        task.hashKeyType = "Numbers";
        task.numRuns = 1;
    }

    if ("SEARCH" == task.algorithmGroup) {
        task.inputMinValue = 0;
        task.inputMaxValue = 100000000;
        task.inputDistribution = $('.tab-pane.active').find('select[name="inputDistribution"]  option:selected').val();
        task.searchKeyType = $('.tab-pane.active').find('select[name="searchKeyType"]  option:selected').val();
        task.inputStartSize = $('.tab-pane.active').find('select[name="inputStartSize"]  option:selected').val();
        task.inputFinalSize = $('.tab-pane.active').find('select[name="inputFinalSize"]  option:selected').val();
        task.inputStepSize = $('.tab-pane.active').find('select[name="inputStepSize"]  option:selected').val();
        task.numRepeats = $('.tab-pane.active').find('select[name="numRepeats"]  option:selected').val();
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


    $("#createTaskDialog").modal('hide');

    $("#" + task.taskID).click();
    //$("#mainDis").show();
    doReset();
});

$(".nextBtn").on("click", function () {
    if (globalPar.alertSortStep == 0){
        $(".alert-sort.one").removeClass("show");
        $(".alert-sort.two").addClass("show");
        globalPar.alertSortStep ++;
    }
    else if (globalPar.alertSortStep == 1){
        $(".alert-sort.two").removeClass("show");
        $(".alert-sort.three").addClass("show");
        globalPar.alertSortStep ++;
    }
    else if (globalPar.alertSortStep == 2) {
        return;
    }

    fillSeedList();

});

$(".backBtn").on("click", function () {
    if (globalPar.alertSortStep == 0) {
        return;
    }
    else if (globalPar.alertSortStep == 1){
        $(".alert-sort.two").removeClass("show");
        $(".alert-sort.one").addClass("show");
        globalPar.alertSortStep --;
    }
    else if (globalPar.alertSortStep == 2) {
        $(".alert-sort.three").removeClass("show");
        $(".alert-sort.two").addClass("show");
        globalPar.alertSortStep--;
    }


    fillSeedList();
});

$('.clBtn').on("click", function () {
    doReset();
});

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
    /*
    for (var i=0; i<$$('form').size();i++) {
        $$('form')[i].reset();
    }
    */
    $("form").trigger("reset");

    globalPar.alertSortStep = 0;
    $(".alert-sort.one").addClass("show");
    $(".alert-sort.two").removeClass("show");
    $(".alert-sort.three").removeClass("show");

    $("input[name='ram']").parent().parent().hide();
    $("select[name='pivotPosition']").parent().parent().show();
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
    seeds: [],//[{value: "example", tasks: ["example"]}],

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

function fillSeedList() {

    let seedListSort = document.getElementById('seedListSort');
    let seedListGraph = document.getElementById('seedListGraph');
    let seedListHash = document.getElementById('seedListHash');
    let seedListSearch = document.getElementById('seedListSearch');

    function fillList(seedList){
        for (let i = seedList.options.length; i > 0; i--){
            seedList.remove(i)
        }
        seeds.get().forEach(x => {
            let o = new Option(x.value + " - used in " + x.taskId, x.value);
            seedList.add(o);
        });
    }

    fillList(seedListSort);
    fillList(seedListGraph);
    fillList(seedListHash);
    fillList(seedListSearch);

}

