import { ArrowUpRight } from "lucide-react"
import { ragBenchEvidence as evidence } from "@/lib/rag-bench-evidence"

export function BenchmarkEvidence() {
  return (
    <section
      id="benchmark-evidence"
      aria-labelledby="benchmark-evidence-title"
      className="scroll-mt-24 rounded-xl border border-border p-4 sm:p-6"
    >
      <h2 id="benchmark-evidence-title" className="text-lg font-semibold">
        Inspect the benchmark
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        The same 648 FiQA questions, documents, and search settings. The second run adds a BGE reranker over
        the top 50 candidates. Each result file includes the resolved configuration and per-question scores.
      </p>
      <dl className="mt-4 divide-y divide-border">
        {[evidence.baseline, evidence.reranked].map((run) => (
          <div
            key={run.configHash}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3"
          >
            <dt className="text-sm font-medium">
              {run.label}{" "}
              <span className="ml-1 font-mono tabular-nums text-muted-foreground">
                {run.recall.toFixed(3)} Recall@5
              </span>
            </dt>
            <dd className="flex gap-4 text-sm">
              <a
                href={run.config}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${run.label}: experiment configuration`}
                className="inline-flex min-h-10 items-center gap-1 whitespace-nowrap font-semibold text-brand hover:underline"
              >
                Config YAML <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={run.results}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${run.label}: saved results JSON`}
                className="inline-flex min-h-10 items-center gap-1 whitespace-nowrap font-semibold text-brand hover:underline"
              >
                Results JSON <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Shared settings: 512-token chunks, 64-token overlap, RRF k=60, seed 42, and 10,000 bootstrap
        resamples.{" "}
        <a
          href={evidence.baseConfig}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline underline-offset-4"
        >
          Base configuration
        </a>
        {" · "}
        <a
          href={evidence.report}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline underline-offset-4"
        >
          Full results report
        </a>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        FiQA p95 query time: {Math.round(evidence.baseline.latencyP95Ms)} ms →{" "}
        {(evidence.reranked.latencyP95Ms / 1000).toFixed(2)} s on the documented 8 GB Apple Silicon setup,
        with cached query embeddings. These are saved retrieval runs, not new measurements or generated-answer
        scores.
      </p>
      <details className="mt-3 text-sm text-muted-foreground">
        <summary className="w-fit cursor-pointer py-2 font-medium">Artifact provenance</summary>
        <p className="mt-1 leading-relaxed">
          Links are pinned to the repository snapshot containing these files. The saved runs record
          configuration hashes {evidence.baseline.configHash} and {evidence.reranked.configHash}, but their
          experiment Git revision is recorded as unknown.
        </p>
      </details>
    </section>
  )
}
