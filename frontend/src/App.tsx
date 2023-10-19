import { Dashboard, Header } from './components'

function App(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <Dashboard />
    </div>
  )
}

export default App
