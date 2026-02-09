export interface RecommendationDrop {
  column: string;
  reason: string;
}

export interface TargetCandidate {
  column: string;
  score: number;
  std: number;
}

export interface FeatureCandidate {
  column: string;
  type: "numeric" | "categorical";
  correlation?: number;
  note?: string;
}

export interface RecommendationResponse {
  target_candidates: TargetCandidate[];
  feature_candidates: FeatureCandidate[];
  drop_recommendations: RecommendationDrop[];
  default_selection: {
    target: string | null;
    features: string[];
  };
}
