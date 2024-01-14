import Logo from '@/public/images/logo.svg';
import Image from 'next/image';

export default function SliceBooksLogo() {
  return (
    <div className="flex items-center justify-center text-white">
      <Image
        className="h-7 w-7"
        src={Logo}
        alt="Slice Books Logo"
        height={40}
        width={40}
      />
    </div>
  );
}
