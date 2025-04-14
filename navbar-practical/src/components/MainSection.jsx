import './MainSection.css';

function MainSection() {

    return (
        <main>
            <section id="home" className="home">
                <h1>Welcome to My Portfolio</h1>
                <p>This is the home section of my portfolio. Here you can find an overview of my work and skills.</p>
            </section>
            <section id="about" className="about">
                <h2>About Me</h2>
                <p>This section contains information about my background, experience, and interests.</p>
            </section>
            <section id="portfolio" className="portfolio">
                <h2>My Work</h2>
                <p>Here you can find a selection of my projects and accomplishments.</p>
            </section>
            <section id="contact" className="contact">
                <h2>Get in Touch</h2>
                <p>If you would like to reach out, please feel free to contact me through the information provided.</p>
            </section>
        </main>
    );
}

export default MainSection;