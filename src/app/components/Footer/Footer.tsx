import dayjs from 'dayjs';

interface FooterProps {}

export default function Footer({}: FooterProps) {
  const year = dayjs().year();

  return (
    <footer className="text-sm text-neutral-400 text-center py-5">
      <a
        href="https://igorwfaoro.github.io"
        target="_blank"
        className="underline"
      >
        Igor Wilian Faoro
      </a>{' '}
      | {year}
    </footer>
  );
}
