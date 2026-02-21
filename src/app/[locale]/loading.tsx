export default function Loading() {
  return (
    <section className="py-20 md:py-24 min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-skin-base/20 border-t-[#daa520] rounded-full animate-spin" />
        <p className="text-skin-base/50 text-sm">Loading...</p>
      </div>
    </section>
  );
}
