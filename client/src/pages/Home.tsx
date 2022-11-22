import { useState } from 'react'
import Tool from '../components/Tool'
import log from '../scripts/log'

function Home() {
	const [count, setCount] = useState(0)

	return (
		<div className="center-items center-text position-relative top bottom left right">
			<article className="Home responsive-padding">
				<h2>
					Singin' Together
				</h2>
				<p>
					Fireside
					is a place to share
					your favorite song lyrics and chords.
				</p>
				<div className="card">
					<Tool url="/search" style="bigbutton">
						Browse songs
					</Tool>
					<Tool url="/menu" style="bigbutton">
						Explore Site
					</Tool>
				</div>
			</article>
		</div>
	)
}

export default Home
