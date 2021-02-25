package com.inf2b.algorithms.model;

import com.inf2b.algorithms.AlgoBench;

import java.io.*;


import org.apache.fop.apps.*;
import org.knowm.xchart.XYChart;

import javax.xml.transform.*;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;

public class PDFGeneration {

    //adapted from http://svn.apache.org/viewvc/xmlgraphics/fop/trunk/fop/examples/embedding/java/embedding/ExampleXML2PDF.java?view=markup
    public static void generatePDF(Task task, double[] chartXData, double[] chartYData, OutputStream out) throws FOPException, TransformerException, IOException {


        //prepare XSLT file
        File xsltFile = new File("src/main/resources/static/task.xsl");
        //generate XML
        String xml = getXMLSourceCode(task);
        //prepare image
        System.out.println(chartXData.length);
        XYChart chart = Plotter.createRunTimeChart(chartXData, chartYData);
        Plotter.saveChart(chart, "images/image.png");

        System.out.println("Generated XML");
        //construct FOPFactory
        FopFactory fopFactory = FopFactory.newInstance(new File(".").toURI());
        FOUserAgent foUserAgent = fopFactory.newFOUserAgent();

        //set up output stream
        //OutputStream out = new ByteArrayOutputStream();
        //out = new BufferedOutputStream(out);

        //construct fop
        Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, out);

        System.out.println("Fop generated");
        //setup xslt
        TransformerFactory factory = TransformerFactory.newInstance();
        Transformer transformer = factory.newTransformer(new StreamSource(xsltFile));

        System.out.println("Transformer set up");
        //setup input for XSLT transformation
        Source src = new StreamSource(new StringReader(xml));

        //resulting SAX events (the generated FO) must be piped through to FOP
        Result res = new SAXResult(fop.getDefaultHandler());
        //start XSLT transformation and FOP processing
        transformer.transform(src, res);

        System.out.println("PDF generation complete!");

    }

    private static String getXMLSourceCode(Task t){
        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "\n<data>"
                + "\n<task-name>" + t.getAlgorithm() + "</task-name>"
        );

        if(!t.getAlgorithmGroup().equals("HASH")){
            sb.append("\n<input-size>" + t.getInputFinalSize() + "</input-size>"
                    + "\n<scheduled-tasks>" + t.getNumRuns() + "</scheduled-tasks>"
                    + "\n<completed-tasks>" + t.getNumCompletedRuns()+ "</completed-tasks>"
                    + "\n<initial-size>" + t.getInputStartSize() + "</initial-size>"
                    + "\n<final-size>" + t.getInputFinalSize() + "</final-size>"
                    + "\n<step-size>" + t.getInputStepSize() + "</step-size>"
                    //+ "\n<notes>" + t.getNotes() + "</notes>"
            );
        }
        if (t.getAlgorithmGroup().equals("GRAPH")) {
            sb.append("\n<graph-fixed-size>" + t.getFixedGraphSize() + "</graph-fixed-size>"
                    + "\n<graph-fixed-edges>" + t.getFixedGraphParam(true) + "</graph-fixed-edges>"
                    + "\n<graph-allow-self-loop>" + t.getAllowSelfLoops() + "</graph-allow-self-loop>"
                    + "\n<graph-is-directed>" + t.getIsDirectedGraph() + "</graph-is-directed>"
                    + "\n<graph-is-delayed>" + t.getGraphIsDelayed() + "</graph-is-delayed>"
            );
        }
        else if (t.getAlgorithmGroup().equals("HASH")) {
            sb.append("\n<initial-size>" + t.getInputStartSize() + "</initial-size>"  // Input Setup Details
                    + "\n<hash-bucket-array-size>" + Integer.toString(t.getHashBucketSize()) + "</hash-bucket-array-size>"
                    + "\n<hash-key-type>" + t.getHashKeyType(true) + "</hash-key-type>"
                    + "\n<hash-function>" + t.getHashFunction() + "</hash-function>"
                    + "\n<hash-max-bucket-size>" + t.getMaxBucketSize() + "</hash-max-bucket-size>" //Execution Progress Details
                    + "\n<hash-min-bucket-size>" + t.getMinBucketSize() + "</hash-min-bucket-size>"
            );
        }
        else if (t.getAlgorithmGroup().equals("SORT")) {
            sb.append("\n<input-range>[" + t.getInputMinValue() + ", " + t.getInputMaxValue() + "]</input-range>"
                    + "\n<input-distribution>" + t.getInputDistribution(true) + "</input-distribution>"
            );

            if (t.getAlgorithmCode().equals(AlgoBench.properties.getProperty("QUICKSORT"))) {
                sb.append("\n<pivot-position>" + t.getPivotPosition(true) +"</pivot-position>"
                );
            }
            else if (t.getAlgorithmCode().equals(AlgoBench.properties.getProperty("EXTERNAL_MERGESORT"))) {
                sb.append("\n<sort-ram-ems>" + t.getSortRam() + "</sort-ram-ems>");
            }
            else if (t.getAlgorithmCode().equals(AlgoBench.properties.getProperty("HEAPSORT"))){
            }
        }
        else if (t.getAlgorithmGroup().equals("SEARCH")) {
            sb.append("\n<input-range>[" + t.getInputMinValue() + ", " + t.getInputMaxValue() + "]</input-range>"
                    + "\n<input-distribution>" + t.getInputDistribution(true) + "</input-distribution>"
                    + "\n<search-key-type>" + t.getSearchKeyType(true) + "</search-key-type>"
            );
        }

        else if (t.getAlgorithmGroup().equals("QUEUE")){
            //sb.append("\n<internal-representation>" + "Heaps" + "</internal-representation>"
            //        + "\n<data-element>" + t.getDataElement() + "</data-element>");
        }

        sb.append("\n</data>");

        System.out.println(sb.toString());
        return sb.toString();
    }


}
