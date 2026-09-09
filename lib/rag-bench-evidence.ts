// Verified against the saved FiQA artifacts in ../rag-bench on 2026-09-08.
// This revision contains the artifacts; their recorded experiment git_sha is "unknown".
const snapshot = "https://github.com/adxthyx/RAG_Rerank/blob/06b7929240161e56ee30e3e625e2c62c26b6f27a"

export const ragBenchEvidence = {
  queries: 648,
  baseline: {
    label: "Hybrid search",
    recall: 0.35256277073406705,
    latencyP95Ms: 102.29702676588204,
    configHash: "f551e283194b",
    config: `${snapshot}/configs/experiments/e04_hybrid_rrf.yaml`,
    results: `${snapshot}/results/raw/e04_hybrid_rrf_fiqa.json`,
  },
  reranked: {
    label: "With reranking",
    recall: 0.4266161736069143,
    latencyP95Ms: 14056.713701825356,
    configHash: "803f8aefb8a8",
    config: `${snapshot}/configs/experiments/e06_hybrid_rrf_rerank_bge.yaml`,
    results: `${snapshot}/results/raw/e06_hybrid_rrf_rerank_bge_fiqa.json`,
  },
  baseConfig: `${snapshot}/configs/base.yaml`,
  report: `${snapshot}/README.md#fiqa`,
}

export const ragBenchImprovement =
  (ragBenchEvidence.reranked.recall / ragBenchEvidence.baseline.recall - 1) * 100
