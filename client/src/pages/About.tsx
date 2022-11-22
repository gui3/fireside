
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

import AppLogo from '../components/AppLogo'

export default function About () {
    return (
        <div className="center-items">
            <article className="About responsive-padding">
                <h1>About...</h1>
                <section>
                    <h2>...this website</h2>
                    <p>
                        Bla bla bla
                    </p>
                    <AppLogo dynamic size="6em"/>
                </section>

                <section>
                    <h2>...the team behind</h2>
                    <p>
                        Bla bla bla
                    </p>
                    {/**@TODO insert profile pic here ;) */}
                </section>

                <section>
                    <h2>...{"&"} technologies we used</h2>
                    <p>
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                        Bla bla bla
                    </p>
                    <div>
                        <img src={viteLogo} 
                        className="logo vite" alt="Vite logo" />
                        <img src={reactLogo} 
                        className="logo react" alt="React logo" />
                    </div>
                </section>
            </article>
        </div>
    )
}
