import beforeAfter1 from '../../images/before-after-1.png';
import beforeAfter2 from '../../images/before-after-2.png';
import beforeAfter3 from '../../images/before-after-3.png';
import beforeAfter4 from '../../images/before-after-4.png';

/** Pattern: two photo cards → one quote → repeat (same order on both marquee rows) */
const quoteCards = [
  {
    type: 'quote',
    quote:
      "I'd tried everything for years. Within 8 weeks on Bubulo's plan I lost 22 pounds and finally feel like myself again.",
    name: 'Jocelyn R.',
    stats: '−22 lbs · 8 weeks',
  },
  {
    type: 'quote',
    quote:
      "The team at Bubulo completely changed my relationship with food. Down 50 pounds and I've kept it off.",
    name: 'Marcus T.',
    stats: '−50 lbs · 16 weeks',
  },
  {
    type: 'quote',
    quote: "Never thought I'd hit my goal weight. Bubulo made it simple and sustainable.",
    name: 'Sandra M.',
    stats: '−30 lbs · 12 weeks',
  },
  {
    type: 'quote',
    quote:
      'Weekly check-ins kept me honest. I lost 38 pounds and my energy is back — my doctor adjusts the plan whenever I need it.',
    name: 'Daniel K.',
    stats: '−38 lbs · 14 weeks',
  },
];

const photoPairA = [
  { type: 'photo', image: beforeAfter1 },
  { type: 'photo', image: beforeAfter2 },
];
const photoPairB = [
  { type: 'photo', image: beforeAfter3 },
  { type: 'photo', image: beforeAfter4 },
];

const marqueeCards = [
  ...photoPairA,
  quoteCards[0],
  ...photoPairB,
  quoteCards[1],
  ...photoPairA,
  quoteCards[2],
  ...photoPairB,
  quoteCards[3],
];

const cardShellClass =
  'group/card flex-shrink-0 overflow-hidden rounded-xl shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-lg';

const photoSizeClass =
  'h-[220px] w-[200px] md:h-[260px] md:w-[220px] lg:h-[320px] lg:w-[280px]';

const quoteSizeClass =
  'h-[220px] w-[200px] md:h-[260px] md:w-[240px] lg:h-[320px] lg:w-[300px]';

function PhotoCard({ src }) {
  return (
    <div className={`${cardShellClass} ${photoSizeClass}`}>
      <img src={src} alt="" className="h-full w-full object-cover object-center" loading="lazy" />
    </div>
  );
}

function QuoteAvatar({ name }) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div
      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-brand/15 text-sm font-bold text-teal-brand shadow-sm ring-2 ring-teal-brand/25"
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

function QuoteCard({ quote, name, stats }) {
  return (
    <div className={`${cardShellClass} ${quoteSizeClass} flex flex-col bg-quote-bg`}>
      <div className="flex min-h-0 flex-1 flex-col p-4 md:p-5">
        <p className="text-sm italic leading-relaxed text-gray-700 md:text-base">&ldquo;{quote}&rdquo;</p>
        <div className="mt-auto flex items-center gap-3 border-t border-teal-brand/10 pt-4">
          <QuoteAvatar name={name} />
          <div className="min-w-0">
            <div className="text-sm font-bold text-gray-900">{name}</div>
            <div className="text-xs font-medium text-gray-500">{stats}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ direction, items }) {
  const sequence = [...items, ...items];
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="marquee-row w-full min-w-0 overflow-hidden">
      <div className={`marquee-track flex w-max gap-8 ${animClass}`}>
        {sequence.map((card, i) =>
          card.type === 'photo' ? (
            <PhotoCard key={`${direction}-${i}`} src={card.image} />
          ) : (
            <QuoteCard
              key={`${direction}-${i}`}
              quote={card.quote}
              name={card.name}
              stats={card.stats}
            />
          )
        )}
      </div>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex flex-col items-start gap-1 lg:items-end">
      <div className="flex gap-0.5 text-lg leading-none text-teal-brand" aria-hidden="true">
        {'★★★★★'.split('').map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
      <p className="text-left text-sm lg:text-right">
        <span className="font-bold text-gray-900">4.8</span>{' '}
        <span className="text-gray-500">out of 5 (Google Reviews)</span>
      </p>
    </div>
  );
}

export default function WhyBubuloMarquee() {
  return (
    <section
      className="min-w-0 overflow-hidden bg-white py-20"
      aria-label="Patient success stories"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-px w-5 shrink-0 bg-teal-brand" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Proven success
              </span>
            </div>
            <h2 className="font-serif text-[2rem] font-bold leading-[1.1] text-gray-900 md:text-[2.25rem] lg:text-[3.5rem]">
              Real patients.{' '}
              <span className="font-emphasis text-[2rem] font-normal not-italic tracking-[0.01em] text-teal-brand md:text-[2.25rem] lg:text-[3.5rem]">
                Real results.
              </span>
            </h2>
          </div>
          <StarRating />
        </div>
      </div>

      {/* gap-8: same spacing as horizontal gap between cards */}
      <div className="mt-2 flex w-full min-w-0 flex-col gap-8">
        <MarqueeRow direction="left" items={marqueeCards} />
        <MarqueeRow direction="right" items={marqueeCards} />
      </div>

      <div className="mx-auto mt-12 w-full max-w-6xl px-5 text-center md:mt-14 md:px-8">
        <a href="#" className="btn-accent mx-auto w-full max-w-[320px] sm:w-auto sm:max-w-none">
          Get Started Now
        </a>
      </div>
    </section>
  );
}
