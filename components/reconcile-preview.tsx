import Image from "next/image"
import { cn } from "@/lib/utils"

const screens = [
  {
    name: "Activity",
    file: "activity",
    alt: "Reconcile Activity screen with transaction search, filters, and categorized payments",
  },
  {
    name: "Spending insights",
    file: "insights",
    alt: "Reconcile Insights screen with a spending chart and category breakdown",
  },
]

export function ReconcilePreview({ compact, className }: { compact: boolean; className?: string }) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-secondary p-3 text-foreground sm:p-4",
        className,
      )}
    >
      <figcaption className="mb-3 flex flex-wrap justify-between gap-1 text-xs font-medium sm:text-sm">
        <span>Inside the Android app</span>
        <span>Saved on your device</span>
      </figcaption>
      <div className={cn("mx-auto grid grid-cols-2 gap-3 sm:gap-5", compact ? "max-w-sm" : "max-w-xl")}>
        {screens.map((screen) => {
          const screenshot = (
            <Image
              src={`/projects/reconcile/${screen.file}.png`}
              width={1080}
              height={2400}
              alt={screen.alt}
              sizes={compact ? "(min-width: 640px) 182px, 42vw" : "(min-width: 640px) 280px, 42vw"}
              className={cn("w-full bg-[#090e12]", compact ? "h-full object-cover object-top" : "h-auto")}
            />
          )
          return (
            <div key={screen.file} className="min-w-0">
              {compact ? (
                <div className="aspect-square overflow-hidden rounded-lg border border-black/15">
                  {screenshot}
                </div>
              ) : (
                <a
                  href={`/projects/reconcile/${screen.file}.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open full ${screen.name} screenshot`}
                  className="block overflow-hidden rounded-xl border border-black/15"
                >
                  {screenshot}
                </a>
              )}
              <p className="mt-2 text-xs font-medium sm:text-sm">{screen.name}</p>
            </div>
          )
        })}
      </div>
      {!compact && (
        <p className="mt-4 text-sm leading-relaxed">
          Actual app captures. Open either screen to inspect it at full size.
        </p>
      )}
    </figure>
  )
}
