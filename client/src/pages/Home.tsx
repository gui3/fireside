import Tool from '../components/Tool'

export default function Home() {
	return (
		<div className="center-items center-text fullsize">
			<article className="Home">
				<h2>
					Singin' Together
				</h2>
				<p>
					Fireside
					is a place to share
					your favorite song lyrics and chords.
				</p>
				<div className="">
					<Tool url="/search" style="button">
						Browse songs
					</Tool>

					<Tool url="/menu" style="button">
						Explore Site
					</Tool>
				</div>
			</article>
		</div>
	)
}
