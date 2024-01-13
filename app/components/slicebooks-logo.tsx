import Logo from '@/public/images/logo.svg';
import Image from 'next/image';

export default function SliceBooksLogo() {
  return (
    <div className="flex items-center gap-4 text-white">
      <Image src={Logo} alt="Slice Books Logo" height={40} width={40} />
      <p className="mt-2 text-4xl">SliceBooks</p>
    </div>
  );
}
