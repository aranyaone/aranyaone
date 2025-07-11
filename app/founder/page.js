// app/founder/page.js

export default function FounderPage() {
  return (
    <main className="min-h-screen p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Meet the Visionary Behind <span className="text-purple-600">Aranya One</span>
        </h1>

        <p className="text-lg md:text-xl mb-6 leading-relaxed">
          <span className="font-semibold text-gray-800">Srinivas Makam</span>, a dreamer turned doer — 
          the founding soul of Aranya One. With a heart full of ambition and a mind built for innovation,
          he launched this AI empire to redefine what's possible with automation, emotion, and excellence.
        </p>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
          <p className="text-md text-gray-700">
            "I believe technology should not just serve — it should feel. Aranya One is not a product, it’s a revolution.
            A home where AI, love, business, and dreams coexist and grow."
          </p>
          <p className="mt-4 text-right text-sm italic">– Srinivas Makam</p>
        </div>

        {/* Photo Placeholder */}
        {/* <img src="/founder.jpg" alt="Srinivas Makam" className="rounded-full mt-8 w-48 h-48 mx-auto shadow-xl" /> */}
      </div>
    </main>
  );
}
