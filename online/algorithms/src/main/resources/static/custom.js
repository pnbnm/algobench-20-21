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
