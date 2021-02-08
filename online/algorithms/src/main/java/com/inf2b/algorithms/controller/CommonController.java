package com.inf2b.algorithms.controller;

import com.alibaba.fastjson.JSON;
import com.inf2b.algorithms.AlgoBench;
import com.inf2b.algorithms.model.Task;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RestController()
@RequestMapping("/common")
public class CommonController {

    @RequestMapping("/save")
    public void save(Task task, HttpServletResponse res) throws IOException {


        res.setHeader("content-type", "application/octet-stream");
        res.setContentType("application/octet-stream");
        res.setHeader("Content-Disposition", "attachment;filename=" + task.getTaskID() + ".ser");
        OutputStream out = res.getOutputStream();
        byte[] buff;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutput obo = new ObjectOutputStream(bos);
        obo.writeObject(task);
        buff = bos.toByteArray();

        out.write(buff, 0, buff.length);
        out.close();


    }

    //TODO
    @RequestMapping("/print")
    public void print(Task task, HttpServletResponse res) throws IOException {

        res.setHeader("content-type", "application/octet-stream");
        res.setContentType("application/octet-stream");
        res.setHeader("Content-Disposition", "attachment;filename=" + task.getTaskID() + ".pdf");
        OutputStream out = res.getOutputStream();
        byte[] buff;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        //ObjectOutput obo = new ObjectOutputStream(bos);
        //obo.writeObject(task);
        //CALL PDF GENERATION FUNCTION
        //WRITE PDF TO BUFFER OUTPUT STREAM HERE
        buff = bos.toByteArray();

        out.write(buff, 0, buff.length);
        out.close();

    }

    @RequestMapping("/gett")
    String gett() throws IOException, ClassNotFoundException {

        File f = new File(AlgoBench.JarDirectory + File.separator + "saved" + File.separator);
        System.out.println(f.getAbsolutePath());

        List<Task> list = new ArrayList<>();
        if (f.isDirectory()) {
            for (File ff : f.listFiles()) {
                InputStream file = new FileInputStream(ff);
                BufferedInputStream buffer = new BufferedInputStream(file);
                ObjectInput in = new ObjectInputStream(buffer);
                Task task = (Task) in.readObject();
                list.add(task);
            }
        }

        return JSON.toJSONString(list);

    }

    @RequestMapping("/del")
    String del(String taskID) {

        File f = new File(AlgoBench.JarDirectory + File.separator + "saved" + File.separator);
        f = new File(f, File.separator + taskID + "a.ser");
        //f.deleteOnExit();
        if (f.exists()) {
            f.delete();
        }
        return JSON.toJSONString("delete success");
    }

    //Processing file upload
    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public String uploadImg(@RequestParam("file") MultipartFile file,
                                          HttpServletRequest request) throws Exception {
        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();
        /*System.out.println("fileName-->" + fileName);
        System.out.println("getContentType-->" + contentType);*/
        String filePath = request.getSession().getServletContext().getRealPath("imgupload/");
       /* try {
            uploadFile(file.getBytes(), filePath, fileName);
        } catch (Exception e) {
            // TODO: handle exception
        }*/

        ObjectInput in = new ObjectInputStream(new ByteArrayInputStream(file.getBytes()));
        Task task = (Task) in.readObject();








        //return json
        return JSON.toJSONString(task);
    }

    public static void uploadFile(byte[] file, String filePath, String fileName) throws Exception {
        File targetFile = new File(filePath);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        FileOutputStream out = new FileOutputStream(filePath+fileName);
        out.write(file);
        out.flush();
        out.close();
    }


}
