import logo from '../assets/bread-loaf-corgi-2-001.png';

interface CorgiProps {
  size?: number;
  className?: string;
}

function Corgi({
  size = 148, 
  className = "max-w-md mx-auto animate-corgi-bounce"
}: CorgiProps) {
  return (
    <>
      <img
        src={logo}
        alt="Corgi resume writing buddy"
        height={size}
        width={size}
        className={className}
      />
    </>
  );
}

export default Corgi;