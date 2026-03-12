import { Link } from 'react-router-dom'

/**
 * About page — describes the project, how it works, and the tech stack.
 */
export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-fade-in">
      {/* Page heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-leaf-100 mb-2">
        About LeafScan
      </h1>
      <p className="text-leaf-100/50 text-lg mb-10">
        AI-powered plant health diagnostics — right from your browser.
      </p>

      {/* What is LeafScan */}
      <section className="glass rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="text-xl font-bold text-leaf-200 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-6 rounded-full bg-leaf-400" />
          What is LeafScan?
        </h2>
        <p className="text-leaf-100/60 leading-relaxed">
          LeafScan is an open-source, AI-powered web application that detects plant diseases from
          leaf photographs. Simply upload a photo of a leaf and the system will analyze it using a
          deep learning model trained on the{' '}
          <span className="text-leaf-300 font-medium">PlantVillage dataset</span> — covering{' '}
          <span className="text-leaf-300 font-medium">38 disease classes</span> across 14 crop
          species. You'll get an instant diagnosis along with actionable treatment recommendations.
        </p>
      </section>

      {/* How it works */}
      <section className="glass rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="text-xl font-bold text-leaf-200 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 rounded-full bg-leaf-400" />
          How It Works
        </h2>
        <ol className="space-y-4">
          {[
            {
              step: '01',
              title: 'Upload a Leaf Image',
              desc: 'Drag-and-drop or click to browse for a clear photo of a plant leaf.',
            },
            {
              step: '02',
              title: 'Image Preprocessing',
              desc: 'The image is resized to 224×224 pixels and normalized for the neural network.',
            },
            {
              step: '03',
              title: 'AI Classification',
              desc: 'An EfficientNetB3 model (transfer-learned on PlantVillage) classifies the image into one of 38 categories.',
            },
            {
              step: '04',
              title: 'Results & Treatment',
              desc: 'The predicted disease, confidence score, and recommended treatment are displayed instantly.',
            },
          ].map((item) => (
            <li key={item.step} className="flex gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-leaf-500/10 flex items-center justify-center text-leaf-400 font-bold text-sm group-hover:bg-leaf-500/20 transition-colors duration-300">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-leaf-200">{item.title}</h3>
                <p className="text-sm text-leaf-100/50 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Tech stack */}
      <section className="glass rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="text-xl font-bold text-leaf-200 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 rounded-full bg-leaf-400" />
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Frontend', items: ['React 18', 'Vite', 'Tailwind CSS', 'Axios'] },
            { label: 'Backend', items: ['Python 3.11', 'FastAPI', 'TensorFlow / Keras'] },
            { label: 'Model', items: ['EfficientNetB3', 'PlantVillage (38 classes)'] },
            { label: 'Deployment', items: ['Docker', 'Docker Compose', 'Nginx'] },
          ].map((col) => (
            <div key={col.label}>
              <h3 className="text-sm font-semibold text-leaf-300 mb-2">{col.label}</h3>
              <ul className="space-y-1">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-leaf-100/50">
                    <span className="w-1 h-1 rounded-full bg-leaf-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm
            bg-gradient-to-r from-leaf-500 to-leaf-600
            hover:from-leaf-400 hover:to-leaf-500
            active:scale-[0.98] transition-all duration-200
            shadow-lg shadow-leaf-500/20 hover:shadow-leaf-500/40"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          Try It Now
        </Link>
      </div>
    </div>
  )
}
