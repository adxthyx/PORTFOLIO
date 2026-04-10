import { LenticularIllusion } from "@/components/lenticular-illusion"

const IMAGE_A = "/a.png"
const IMAGE_B = "/b.jpg"

export default function LenticularPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fafc_0%,#eff6ff_40%,#dbeafe_100%)] px-6 py-16 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center gap-8">
        <div className="max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-600">Motion Demo</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Lenticular Illusion</h1>
          <p className="text-sm leading-7 text-slate-600 sm:text-base">
            Swap <code>IMAGE_A</code> and <code>IMAGE_B</code> with your own assets. Mobile uses
            device tilt, and desktop falls back to cursor position.
          </p>
        </div>

        <LenticularIllusion
          imageA={IMAGE_A}
          imageB={IMAGE_B}
          altA="Placeholder image A"
          altB="Placeholder image B"
          className="max-w-4xl"
        />
      </div>
    </main>
  )
}
