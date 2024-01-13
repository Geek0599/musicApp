import { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import style from './track.module.scss'
import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';
import cn from 'classnames';

const Track = (track) => {
	const { currentTrack, handleToggleAudio, isPlaying } = useContext(AudioContext)
	const {id, src, title, duration, preview, artists} = track
	const formatedDuration = secondsToMMSS(duration)
	const isCurrentTrack = currentTrack.id === track.id
	return (
		<div className={cn(style.track, isCurrentTrack && style.playing)}>
			<IconButton onClick={()=> handleToggleAudio(track)}>
				{isPlaying && isCurrentTrack ? <Pause /> : <PlayArrow />}
			</IconButton>
			<img className={style.preview} src={preview} alt={title} />
			<div className={style.credits}>
				<b>{title}</b>
				<p>{artists}</p>
			</div>
			<p>{formatedDuration}</p>
		</div>
	)
}
export default Track;