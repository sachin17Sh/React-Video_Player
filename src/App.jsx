import "./App.css"
import DashBoard from "./layout/MainDashBoard"
import { CastProvider } from "@jdion/cast-react"
export default function App() {
  return (
    <CastProvider>
      <DashBoard />
    </CastProvider>
  )
}
