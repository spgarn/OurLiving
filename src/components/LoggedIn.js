import React from 'react';
import Text from '../text/text.json'
import '../App.css';

export default function LoggedIn(props) {
    return (
        <div className="sign-up-background">
            <h4> Här finns all din information sparad.</h4>
            <table>
                <thead>
                    <tr>
                        <th>Stad</th>
                        <th>Kök</th>
                        <th>Badrum</th>
                        <th>Utomhusfärg</th>
                    </tr>
                </thead>
                <tbody>
                    {Text.map((data) =>
                        <tr>
                            <td>{data.city}</td>
                            <td>{data.kitchenRenovatedYear}</td>
                            <td>{data.bathroomRenovatedYear}</td>
                            <td>{data.facadeColor}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="buttons" style={{ marginTop: "30px" }} onClick={props.logOut}>Log out</button>
        </div>



    )

}