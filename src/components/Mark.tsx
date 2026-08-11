/**
 * SINE — Sam Isaac Nana Epaphras. One period of a sine curve.
 * Inherits currentColor so it flips with the theme.
 */
export function Mark({
  size = 32,
  className = '',
  strokeWidth,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  // Below ~24px the curve needs more weight to hold its shape.
  const stroke = strokeWidth ?? (size < 24 ? 4.5 : size < 32 ? 4 : 3.5);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="SINE"
    >
      <path
        d="M5 16C8.67 8.67 12.33 8.67 16 16S23.33 23.33 27 16"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
