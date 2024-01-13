import style from './global.module.scss'
import Playbar from './components/Playbar/Playbar'

import MainPage from "./pages/MainPage/MainPage"

MainPage
const App = () => {
	return (
		<div className={style.wrapper}>
			<MainPage />
			<Playbar />
		</div>
	)
}

export default App
