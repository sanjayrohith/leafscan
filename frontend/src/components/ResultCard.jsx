/**
 * ResultCard — displays the disease prediction result.
 *
 * Props:
 *   result: {
 *     predicted_class: string,
 *     confidence: number (0–1),
 *     plant: string,
 *     disease: string,
 *     is_healthy: boolean,
 *     treatment: string,
 *   }
 *   onReset: () => void — callback to clear the result and upload a new image.
 */
export default function ResultCard({ result, onReset }) {
  const confidencePercent = Math.round(result.confidence * 100)

  // Determine bar color based on confidence level
  const barColor =
    confidencePercent >= 80
      ? 'bg-gradient-to-r from-leaf-400 to-leaf-500'
      : confidencePercent >= 50
        ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
        : 'bg-gradient-to-r from-red-400 to-red-500'

  return (
    <div className="w-full max-w-lg mx-auto animate-bounce-in">
      <div className="glass rounded-2xl overflow-hidden">
        {/* Header badge */}
        <div className={`px-6 py-3 ${result.is_healthy ? 'bg-leaf-500/20' : 'bg-red-500/20'}`}>
          <div className="flex items-center gap-2">
            {result.is_healthy ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-leaf-400 animate-pulse" />
                <span id="health-badge" className="text-sm font-semibold text-leaf-300 uppercase tracking-wider">
                  Healthy
                </span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                <span id="health-badge" className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                  Disease Detected
                </span>
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Plant & Disease name */}
          <div>
            <h2 id="result-plant" className="text-2xl font-bold text-leaf-100">
              {result.plant}
            </h2>
            <p id="result-disease" className="text-lg font-medium text-leaf-300/80 mt-0.5">
              {result.disease}
            </p>
          </div>

          {/* Confidence bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-leaf-100/60">Confidence</span>
              <span id="confidence-value" className="text-sm font-bold text-leaf-200">
                {confidencePercent}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                id="confidence-bar"
                className={`h-full rounded-full confidence-bar-fill ${barColor}`}
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
          </div>

          {/* Treatment suggestion */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5 text-leaf-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-leaf-200 mb-1">Treatment Recommendation</h3>
                <p id="treatment-text" className="text-sm text-leaf-100/60 leading-relaxed">
                  {result.treatment}
                </p>
              </div>
            </div>
          </div>

          {/* Predicted class (small, for reference) */}
          <p className="text-xs text-leaf-100/30 font-mono">
            Class: {result.predicted_class}
          </p>

          {/* Reset / scan another button */}
          <button
            id="reset-button"
            onClick={onReset}
            className="w-full py-3 rounded-xl font-semibold text-sm
              bg-gradient-to-r from-leaf-500 to-leaf-600
              hover:from-leaf-400 hover:to-leaf-500
              active:scale-[0.98] transition-all duration-200
              shadow-lg shadow-leaf-500/20 hover:shadow-leaf-500/40"
          >
            Scan Another Leaf
          </button>
        </div>
      </div>
    </div>
  )
}
