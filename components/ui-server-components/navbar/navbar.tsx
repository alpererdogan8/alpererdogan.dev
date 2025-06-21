import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="w-full flex font-mono mt-7 mb-3  gap-4 sm:gap-6">
      <Button
        size="default"
        variant="link"
        className=" underline-offset-8 scroll-m-20 px-0 font-semibold text-lg sm:text-lg "
      >
        <Link href="/">projects</Link>
      </Button>
      <Button
        size="default"
        variant="link"
        className=" underline-offset-8 scroll-m-20 px-0 font-semibold text-lg sm:text-lg "
      >
        <Link href="/writing">writing</Link>
      </Button>
      <Button
        size="default"
        variant="link"
        className=" underline-offset-8 scroll-m-20 px-0 font-semibold text-lg sm:text-lg "
      >
        <Link href="/bookmarks">bookmarks</Link>
      </Button>
    </div>
  );
}
