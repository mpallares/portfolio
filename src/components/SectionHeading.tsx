interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export default function SectionHeading({ title, description, eyebrow }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
          {description}
        </p>
      )}
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
    </div>
  );
}
