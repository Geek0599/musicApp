import { useContext, useEffect, useState } from "react"
import { AudioContext } from "../../context/AudioContext"
import { Slider, IconButton } from "@mui/material"
import { PlayArrow, Pause } from "@mui/icons-material"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import secondsToMMSS from "../../utils/secondsToMMSS";
import cn from "classnames";

import style from './playbar.module.scss'

const TimeControls = () => {
	const { audio, currentTrack } = useContext(AudioContext);
	const [currentTime, setCurrentTime] = useState(0)
	const { duration } = currentTrack;
	const formatedCurrentTime = secondsToMMSS(currentTime)
	const sliderCurrentTime = Number((currentTime / duration * 100).toFixed(3))

	const handleChangeCurrentTime = (e, value) => {
		const time = Math.round((value / 100) * duration)
		setCurrentTime(time)
		audio.currentTime = time;
	}

	useEffect(()=>{
		const timeInterval = setInterval(()=>{
			setCurrentTime(audio.currentTime)
		},1000)
		return () => {
			clearInterval(timeInterval)
		}
	},[])

	return (
		<>
			<p>{formatedCurrentTime}</p>
			<Slider step={1} min={0} max={100} value={sliderCurrentTime} onChange={handleChangeCurrentTime}/>
		</>
	)
}

const VolumeControls = () => {
	const [volume, setVolume] = useState(1)
	const { audio } = useContext(AudioContext);
	const formatedVolume = volume * 100

	const handleValumeChange = (e, value) => {
		const updatedVolume = value / 100
		setVolume(updatedVolume)
		audio.volume = updatedVolume
	}

	console.log(volume);

	return (
		<div className={style.volumebox}>
			<IconButton className={cn({[style.muted] : !volume})}>
				{!volume ? <VolumeMuteIcon /> : <VolumeUpIcon />}
			</IconButton>
			<Slider step={1} min={0} max={100} value={formatedVolume} onChange={handleValumeChange}/>
		</div>
	)
}


const Playbar = () => {
	const { currentTrack, handleToggleAudio, isPlaying } = useContext(AudioContext);
	const { title, artists, preview, duration } = currentTrack;
	const formatedDuration = secondsToMMSS(duration)


	return(
		<div className={style.playbar}>
			<img className={style.preview} src={preview} alt={title} />
			<IconButton onClick={()=> handleToggleAudio(currentTrack)}>
				{isPlaying ? <Pause /> : <PlayArrow />}
			</IconButton>
			<div className={style.credits}>
				<div className={style.infobox}>
					<h4>{title}</h4>
					<p>{artists}</p>
				</div>
			</div>
			<div className={style.slider}>
				<TimeControls />
				<p>{formatedDuration}</p>
			</div>
			<VolumeControls />
		</div>
	)
}
export default Playbar