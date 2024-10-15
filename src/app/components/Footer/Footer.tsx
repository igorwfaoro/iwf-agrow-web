import { appDayjs } from '../../../util/date';

interface FooterProps {}

export default function Footer({}: FooterProps) {
  const year = appDayjs().year();

  return (
    <footer className="text-[0.7rem] text-white bg-primary text-center py-1 fixed w-full bottom-0">
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
