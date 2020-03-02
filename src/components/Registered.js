import React from 'react';

export default function Welcome() {
    return (
        <section className="section auth">
            <div className="app">
                <h1>Välkommen</h1>
                <p>Du har lyckats med din registrering av ditt konto!</p>
                <p>Vi har skickat ett mail till den registrerade mailen för verifikation.</p>
                <a className="buttons" href="/">Back</a>
            </div>
        </section>
    )
}