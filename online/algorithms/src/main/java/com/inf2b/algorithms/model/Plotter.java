package com.inf2b.algorithms.model;


import org.knowm.xchart.BitmapEncoder;
import org.knowm.xchart.XYChart;
import org.knowm.xchart.style.theme.MatlabTheme;

import java.io.IOException;

public class Plotter {

    public static XYChart createRunTimeChart(String taskName, double[] xData, double[] yData) {
        XYChart chart = new XYChart(800, 600);
        chart.setTitle(taskName);
        chart.setXAxisTitle("Input Size");
        chart.setYAxisTitle("Time (ms)");
        chart.addSeries("Experiment Results", xData, yData);
        chart.getStyler().setTheme(new MatlabTheme());
        chart.getStyler().setLegendVisible(false);


        return chart;

    }

    public static void saveChart(XYChart chart, String filePath) throws IOException {
        BitmapEncoder.saveBitmap(chart, filePath, BitmapEncoder.BitmapFormat.PNG);
    }

}
