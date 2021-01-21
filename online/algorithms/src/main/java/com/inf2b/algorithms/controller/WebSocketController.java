package com.inf2b.algorithms.controller;

import com.inf2b.algorithms.config.GetHttpSessionConfigurator;
import com.inf2b.algorithms.model.Task;
import com.inf2b.algorithms.model.TaskMaster;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint(value = "/algoWs",configurator = GetHttpSessionConfigurator.class)
@Component
public class WebSocketController {

    //Static variables are used to record the current number of online connections. It should be designed to be thread safe.
    private static int onlineCount = 0;
    //The thread safety Set of the concurrent package is used to store the corresponding MyWebSocket objects for each client.
    private static CopyOnWriteArraySet<WebSocketController> webSocketSet = new CopyOnWriteArraySet<WebSocketController>();
    //A connection session with a client needs to send data to the client through it.
    private Session session;

    /**
     * Connection to establish successful invocation method
     */
    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        this.session = session;
        System.out.println("the session is : "+session.getId());
        webSocketSet.add(this);     //Join in set
        addOnlineCount();           //Online users amount plus 1
        System.out.println("onOpen:New connection! The current number of online users is" + getOnlineCount());
        try {
            sendMessage("welcome to websocket --- from server");
        } catch (IOException e) {
            System.out.println("IO Exception");
        }
    }

    /**
     * Method of closing calls
     */
    @OnClose
    public void onClose() {

        webSocketSet.remove(this);  //Delete from set
        subOnlineCount();           //Online users amount reduction of 1
        System.out.println("One connection is closed! The current number of online users is" + getOnlineCount());
    }

    /**
     *
     *Method of calling after receiving client message
     * @param message Message sent by client
     */
    @OnMessage
    public void onMessage(String message, Session session) {

        System.out.println("Message from client:" + message);

        Map<String, Object> taskMap = new HashMap<>();
        String[] keyValue = message.split("&");
        for (int i=0; i<keyValue.length; i++) {
            String o = keyValue[i];
            String[] oo = o.split("=");
            try {
                taskMap.put(oo[0], oo[1]);
                taskMap.remove("taskPcs");
            } catch (Exception e) {
                //e.printStackTrace();
            }
        }
        Task task = new Task();
        try {
            BeanUtils.copyProperties(task, taskMap);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
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

        TaskMaster taskMaster = new TaskMaster(task, this);
        Thread taskMasterTh = new Thread(taskMaster);
        taskMasterTh.start();

    }

    /**
     * Call when an error occurs
     */
    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("Erroneous");
        error.printStackTrace();
    }

    synchronized public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
    }

    /**
     * Group sending custom message
     */
    public static void sendInfo(String message) throws IOException {
        for (WebSocketController item : webSocketSet) {
            try {
                item.sendMessage(message);
            } catch (IOException e) {
                continue;
            }
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketController.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketController.onlineCount--;
    }


}
