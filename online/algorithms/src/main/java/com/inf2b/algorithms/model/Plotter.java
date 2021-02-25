package com.inf2b.algorithms.model;


import org.knowm.xchart.BitmapEncoder;
import org.knowm.xchart.QuickChart;
import org.knowm.xchart.XYChart;

import java.io.IOException;

public class Plotter {

    public static XYChart createRunTimeChart(double[] xData, double[] yData) {
        return QuickChart.getChart("Sample Chart", "Input Size", "Time To Completion", "placeholder", xData, yData);
    }

    public static void saveChart(XYChart chart, String filePath) throws IOException {
        BitmapEncoder.saveBitmap(chart, filePath, BitmapEncoder.BitmapFormat.PNG);
    }

}
