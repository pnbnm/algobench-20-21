package com.inf2b.algorithms.controller;

import com.inf2b.algorithms.config.GetHttpSessionConfigurator;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;



/**
 * The concrete implementation class of websocket
 */
@ServerEndpoint(value = "/websocket",configurator = GetHttpSessionConfigurator.class)
@Component
public class WebSocketServer {
    //Static variables are used to record the current number of online connections. It should be designed to be thread safe.
    private static int onlineCount = 0;
    //The thread safety Set of the concurrent package is used to store the corresponding MyWebSocket objects for each client.
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<WebSocketServer>();
    //A connection session with a client needs to send data to the client through it.
    private Session session;

    /**
     * Connection to establish successful invocation method
     */
    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        this.session = session;
        HttpSession httpSession= (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        System.out.println("name is : "+ httpSession.getAttribute("name"));
        //sessionMap.put(session.getId(), session);
        System.out.println("the session is : "+session.getId());

        webSocketSet.add(this);     //Join in set
        addOnlineCount();           //Online number plus 1
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
        try {
            sendMessage("closed --- from server");
        } catch (IOException e) {
            System.out.println("IO Exception");
        }
        webSocketSet.remove(this);  //Delete from set
        subOnlineCount();           //Online users amount reduction of 1
        System.out.println("One connection is closed! The current number of online users is" + getOnlineCount());
    }

    /**
     * Method of calling after receiving client message
     *
     * @param message Message sent by client
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Messages from clients:" + message);
        System.out.println("onMessage sessionId is : "+session.getId());
        //Group messages
        for (WebSocketServer item : webSocketSet) {
            try {
                item.sendMessage(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Call when an error occurs
     */
    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("Erroneous");
        error.printStackTrace();
    }

    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message+" : sendMessage id is : "+this.session.getId());
        //this.session.getAsyncRemote().sendText(message);
    }

    /**
     * Group sending custom message
     */
    public static void sendInfo(String message) throws IOException {
        for (WebSocketServer item : webSocketSet) {
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
        WebSocketServer.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketServer.onlineCount--;
    }
}
