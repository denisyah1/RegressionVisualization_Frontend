export interface PlotSeries {
  y_actual: number[];
  y_pred: number[];
}

export interface RegressionPlotResponse {
  train: PlotSeries;
  test: PlotSeries;
}
