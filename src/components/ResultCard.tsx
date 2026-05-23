interface Prediction { class: string; confidence: number }
interface Props { predictions: Prediction[]; inferenceMs: number }

export default function ResultCard({ predictions, inferenceMs }: Props) {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-white">Top-5 Predictions</h2>
        <span className="text-xs text-gray-500 font-mono">{inferenceMs}ms</span>
      </div>
      <div className="space-y-3">
        {predictions.map((p, i) => (
          <div key={i} className="relative">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-medium
                  ${i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  {i + 1}
                </span>
                <span className="text-sm text-white">{p.class}</span>
              </div>
              <span className="text-sm font-mono text-gray-400">{p.confidence}%</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${i === 0 ? 'bg-blue-500' : 'bg-gray-600'}`}
                style={{ width: `${p.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}