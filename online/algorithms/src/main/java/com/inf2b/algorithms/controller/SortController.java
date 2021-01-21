package com.inf2b.algorithms.controller;

import com.inf2b.algorithms.model.Task;
import com.inf2b.algorithms.model.TaskMaster;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController()
@RequestMapping("/sort")
public class SortController {

    Map<String, String> sb = new HashMap<String, String>();

    @RequestMapping("/hello")
    String home(Task task, String data) {

        sb = new HashMap<String, String>();

        long tmp = System.currentTimeMillis() % 1000;
        String id;
        if (tmp < 100) id = "0" + tmp;
        else id = "" + tmp;
        task.setTaskID("Task_" + id);

        task.setRunTitle(task.getTaskID() + " (" + task.getAlgorithm() + ")");

        if ("SORT".equals(task.getAlgorithmGroup(true))) {
            task.setNumRuns();
        }
        if ("HASH".equals(task.getAlgorithmGroup(true))) {
            task.setHashKeyType("Numbers");
            task.setNumRuns(1);
            task.setNumRepeats(1);
            task.setInputStepSize(1L);
            task.setInputFinalSize(1L);
        }
        if ("SEARCH".equals(task.getAlgorithmGroup(true))) {
            task.setNumRuns();
        }


        TaskMaster taskMaster = new TaskMaster(sb, task);
        Thread taskMasterTh = new Thread(taskMaster);
        taskMasterTh.start();

        return "Hello World!";
    }

    @RequestMapping("/get")
    String sbGet(String index) {
        String line = sb.remove(index);
        return line;
    }

    @RequestMapping("/get2")
    String sbGet2() {
        String line = sb.get("response");
        return line;
    }



}
