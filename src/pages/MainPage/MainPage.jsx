import style from './mainPage.module.scss'
import trackList from '../../assets/trackList'
import Track from '../../components/Track/Track';
import { Input } from '@mui/material';
import { useState } from 'react';

console.log(trackList);

const runSearch = (query) => {
	if(!query) return trackList

	const lowerCaseQuery = query.toLowerCase()

	return trackList.filter(
		(track) => track.title.toLocaleLowerCase().includes(lowerCaseQuery) || 
					  track.artists.toLocaleLowerCase().includes(lowerCaseQuery)
	)
}

export const MainPage = () => {
	const [tracks, setTracks] = useState(trackList);

	const handlerChange = (e) => {
		const foundTracks = runSearch(e.target.value)
		setTracks(foundTracks)
	}

	return (
		<div className={style.search}>
			<Input className={style.input} placeholder='Пошук треків' onChange={handlerChange}/>
			<div className={style.list}>
				{tracks.length ? tracks.map((track) => (
					<Track key={track.id} {...track}/>
				)) : <div className={style.nofound}>Треки не знайдено</div>}
			</div>
		</div>
	)
}
export default MainPage;