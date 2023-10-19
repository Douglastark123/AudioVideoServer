import { Divider } from '@nextui-org/react'

const Header = (): React.JSX.Element => (
  <header className="sticky top-0 z-50 flex w-full flex-col items-center bg-black">
    <div className="flex w-full max-w-5xl justify-between px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-widest">Files</h1>
      <input
        type="text"
        placeholder="Search..."
        className="rounded-lg px-5 py-1 outline-none"
      />
    </div>
    <Divider />
  </header>
)

export default Header
