import logo from '../assets/bread-loaf-corgi-2-001.png'

function Corgi({size = 148}) {
  return (
    <>
      <img
        src={logo}
        alt="Corgi resume writing buddy"
        height={size}
        width={size}
        class="max-w-md mx-auto animate-corgi-bounce"
      />
    </>
  )
}

export default Corgi
