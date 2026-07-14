import EngravedRule from '@/components/EngravedRule';

export default function SectionHeading({
  eyebrow,
  title,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="font-display text-xs uppercase tracking-monument text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="engraved mt-3 font-display text-3xl uppercase tracking-engraved text-gold-bright md:text-5xl">
        {title}
      </h2>
      <EngravedRule className="mx-auto mt-6 max-w-xs" />
    </div>
  );
}
