export default function Loading() {
  return (
    <div className="mx-auto max-w-360 px-6 pb-24 pt-28 sm:px-8 lg:px-12">
      <div className="max-w-3xl space-y-5">
        <div className="h-3 w-40 animate-pulse rounded-full bg-white/10" />
        <div className="h-14 w-full animate-pulse rounded-2xl bg-white/[0.07]" />
        <div className="h-14 w-4/5 animate-pulse rounded-2xl bg-white/[0.07]" />
      </div>

      <div className="mt-16 space-y-6 border-t border-white/10 pt-10">
        <div className="h-12 w-full animate-pulse rounded-full bg-white/[0.05]" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-7 w-28 animate-pulse rounded-full bg-white/[0.05]"
            />
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-4xl border border-white/10 bg-white/3"
          >
            <div className="aspect-4/3 animate-pulse bg-white/[0.05]" />
            <div className="space-y-3 p-5">
              <div className="h-2.5 w-24 animate-pulse rounded-full bg-white/10" />
              <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/10" />
              <div className="h-3 w-full animate-pulse rounded-full bg-white/[0.07]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
