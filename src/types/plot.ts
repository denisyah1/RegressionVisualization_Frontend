export interface PlotSplit {
  y_actual: number[];
  y_pred: number[];
}

export interface RegressionPlotResponse {
  train: PlotSplit;
  test: PlotSplit;
}
