import ListOfFiles from "./components/ListOfFiles"

function App() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="bg-black shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Files
          </h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
          <ListOfFiles />
        </div>
      </main>
    </div>
  )
}

export default App
